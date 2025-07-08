package com.tarbi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MyApiGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyApiGatewayApplication.class, args);
	}

}
