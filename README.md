🛒 E-commerce Monorepo
This monorepo contains all backend microservices and the frontend React application for a scalable e-commerce platform built using Java Spring Boot and React, following a modern microservices architecture.

📦 Services Overview:

🧩 Backend Microservices:

auth-service/
Handles user authentication, JWT token generation, password encryption with BCrypt, and Google OAuth integration.

product-service/
Manages product CRUD operations and product-related APIs.

cart-service/
Handles shopping cart logic, including adding, updating, and removing items.

order-service/
Manages order placement, history, and status tracking.

payment-service/
Integrates Stripe to securely process payments at checkout.

my-service-discovery/
Uses Spring Cloud Eureka for dynamic service discovery and registration.

my-api-gateway/
Routes external requests to internal microservices, handling security and load balancing.

🖥️ Frontend React App:
Located in /frontend/

Built with React 18

Communicates with backend via API Gateway

Uses Redux Toolkit for global state (cart, auth,product)

Integrates Stripe for secure payments

Supports JWT and Google OAuth login

Fully responsive layout

🧰 Tech Stack:

⚙️ Backend:

Java 17, Spring Boot

Spring Security, Spring Cloud Gateway, Eureka

JWT, BCrypt, Google OAuth 2.0

MySQL for databases

Redis for caching & token storage

Stripe API for payments

REST (with optional Kafka for future event streaming)

Docker + GitHub Actions CI/CD

Deployable on Render or AWS ECS

⚙️ Frontend:

React 18

Redux Toolkit, React Router

Axios with interceptors

Bootstrap 

Stripe.js + React Stripe Elements

🧪 Running the Project Locally:

1️⃣ Prerequisites:

Backend:

Java 17

Maven

MySQL

Docker (optional for containerization)

Frontend:

Node.js (v18+)

npm 

2️⃣ Environment Variables
🔐 Backend Example (.env or in system environment):
env

For auth-service:
JWT_SECRET=your_jwt_secret
DB_PASSWORD=your_db_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

For payment-service:
STRIPE_SECRET=your_stripe_secret_key

For all other microservices:
DB_PASSWORD=your_db_password

🌐 Frontend Example (frontend/.env):
REACT_APP_API_BASE_URL=http://localhost:8080
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
Ensure port 8080 matches your API Gateway.

🚀 How to Run
🧩 Backend Services
-ensure you have the .env file and the right keys first

From the root of each service folder:
bash
npm install -g dotenv-cli(you can use alternative like environment variables from IDE)
dotenv -e .env -- mvn spring-boot:run (this is faster)

🖥️ Frontend App
bash
cd frontend
npm install
npm start
