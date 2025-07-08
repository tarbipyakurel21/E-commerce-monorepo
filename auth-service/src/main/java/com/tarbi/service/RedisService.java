package com.tarbi.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RedisService {

	
@Autowired
@Qualifier("objectRedisTemplate")
private RedisTemplate<String,Object> redisTemplate;


public <T> T get(String key, Class<T> entityClass) {
	try {
		Object o=redisTemplate.opsForValue().get(key);
		ObjectMapper mapper=new ObjectMapper();
		
		return mapper.readValue(o.toString(), entityClass);
	}
	catch(Exception e) {
		e.printStackTrace();
		return null;
}
}



public <T> void set(String key, Object o,long ttl) {
	try {
		redisTemplate.opsForValue().set(key,o,ttl,TimeUnit.SECONDS);
}
	catch(Exception e) {
		e.printStackTrace();
		}
}

}
