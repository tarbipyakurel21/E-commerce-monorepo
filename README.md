# 🛠️ Backend Microservices – E-commerce Monorepo

This folder contains the **backend microservices** for my e-commerce application built using **Java Spring Boot** with a microservices architecture.

---

## 📂 **Services Included**

- **auth-service/**  
  Handles authentication, JWT token generation, password encryption, and Google OAuth integration.

- **product-service/**  
  Manages product CRUD operations and product-related APIs.

- **cart-service/**  
  Handles shopping cart management for users.

- **order-service/**  
  Processes orders, maintains order history, and manages order status.

- **payment-service/**  
  Integrates Stripe payments for order checkout.

- **my-service-discovery/**  
  Service discovery using Eureka for registering and locating microservices dynamically.

- **my-api-gateway/**  
  API Gateway routing requests to appropriate microservices with security filters.

---

## 🚀 **Tech Stack**

- **Backend:** Java 17, Spring Boot, Spring Security, Spring Cloud
- **Communication:** REST APIs
- **Database:** MySQL
- **Authentication:** JWT, BCrypt, Google OAuth
- **Caching:** Redis
- **Payments:** Stripe API integration
- **Service Discovery:** Spring Cloud Eureka
- **Gateway:** Spring Cloud Gateway
- **Deployment:** Docker, GitHub Actions CI/CD, Render / AWS ECS

---

## ⚙️ **Running the Services**

### **1. Prerequisites**

- Java 17
- Maven
- Docker (for containerization)
- MySQL 

---

### **2. Environment Variables**

Each microservice requires its own `.env` or environment variables. Example:

JWT_SECRET=your_jwt_secret
DB_PASSWORD=db_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

AND FOR PAYMENT-SERVICE:
STRIPE_SECRET=thesecretkey




