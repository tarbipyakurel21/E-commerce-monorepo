
FROM eclipse-temurin:17-jdk


WORKDIR /app

COPY target/my-service-discovery-0.0.1-SNAPSHOT.jar app.jar


EXPOSE 8761

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
