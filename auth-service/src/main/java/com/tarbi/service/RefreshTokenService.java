package com.tarbi.service;

import java.time.Instant;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.tarbi.model.RefreshToken;

@Service
public class RefreshTokenService {

private static final long REFRESH_TOKEN_EXPIRATION_MS=7 * 24 * 60 * 60 * 1000; // 7 days

@Autowired
@Qualifier("refreshTokenRedisTemplate")
private RedisTemplate<String,RefreshToken> redisTemplate;

private final String PREFIX="refresh_token";

public void saveRefreshToken(String username,String token) {
	Instant expiry=Instant.now().plusMillis(REFRESH_TOKEN_EXPIRATION_MS);
	RefreshToken refreshToken= new RefreshToken(username,token,expiry);
	redisTemplate.opsForValue().set(PREFIX+username, refreshToken,REFRESH_TOKEN_EXPIRATION_MS,TimeUnit.MILLISECONDS);
	
}

public boolean isRefreshTokenValid(String username,String token) {
	RefreshToken stored=redisTemplate.opsForValue().get(PREFIX+username);
	return stored !=null &&
			stored.getToken().equals(token) &&
			stored.getExpiryDate().isAfter(Instant.now());
}

public void deleteRefreshToken(String username) {
	redisTemplate.delete(PREFIX+username);
}

}

