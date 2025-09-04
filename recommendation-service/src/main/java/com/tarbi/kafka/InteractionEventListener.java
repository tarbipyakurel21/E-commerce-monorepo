package com.tarbi.kafka;
import com.tarbi.service.RecommendationService;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.tarbi.model.UserInteraction;
import com.tarbi.repository.UserInteractionRepository;

@Service
public class InteractionEventListener {

    private final RecommendationService recommendationService;

	private final UserInteractionRepository repository;
	
	public InteractionEventListener(UserInteractionRepository repository, RecommendationService recommendationService) {
        this.repository = repository;
        this.recommendationService = recommendationService;
    }
	
	@KafkaListener(topics="user-product-viewed",groupId="recommendation-group")
	public void onProductViewed(ProductViewedEvent event) {
		UserInteraction interaction = new UserInteraction(
				null,
				event.getUserId(),
		        event.getProductId(),
		        "view",
		        event.getTimestamp(),
		        event.getDeviceType(),
		        event.getCategory(),
		        event.getPrice(),
		        event.getBrand(),
		        event.getLocation(),
		        event.getTimeOfDay(),
		        event.getWeekday()
		    );
		repository.save(interaction);
	}
	
	
}
