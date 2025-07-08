package com.tarbi.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProtectedController {

	@GetMapping("/profile")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> getProfile() {
	    return ResponseEntity.ok("WELCOME ADMIN");
	}
}
