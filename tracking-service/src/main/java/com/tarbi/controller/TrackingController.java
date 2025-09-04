package com.tarbi.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarbi.kafka.KafkaProducerService;
import com.tarbi.model.TrackingEventDocument;
import com.tarbi.repository.UserEventRepository;

@RestController
@RequestMapping("/tracking")
public class TrackingController {

	@Autowired
	private UserEventRepository eventRepository;
	
	@Autowired
	private KafkaProducerService kafkaProducerService;

	@PostMapping
	public ResponseEntity<String> trackEvent(@RequestBody TrackingEventDocument event) {
	    TrackingEventDocument document = new TrackingEventDocument(
	        null, // Mongo will auto-generate ID
	        event.getUserId(),
	        event.getEventType(),
	        event.getProductId(),
	        LocalDateTime.now() // or parse event.getTimestamp() if you're sending it from frontend
	    );

	    eventRepository.save(document);
	    kafkaProducerService.sendEvent(document);
	   return ResponseEntity.ok("Event stored and streamed");
	}	

}
