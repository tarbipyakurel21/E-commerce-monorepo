package com.tarbi.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tarbi.dto.CreateOrderRequest;
import com.tarbi.dto.OrderItemRequest;
import com.tarbi.dto.OrderItemResponse;
import com.tarbi.dto.OrderResponse;
import com.tarbi.dto.ProductResponse;
import com.tarbi.feign.ProductClient;
import com.tarbi.model.Order;
import com.tarbi.model.OrderItem;
import com.tarbi.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductClient productClient;

    public OrderResponse placeOrder(CreateOrderRequest request, Long userId) {
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());

        double total = 0.0;
        List<OrderItem> orderItems = new ArrayList<>();
        List<OrderItemResponse> itemResponses = new ArrayList<>();

        for (OrderItemRequest itemRequest : request.getItems()) {
            ProductResponse product = productClient.getProductById(itemRequest.getProductId());

            // Create order item entity
            OrderItem item = new OrderItem();
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setPrice(product.getPrice());
            item.setQuantity(itemRequest.getQuantity());
            item.setOrder(order);

            total += product.getPrice() * itemRequest.getQuantity();
            orderItems.add(item);

            // Create item response
            OrderItemResponse itemRes = new OrderItemResponse();
            itemRes.setProductId(product.getId());
            itemRes.setProductName(product.getName());
            itemRes.setQuantity(itemRequest.getQuantity());
            itemRes.setPrice(product.getPrice());
            itemResponses.add(itemRes);
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);
        Order savedOrder = orderRepository.save(order);

        // Use helper to return response
        return mapToOrderResponse(savedOrder);
    }

    public List<OrderResponse> getOrdersByUserId(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        List<OrderResponse> responses = new ArrayList<>();
        for (Order order : orders) {
            responses.add(mapToOrderResponse(order));
        }
        return responses;
    }

    private OrderResponse mapToOrderResponse(Order order) {
        OrderResponse response = new OrderResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus());
        response.setCreatedAt(order.getCreatedAt());

        List<OrderItemResponse> itemResponses = new ArrayList<>();
        double subtotal = 0.0;

        for (OrderItem item : order.getItems()) {
            OrderItemResponse itemRes = new OrderItemResponse();
            itemRes.setProductId(item.getProductId());
            itemRes.setProductName(item.getProductName());
            itemRes.setQuantity(item.getQuantity());
            itemRes.setPrice(item.getPrice());
            itemResponses.add(itemRes);

            subtotal += item.getPrice() * item.getQuantity();
        }

        double tax = subtotal * 0.07;
        double total = subtotal + tax;

        response.setItems(itemResponses);
        response.setSubtotal(subtotal);
        response.setTax(tax);
        response.setTotalAmount(total);

        return response;
    }


    public double getOrderTotal(Long orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));
        return order.getTotalAmount();
    }

    public OrderResponse getOrderById(Long orderId, Long userId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUserId().equals(userId)) {
            throw new RuntimeException("Access denied: You don't own this order");
        }

        return mapToOrderResponse(order);
    }

	public void removeOrderById(Long orderId) {
		orderRepository.deleteById(orderId);
	}

}
