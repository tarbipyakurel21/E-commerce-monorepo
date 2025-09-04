package com.tarbi.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tarbi.model.TrackingEventDocument;

@Service
public class KafkaProducerService {

	private final KafkaTemplate<String, String> kafkaTemplate;
	private final ObjectMapper objectMapper=new ObjectMapper();
	
	public KafkaProducerService(KafkaTemplate<String,String> kafkaTemplate) {
		this.kafkaTemplate=kafkaTemplate;
	}
	
	public void sendEvent(TrackingEventDocument event) {
		try {
			String message=objectMapper.writeValueAsString(event);
			kafkaTemplate.send("user-activity",message);
			System.out.println("Sent event to kafka: "+message);
		}
		catch(JsonProcessingException e) {
			System.err.println("kafka JSON error: "+e.getMessage());
		}
	}
	
}
