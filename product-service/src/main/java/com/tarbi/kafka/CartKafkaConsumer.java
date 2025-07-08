package com.tarbi.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.tarbi.service.ProductService;

@Service
public class CartKafkaConsumer {
	
	@Autowired
	private ProductService productService;

	@KafkaListener(topics="cart-item-topic",groupId="codeDecodegroup")
	public void listenToTopic(CartItemEvent event) {
	System.out.println("Received cart item: "+event);	
	
}
}
