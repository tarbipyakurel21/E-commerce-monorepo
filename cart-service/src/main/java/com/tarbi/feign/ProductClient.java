package com.tarbi.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.tarbi.dto.ProductResponse;

@FeignClient(name="product-service")
public interface ProductClient {

	@GetMapping("/api/products/{id}")
	ProductResponse getProductsById(@PathVariable("id") Long productId,@RequestHeader("Internal-Call") String flag);

	

}
