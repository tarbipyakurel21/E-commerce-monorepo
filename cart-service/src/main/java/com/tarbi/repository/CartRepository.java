package com.tarbi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tarbi.model.Cart;



public interface CartRepository extends JpaRepository<Cart,Long> {

	Optional<Cart> findByUserId(String userId);

}
