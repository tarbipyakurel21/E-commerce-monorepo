package com.tarbi.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.tarbi.dto.AuthResponse;
import com.tarbi.dto.LoginRequest;
import com.tarbi.dto.RegisterRequest;
import com.tarbi.dto.TokenRequest;
import com.tarbi.dto.UserInfoResponse;
import com.tarbi.model.User;
import com.tarbi.service.AuthService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/auth")
public class AuthController {

@Autowired
private AuthService authService;

@PostMapping("/register")
public ResponseEntity<AuthResponse> register (@Valid @RequestBody RegisterRequest request) {

	return authService.register(request);

}

@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
	return authService.login(request);
}


@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader){
	
		// remove bearer prefix
		String token=authHeader.replace("Bearer ","");
		return authService.logout(token);
}

@PostMapping("/refresh")
public ResponseEntity<AuthResponse> refreshAccessToken(@RequestBody Map<String,String> request){
String refreshToken=request.get("refreshToken");
return authService.refreshAccessToken(refreshToken);
}

@GetMapping("/oauth2/success")
public ResponseEntity<AuthResponse> oauthSuccess(@AuthenticationPrincipal OAuth2User principal){
	return authService.handleOAuthSuccess(principal);
}

@PostMapping("/validate")
public ResponseEntity<UserInfoResponse> validateToken(@RequestBody TokenRequest request){
	try {
		UserInfoResponse userInfo=authService.validateToken(request.getAccessToken());
		System.out.println("[AuthService] Received token to validate: ");
		return ResponseEntity.ok(userInfo);
	}
	catch(RuntimeException e) {
		return ResponseEntity.status(401).body(null);
		}
}

}


