package com.tarbi.stripe;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import com.stripe.Stripe;

import jakarta.annotation.PostConstruct;

@Configuration
public class StripeConfig {

	@Value("${stripe.secret.key}")
	private String secretKey;
	
	@PostConstruct
	public void init() {
		Stripe.apiKey=secretKey;
	}
}
