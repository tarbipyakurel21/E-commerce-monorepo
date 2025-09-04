package com.tarbi.dto;

import java.util.List;

import com.tarbi.model.UserInteraction;

public class AIRequest {

	private Long userId;
	private List< UserInteraction> interactions;
	
	
	
	public AIRequest(Long userId, List<UserInteraction> interactions) {
		super();
		this.userId = userId;
		this.interactions = interactions;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public List<UserInteraction> getInteractions() {
		return interactions;
	}
	public void setInteractions(List<UserInteraction> interactions) {
		this.interactions = interactions;
	}
	
	
	
}
