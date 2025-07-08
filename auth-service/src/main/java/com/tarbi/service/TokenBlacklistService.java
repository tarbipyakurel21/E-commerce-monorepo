package com.tarbi.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class TokenBlacklistService {

	
@Autowired
@Qualifier("customRedisTemplate")
private RedisTemplate<String,String> redisTemplate;


public void blacklistToken(String token) {
	redisTemplate.opsForValue().set(token,"blacklisted",1,TimeUnit.DAYS);
}
	
public boolean isTokenBlacklisted(String token) {
	return redisTemplate.hasKey(token);
}

public void removeTokensForUser(String token) {
	redisTemplate.delete(token);
	
}
}
