package com.tarbi.service;

import com.tarbi.dto.CartRequest;
import com.tarbi.dto.CartResponse;
import com.tarbi.dto.ProductResponse;
import com.tarbi.feign.ProductClient;

import com.tarbi.model.Cart;
import com.tarbi.model.CartItem;
import com.tarbi.repository.CartRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

   
    @Autowired
    private ProductClient productClient;
    
   

    public CartResponse getCartByUserId(String userId) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        Cart cart = optionalCart.orElseGet(() -> new Cart(userId)); // create if doesn't exist
        return CartResponse.from(cart); // map cart to DTO
    }

    public CartResponse addItem(String userId, CartRequest request) {
        ProductResponse product = productClient.getProductsById(request.getProductId(),"true");

        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);
        Cart cart = optionalCart.orElseGet(() -> new Cart(userId));

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(product.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + request.getQuantity());
        } else {
            CartItem newItem = new CartItem();
            newItem.setProductId(product.getId());
            newItem.setProductName(product.getName());
            newItem.setPrice(product.getPrice());
            newItem.setQuantity(request.getQuantity());
            newItem.setCart(cart);

            cart.getItems().add(newItem);
        }

       cartRepository.save(cart);
       
        return CartResponse.from(cart);
    }

    public CartResponse removeItem(String userId, Long productId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        cartRepository.save(cart);

        return CartResponse.from(cart);
    }

    public void clearCart(String userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.getItems().clear();
        cartRepository.save(cart);
    }

   
		
			
		
		
	}

