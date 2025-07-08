package com.tarbi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tarbi.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem,Long> {

}
