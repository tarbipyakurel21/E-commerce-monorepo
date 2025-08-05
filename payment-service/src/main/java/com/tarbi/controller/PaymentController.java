package com.tarbi.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.tarbi.dto.PaymentRequest;
import com.tarbi.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;
	
	@PostMapping("/create-intent")
	public ResponseEntity<Map<String, String>> createIntent(@RequestBody PaymentRequest request) {
	    String clientSecret = paymentService.createPaymentIntent(request.getOrderId(),request.getCurrency());
	    return ResponseEntity.ok(Map.of("clientSecret", clientSecret));
	}


}
