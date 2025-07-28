package com.tarbi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import com.tarbi.util.JwtUtil;

@Component
public class GatewayAuthFilter extends AbstractGatewayFilterFactory<GatewayAuthFilter.Config> {
	
	@Autowired
	private RouteValidator routeValidator;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	public GatewayAuthFilter() {
		super(Config.class);
	}
	
	@Override
	public GatewayFilter apply(Config config) {
		
		return (exchange,chain)->{
			
			ServerHttpRequest request=exchange.getRequest();
			
			if(routeValidator.isSecured.test(request)) {
				HttpCookie accessTokenCookie=request.getCookies().getFirst("accessToken");
				 
				if(accessTokenCookie==null) {
					System.out.println("Missing accessToken cookies");
					exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
					return exchange.getResponse().setComplete();
				}
				
				String token=accessTokenCookie.getValue();
				
				
				try {
				    System.out.println("===== TOKEN VALIDATION START =====");
				    System.out.println("Extracted token: " + token);
				    System.out.println("Using secret:"+jwtUtil.getSecretForDebug() ); // see below
				    jwtUtil.validateToken(token);
				    System.out.println("Token validation SUCCESS");

				    request = exchange.getRequest()
				            .mutate()
				            .header("X-LoggedInUser", jwtUtil.extractUsername(token))
				            .header("X-Role", jwtUtil.extractRole(token))
				            .header("X-UserId", String.valueOf(jwtUtil.extractUserId(token)))
				            .build();

				} catch (Exception e) {
				    System.out.println("===== TOKEN VALIDATION FAILED =====");
				    System.out.println("Error: " + e.getClass().getName() + " - " + e.getMessage());
				    exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
				    return exchange.getResponse().setComplete();
				}
				}
			
			return chain.filter(exchange.mutate().request(request).build());
		};
	}
   public static class Config{
		
	}
}
