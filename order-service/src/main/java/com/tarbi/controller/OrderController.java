package com.tarbi.controller;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarbi.dto.CreateOrderRequest;
import com.tarbi.dto.OrderResponse;
import com.tarbi.model.Order;
import com.tarbi.service.OrderService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody CreateOrderRequest request,
            @RequestHeader("X-UserId") Long userId) {
        OrderResponse createdOrder = orderService.placeOrder(request, userId);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getUserOrders(
            @RequestHeader("X-UserId") Long userId) {
        List<OrderResponse> orders = orderService.getOrdersByUserId(userId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable Long orderId,
            @RequestHeader("X-UserId") Long userId) {
        OrderResponse order = orderService.getOrderById(orderId, userId);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}/total")
    public ResponseEntity<Double> getOrderTotal(@PathVariable Long orderId) {
        double total = orderService.getOrderTotal(orderId);
        return ResponseEntity.ok(total);
    }
    
    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> removeOrder(@PathVariable Long orderId){
    	orderService.removeOrderById(orderId);
    	return ResponseEntity.ok().build();
    }
}
