package com.tarbi.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserInteraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long productId;
    private String eventType;
    private LocalDateTime timestamp;

    // 🔽 New contextual fields
    private String deviceType;
    private String category;
    private Double price;
    private String brand;
    private String location;
    private String timeOfDay;
    private String weekday;

    public UserInteraction() {} // ✅ JPA requires no-arg constructor

    public UserInteraction(Long id, Long userId, Long productId, String eventType, LocalDateTime timestamp,
                           String deviceType, String category, Double price, String brand,
                           String location, String timeOfDay, String weekday) {
        this.id = id;
        this.userId = userId;
        this.productId = productId;
        this.eventType = eventType;
        this.timestamp = timestamp;
        this.deviceType = deviceType;
        this.category = category;
        this.price = price;
        this.brand = brand;
        this.location = location;
        this.timeOfDay = timeOfDay;
        this.weekday = weekday;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public String getDeviceType() {
		return deviceType;
	}

	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getTimeOfDay() {
		return timeOfDay;
	}

	public void setTimeOfDay(String timeOfDay) {
		this.timeOfDay = timeOfDay;
	}

	public String getWeekday() {
		return weekday;
	}

	public void setWeekday(String weekday) {
		this.weekday = weekday;
	}

    
}
