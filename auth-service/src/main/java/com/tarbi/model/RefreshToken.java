package com.tarbi.model;

import java.io.Serializable;
import java.time.Instant;

public class RefreshToken implements Serializable {

	private String username;
	private String token;
	private Instant expiryDate;
	
	public RefreshToken() {
		super();
	}

public RefreshToken(String username, String token, Instant expiryDate) {
		super();
		this.username = username;
		this.token = token;
		this.expiryDate = expiryDate;
	}

public String getUsername() {
	return username;
}

public void setUsername(String username) {
	this.username = username;
}

public String getToken() {
	return token;
}

public void setToken(String token) {
	this.token = token;
}

public Instant getExpiryDate() {
	return expiryDate;
}

public void setExpiryDate(Instant expiryDate) {
	this.expiryDate = expiryDate;
}
	
	
	
}
