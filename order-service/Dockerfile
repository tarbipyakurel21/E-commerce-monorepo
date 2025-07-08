
FROM eclipse-temurin:17-jdk


WORKDIR /app

COPY target/order-service-0.0.1-SNAPSHOT.jar app.jar


EXPOSE 8084

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
