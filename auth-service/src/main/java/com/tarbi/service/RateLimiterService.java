package com.tarbi.service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RateLimiterService {

private final String PREFIX="rate_limit:";
private final int LIMIT=100;
private final Duration WINDOW=Duration.ofMinutes(15);
	
@Autowired
@Qualifier("customRedisTemplate")
private RedisTemplate<String,String> redisTemplate;

public boolean isAllowed(String key) {
	String redisKey=PREFIX+key;
	
	Long currentCount= redisTemplate.opsForValue().increment(redisKey);
	
	if(currentCount==1) {
		redisTemplate.expire(redisKey, WINDOW.getSeconds(),TimeUnit.SECONDS);
		
	}
	
	return currentCount <=LIMIT;
}
	
}
