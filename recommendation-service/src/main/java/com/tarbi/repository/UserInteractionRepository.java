package com.tarbi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tarbi.model.UserInteraction;

public interface UserInteractionRepository extends JpaRepository<UserInteraction,Long> {
	
	List<UserInteraction> findByUserId(Long userId);

}
