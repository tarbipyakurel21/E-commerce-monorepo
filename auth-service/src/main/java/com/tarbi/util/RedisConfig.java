package com.tarbi.util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.jsontype.BasicPolymorphicTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.tarbi.model.RefreshToken;

@Configuration
public class RedisConfig {

	
@Bean(name = "refreshTokenRedisTemplate")
public RedisTemplate<String,RefreshToken> redisTemplate(RedisConnectionFactory factory){
	
	RedisTemplate<String,RefreshToken> template=new RedisTemplate<>();
	template.setConnectionFactory(factory);
	template.setKeySerializer(new StringRedisSerializer());
	
	ObjectMapper mapper=new ObjectMapper();
	mapper.registerModule(new JavaTimeModule());
	mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
	
	Jackson2JsonRedisSerializer<RefreshToken> serializer=new Jackson2JsonRedisSerializer<>(mapper,RefreshToken.class);
	
	template.setValueSerializer(serializer);
	
	
	return template;
}

@Bean(name = "customRedisTemplate")
public RedisTemplate<String, String> customRedisTemplate(RedisConnectionFactory factory) {
    RedisTemplate<String, String> template = new RedisTemplate<>();
    template.setConnectionFactory(factory);
    template.setKeySerializer(new StringRedisSerializer());
    template.setValueSerializer(new StringRedisSerializer());
    return template;
}

// for caching generic
@Bean(name="objectRedisTemplate")
public RedisTemplate<String,Object> objectRedisTemplate(RedisConnectionFactory factory){
RedisTemplate<String,Object> template=new RedisTemplate<>();
template.setConnectionFactory(factory);
template.setKeySerializer(new StringRedisSerializer());

ObjectMapper mapper=new ObjectMapper();
mapper.activateDefaultTyping(BasicPolymorphicTypeValidator.builder()
		.allowIfBaseType(Object.class)
		.build(),
		ObjectMapper.DefaultTyping.NON_FINAL);

Jackson2JsonRedisSerializer<Object> valueSerializer=new Jackson2JsonRedisSerializer<>(mapper,Object.class);

template.setValueSerializer(valueSerializer);
return template;

}
}
