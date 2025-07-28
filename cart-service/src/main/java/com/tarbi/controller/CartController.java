package com.tarbi.controller;

import com.tarbi.dto.CartRequest;
import com.tarbi.dto.CartResponse;
import com.tarbi.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    private String getUserId() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping
    public ResponseEntity<CartResponse> getCart() {
        return ResponseEntity.ok(cartService.getCartByUserId(getUserId()));
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addItemToCart(@RequestBody CartRequest requestItem) {
        return ResponseEntity.ok(cartService.addItem(getUserId(), requestItem));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<CartResponse> removeItemFromCart(@PathVariable Long productId) {
        return ResponseEntity.ok(cartService.removeItem(getUserId(), productId));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart(getUserId());
        return ResponseEntity.noContent().build();
    }
}



