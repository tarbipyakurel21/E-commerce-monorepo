package com.tarbi.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
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
			
			ServerHttpRequest request=null;
			
			if(routeValidator.isSecured.test(exchange.getRequest())) {
				if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("Missing authorization Header");
				}
				 
				String authHeader=exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				
				if(authHeader!=null && authHeader.startsWith("Bearer ")) {
					authHeader=authHeader.substring(7);
				}
				
				try {
					jwtUtil.validateToken(authHeader);
					
						request=exchange.getRequest()
							.mutate()
							.header("X-LoggedInUser",jwtUtil.extractUsername(authHeader))
							.header("X-Role", jwtUtil.extractRole(authHeader))
							.header("X-UserId", String.valueOf(jwtUtil.extractUserId(authHeader)))
							.build();
					}
				
				catch(Exception e) {
					System.out.println("Invalid token");
					throw new RuntimeException("unauthorized access to application");
				}
				}
			
			return chain.filter(exchange.mutate().request(request).build());
		};
	}
   public static class Config{
		
	}
}
