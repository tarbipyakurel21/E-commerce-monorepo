package com.tarbi.util;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	public String getSecretForDebug() {
	    return secret;
	}

	
	public void validateToken(final String token) {
		Jwts
		.parserBuilder()
		.setSigningKey(getSignKey())
		.build()
		.parseClaimsJws(token);
		
	}
	
	private Key getSignKey() {
	    return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
	}

	public Long extractUserId(String token) {
	    return extractClaim(token, claims -> claims.get("userId", Long.class));
	}

	public String extractUsername(String token) {
		return extractClaim(token,Claims::getSubject);
		}
	
	public String extractRole(String token) {
		return extractClaim(token,claims->claims.get("role",String.class));
	}
	
	public<T> T extractClaim(String token, Function<Claims,T> claimsResolver) {
		final Claims claims=extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	private Claims extractAllClaims(String token) {
		return Jwts
				.parserBuilder()
				.setSigningKey(getSignKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
				
	}
}
