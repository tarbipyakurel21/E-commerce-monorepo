package com.tarbi.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="user_events")
public class TrackingEventDocument {

	@Id
	private String id;
	private Long userId;
	private String eventType;
	private Long productId;
	private LocalDateTime timestamp;
	 // Contextual fields
    private String deviceType;
    private String category;
    private Double price;
    private String brand;
    private String location;
    private String timeOfDay;
    private String weekday;

    public TrackingEventDocument() {}

    public TrackingEventDocument(String id, Long userId, String eventType, Long productId, LocalDateTime timestamp,
                                 String deviceType, String category, Double price, String brand,
                                 String location, String timeOfDay, String weekday) {
        this.id = id;
        this.userId = userId;
        this.eventType = eventType;
        this.productId = productId;
        this.timestamp = timestamp;
        this.deviceType = deviceType;
        this.category = category;
        this.price = price;
        this.brand = brand;
        this.location = location;
        this.timeOfDay = timeOfDay;
        this.weekday = weekday;
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

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getEventType() {
		return eventType;
	}
	public void setEventType(String eventType) {
		this.eventType = eventType;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	public TrackingEventDocument(String id, Long userId, String eventType, Long productId, LocalDateTime timestamp) {
		super();
		this.id = id;
		this.userId = userId;
		this.eventType = eventType;
		this.productId = productId;
		this.timestamp = timestamp;
	}
	
	
	
	
}
