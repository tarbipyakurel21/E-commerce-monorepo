package com.tarbi.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.tarbi.feign.OrderClient;



@Service
public class PaymentService {
	 
	@Autowired
    private OrderClient orderClient;
	
	
	
	public String createPaymentIntent(Long orderId, String currency) {
	        Double totalAmount = orderClient.getOrderTotal(orderId);

	        if (totalAmount == null || totalAmount <= 0) {
	            throw new IllegalArgumentException("Invalid order total amount");
	        }

	        Long amountInCents = Math.round(totalAmount * 100);

	        Map<String, Object> params = new HashMap<>();
	        params.put("amount", amountInCents);
	        params.put("currency", currency);
	        params.put("automatic_payment_methods", Map.of("enabled", true));

	        try {
	            PaymentIntent intent = PaymentIntent.create(params);
	           
	            //Publish in kafka
	          
	            
	            return intent.getClientSecret(); // used in frontend to confirm card
	        } 
	        catch (StripeException e) {
	            throw new RuntimeException("Stripe error: " + e.getMessage());
	        }
	    }
	}