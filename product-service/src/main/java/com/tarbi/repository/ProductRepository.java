package com.tarbi.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.tarbi.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {

	List<Product> findByCategoryContainingIgnoreCase(String category);
	List<Product> findByNameContainingIgnoreCaseAndCategoryContainingIgnoreCase(String name, String category);
	
	
}
