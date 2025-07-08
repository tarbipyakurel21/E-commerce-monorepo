package com.tarbi.config;

import java.util.List;
import java.util.function.Predicate;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

@Component
public class RouteValidator {

	public static final List<String> publicApiEndpoints=List.of(
			"/auth/register",
			"/auth/login",
			"/auth/validate",
			"/api/products"
			);
	
	public Predicate<ServerHttpRequest> isSecured=
			request->publicApiEndpoints
			.stream()
			.noneMatch(uri->request.getURI().getPath().startsWith(uri));
}
