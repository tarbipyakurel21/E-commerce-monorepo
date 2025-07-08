package com.tarbi.util;

import java.security.Key;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import com.tarbi.model.*;

@Component
public class JwtUtil {
	@Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration; // in milliseconds
    
    private Key getSigningKey() {
    return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
	
public String generateToken(User user) {
	if (user.getRole() == null) {
        throw new IllegalStateException("User does not have a role assigned.");
    }
	
	Map<String,Object> claims=new HashMap<>();
	claims.put("role",user.getRole().name());
	claims.put("userId",user.getId());
	
	return Jwts.builder()
			.setClaims(claims)
			.setSubject(user.getUsername())
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis()+expiration))
			.signWith(getSigningKey(),SignatureAlgorithm.HS256)
			.compact();
}


public String generateRefreshToken(User user) {
	return Jwts.builder()
			.setSubject(user.getUsername())
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis()+7*24*60*60*1000)) // 7 days
			.signWith(getSigningKey(),SignatureAlgorithm.HS256)
			.compact();
	
}

public Long extractUserId(String token) {
	return extractAllClaims(token).get("userId",Long.class);
}
public String extractUsername(String token) {
	return extractAllClaims(token).getSubject();
}

public String extractRole(String token) {
    return extractAllClaims(token).get("role",String.class);
}

public boolean validateToken(String token, String username) {
	return username.equals(extractUsername(token)) && !isTokenExpired(token);
}

public boolean isTokenExpired(String token) {
	return extractAllClaims(token).getExpiration().before(new Date());
}

private Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
}


}
