
FROM eclipse-temurin:17-jdk


WORKDIR /app

COPY target/my-api-gateway-0.0.1-SNAPSHOT.jar app.jar


EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
