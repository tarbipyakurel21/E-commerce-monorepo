package com.tarbi.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CookieValue;
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

import jakarta.servlet.http.HttpServletResponse;
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
public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
    return authService.login(request, response);
}


@PostMapping("/logout")
public ResponseEntity<String> logout(@CookieValue("accessToken") String accessToken, HttpServletResponse response) {
    // Invalidate token
   return authService.logout(accessToken, response);
}


@PostMapping("/refresh")
public ResponseEntity<AuthResponse> refreshAccessToken(@CookieValue(name="refreshToken",required=false)String refreshToken,HttpServletResponse response){
return authService.refreshAccessToken(refreshToken,response);
}

@GetMapping("/oauth2/success")
public ResponseEntity<AuthResponse> oauthSuccess(@AuthenticationPrincipal OAuth2User principal){
	return authService.handleOAuthSuccess(principal);
}

@GetMapping("/validate")
public ResponseEntity<?> validateUser(@CookieValue(name = "accessToken", required = false) String token) {
    if (token == null || token.isEmpty()) {
        return ResponseEntity.status(401).body(Map.of("error", "Access token missing"));
    }
    try {
        UserInfoResponse userInfo = authService.validateToken(token);
        return ResponseEntity.ok(userInfo);
    } catch (Exception e) {
        return ResponseEntity.status(401).body(Map.of("error", "Invalid or expired access token"));
    }
}
}


