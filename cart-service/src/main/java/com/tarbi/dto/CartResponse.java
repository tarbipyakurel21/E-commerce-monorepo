package com.tarbi.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.tarbi.model.Cart;


public class CartResponse {
    private String userId;
    private List<CartItemDto> items;
    private double totalPrice;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<CartItemDto> getItems() {
        return items;
    }

    public void setItems(List<CartItemDto> items) {
        this.items = items;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    // Factory method to convert Cart to CartResponse
    public static CartResponse from(Cart cart) {
        CartResponse response = new CartResponse();
        response.setUserId(cart.getUserId());

        List<CartItemDto> itemDtos = cart.getItems().stream()
                .map(item -> new CartItemDto(
                        item.getProductId(),
                        item.getProductName(),
                        item.getPrice(),
                        item.getQuantity()
                ))
                .collect(Collectors.toList());

        response.setItems(itemDtos);
        response.setTotalPrice(itemDtos.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum());

        return response;
    }

    // Inner DTO class for items
    public static class CartItemDto {
        private Long productId;
        private String productName;
        private double price;
        private int quantity;

        public CartItemDto() {}

        public CartItemDto(Long productId, String productName, double price, int quantity) {
            this.productId = productId;
            this.productName = productName;
            this.price = price;
            this.quantity = quantity;
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public String getProductName() {
            return productName;
        }

        public void setProductName(String productName) {
            this.productName = productName;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        public int getQuantity() {
            return quantity;
        }

        public void setQuantity(int quantity) {
            this.quantity = quantity;
        }
    }
}
