package com.tarbi.service;

import java.util.List;


import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.tarbi.dto.AIRequest;
import com.tarbi.model.UserInteraction;
import com.tarbi.repository.UserInteractionRepository;

@Service
public class RecommendationService {
	
	private final UserInteractionRepository repository;
	private final WebClient webClient;
	
	 public RecommendationService(UserInteractionRepository repository, WebClient.Builder webClientBuilder) {
	        this.repository = repository;
	        this.webClient = webClientBuilder.baseUrl("http://ai-service:8000").build(); // or "http://localhost:8000" if local
	    }

	public List<Long> getRecommendations(Long userId) {
		
		List<UserInteraction> interactions= repository.findByUserId(userId);
		
		AIRequest request = new AIRequest(userId,interactions);
		
		List<Long> productIds=webClient.post()
				.uri("/api/recommend")
				.bodyValue(request)
				.retrieve()
				.bodyToMono(new ParameterizedTypeReference<List<Long>>() {})
				.block();
		
		return productIds;
	}

}
