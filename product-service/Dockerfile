
FROM eclipse-temurin:17-jdk


WORKDIR /app

COPY target/product-service-0.0.1-SNAPSHOT.jar app.jar


EXPOSE 8082

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
