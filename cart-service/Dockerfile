
FROM eclipse-temurin:17-jdk


WORKDIR /app

COPY target/cart-service-0.0.1-SNAPSHOT.jar app.jar


EXPOSE 8083

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
