package com.tarbi.dto;

import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Long orderId;
    private Double totalAmount;
    private String status;
    private List<OrderItemResponse> items;
    private LocalDateTime createdAt;
	
    public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public List<OrderItemResponse> getItems() {
		return items;
	}
	public void setItems(List<OrderItemResponse> items) {
		this.items = items;
	}
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
    
    
}