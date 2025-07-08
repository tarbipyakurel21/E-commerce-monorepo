package com.tarbi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tarbi.dto.ProductRequest;
import com.tarbi.dto.ProductResponse;
import com.tarbi.model.Product;
import com.tarbi.service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

@Autowired
private ProductService productService;

// Get All products or By Category
@GetMapping
public ResponseEntity<?> getAllProducts(@RequestParam(required = false) String category) {
    try {
        List<ProductResponse> products = 
            (category != null && !category.isEmpty())
                ? productService.getProductsByCategory(category)
                : productService.getAllProducts();

        return ResponseEntity.ok(products);
    } catch (Exception e) {
        e.printStackTrace(); 
        return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
    }
}

// Get products by Id
@GetMapping("/{id}")
public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id){
	return ResponseEntity.ok(productService.getProductById(id));
}

//Search products by name
@GetMapping("/search")
public ResponseEntity<List<ProductResponse>> searchProducts(@RequestParam String name) {
    return ResponseEntity.ok(productService.searchProductsByName(name));
}

//filter products by name and category
@GetMapping("/filter")
public ResponseEntity<List<ProductResponse>> getProductsByNameAndCategory(
        @RequestParam String name,
        @RequestParam String category) {
    return ResponseEntity.ok(productService.getProductsByNameAndCategory(name, category));
}

//Create a product by admin
@PostMapping
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest request){
	
	ProductResponse savedProduct=productService.createProduct(request);
	return ResponseEntity.ok(savedProduct);
}

// Update a product by admin
@PutMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<ProductResponse> updateProduct( @PathVariable Long id, @RequestBody ProductRequest request) {
    return ResponseEntity.ok(productService.updateProduct(id, request));
}

// Delete a product by admin
@DeleteMapping("/{id}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
	productService.deleteProduct(id);
	return ResponseEntity.noContent().build();
}

}
