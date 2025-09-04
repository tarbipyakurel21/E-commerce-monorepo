package com.tarbi.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tarbi.model.TrackingEventDocument;

public interface UserEventRepository extends MongoRepository<TrackingEventDocument,String> {
	

}
