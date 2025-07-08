package com.tarbi.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Cart {

@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;

private String userId;

@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
private List<CartItem> items=new ArrayList<>();


public Cart() {
	
}

public Cart(String userId) {
	super();
	this.userId = userId;
}

public Long getId() {
	return id;
}

public void setId(Long id) {
	this.id = id;
}

public String getUserId() {
	return userId;
}

public void setUserId(String userId) {
	this.userId = userId;
}

public List<CartItem> getItems() {
	return items;
}

public void setItems(List<CartItem> items) {
	this.items = items;
}




}
