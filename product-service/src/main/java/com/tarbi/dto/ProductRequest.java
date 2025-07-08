package com.tarbi.dto;

public class ProductRequest {

    private String name;
    private String description;
    private double price;
    private int quantity;
    private String category;

    // Constructors
    public ProductRequest() {}

    
    public ProductRequest(String name, String description, double price, int quantity) {
		super();
		this.name = name;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
	}


	// Getters & Setters
    
    
    
    public String getName() {
        return name;
    }

    public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public int getQuantity() {
		return quantity;
	}


	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}


	public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
