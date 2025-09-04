package com.tarbi.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarbi.service.RecommendationService;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

	private final RecommendationService service ;
	
	public RecommendationController(RecommendationService service) {
		this.service=service;
	}
	
	@GetMapping("/{userId}")
	public List<Long> recommend(@PathVariable Long userId){
		return service.getRecommendations(userId);
	}
}
