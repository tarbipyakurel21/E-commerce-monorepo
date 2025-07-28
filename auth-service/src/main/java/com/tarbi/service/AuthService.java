package com.tarbi.service;



import java.time.Duration;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.http.HttpHeaders;
import com.tarbi.dto.AuthResponse;
import com.tarbi.dto.LoginRequest;
import com.tarbi.dto.RegisterRequest;
import com.tarbi.dto.UserInfoResponse;
import com.tarbi.model.CustomUserDetails;
import com.tarbi.model.Role;
import com.tarbi.model.User;
import com.tarbi.repository.UserRepository;
import com.tarbi.util.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;


@Service
public class AuthService {

@Autowired
private UserRepository userRepository;

@Autowired
private JwtUtil jwtUtil;

@Autowired
private PasswordEncoder passwordEncoder;

@Autowired
private TokenBlacklistService tokenBlacklistService;

@Autowired
private RefreshTokenService refreshTokenService;

@Autowired
private AuthenticationManager authManager;

@Autowired
private RateLimiterService rateLimiterService;

// User lookup 
public Optional<User> findByIdentifier(String identifier){
	if(identifier.contains("@")) {
		return userRepository.findByEmail(identifier);
		}
	else if(identifier.matches("\\d{10,}")) {
		return userRepository.findByPhoneNumber(identifier);
	}
	else {
		return userRepository.findByUsername(identifier);
	}
}

//registration
public ResponseEntity<AuthResponse> register(RegisterRequest request) {
	
	String key="register:"+request.getUsername();
	
	if(!rateLimiterService.isAllowed(key)) {
		return ResponseEntity.status(429).body(new AuthResponse(null,null,"Too many register attempts"));
	}
	if (findByIdentifier(request.getIdentifier()).isPresent()) {
	            return ResponseEntity.status(409).body(new AuthResponse(null, null, "User already exists with this identifier"));
	        }
	User user=new User();
	user.setUsername(request.getUsername());
	if (request.getIdentifier().contains("@")) {
        user.setEmail(request.getIdentifier());
    } else {
        user.setPhoneNumber(request.getIdentifier());
    }
	user.setPassword(passwordEncoder.encode(request.getPassword()));
	
	// Prevent admin registration
    Role role = request.getRole() != null && request.getRole() == Role.SELLER
            ? Role.SELLER
            : Role.USER;

    user.setRole(role);
    userRepository.save(user);
	userRepository.save(user);
	
	String token=jwtUtil.generateToken(user);
	return ResponseEntity.ok(new AuthResponse(null,null,"User registered"));

}


// Login via email/username/password
public ResponseEntity<AuthResponse> login(LoginRequest request,HttpServletResponse response) {
	System.out.println("Login identifier: " + request.getIdentifier());
	System.out.println("Login password: " + request.getPassword());
	Optional<User> userOpt = findByIdentifier(request.getIdentifier());
	if (userOpt.isPresent()) {
	    User user = userOpt.get();
	    System.out.println("✅ Found user: " + user.getUsername());
	    System.out.println("🔐 Hashed password in DB: " + user.getPassword());
	    System.out.println("🔄 Password match? " + passwordEncoder.matches(request.getPassword(), user.getPassword()));
	} else {
	    System.out.println("❌ No user found with identifier: " + request.getIdentifier());
	}

	try {
		Authentication authentication=authManager.authenticate(
				new UsernamePasswordAuthenticationToken(
						request.getIdentifier(),request.getPassword()
						));
		CustomUserDetails customUser = (CustomUserDetails) authentication.getPrincipal();
		User user = customUser.getUser(); 

		String accessToken=jwtUtil.generateToken(user);
		String refreshToken=jwtUtil.generateRefreshToken(user);
		refreshTokenService.saveRefreshToken(user.getUsername(), refreshToken);
		
		//set cookies first i made to use localstorage in frontend now i want to set
		// cookies based Jwt that is why i am setting cookies
		
		ResponseCookie accessCookie=ResponseCookie.from("accessToken",accessToken)
				.httpOnly(true)
				.secure(true)
				.path("/")
				.sameSite("Strict")
				.maxAge(Duration.ofMinutes(15))
				.build();
		
		ResponseCookie refreshCookie=ResponseCookie.from("refreshToken",refreshToken)
				.httpOnly(true)
				.secure(true)
				.path("/")
				.sameSite("Strict")
				.maxAge(Duration.ofDays(7))
				.build();
		
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.SET_COOKIE, accessCookie.toString());
		headers.add(HttpHeaders.SET_COOKIE, refreshCookie.toString());

		return ResponseEntity.ok()
		        .headers(headers)
		        .body(new AuthResponse(null, null, "Login successful"));
		}
	
catch(AuthenticationException e) {
    return ResponseEntity.status(401).body(new AuthResponse(null,null,"Invalid Username or password"));
}
}

public ResponseEntity<String> logout(String accessToken, HttpServletResponse response) {
    // 1. Blacklist the token
    if (accessToken != null) {
        tokenBlacklistService.blacklistToken(accessToken);
    }

    // 2. Create expired cookies to clear them from browser
    ResponseCookie clearAccessCookie = ResponseCookie.from("accessToken", "")
        .httpOnly(true)
        .secure(true)
        .path("/")
        .sameSite("Strict")
        .maxAge(0) // expire now
        .build();

    ResponseCookie clearRefreshCookie = ResponseCookie.from("refreshToken", "")
        .httpOnly(true)
        .secure(true)
        .path("/")
        .sameSite("Strict")
        .maxAge(0)
        .build();

    // 3. Add to response headers
    response.addHeader(HttpHeaders.SET_COOKIE, clearAccessCookie.toString());
    response.addHeader(HttpHeaders.SET_COOKIE, clearRefreshCookie.toString());

    return ResponseEntity.ok("Logged out successfully");
}
//refresh token
public ResponseEntity<AuthResponse> refreshAccessToken(String refreshToken,HttpServletResponse response) {
	String username=jwtUtil.extractUsername(refreshToken);
	if(refreshTokenService.isRefreshTokenValid(username, refreshToken)) {
		User user=userRepository.findByUsername(username)
				.orElseThrow(()->new UsernameNotFoundException("User not found"));
		
		String newAccessToken=jwtUtil.generateToken(user);
		Cookie accessCookie=new Cookie("accessToken",newAccessToken);
		accessCookie.setHttpOnly(true);
		accessCookie.setSecure(true);
		accessCookie.setPath("/");
		accessCookie.setMaxAge(60*15);
		response.addCookie(accessCookie);
		
		return ResponseEntity.ok(new AuthResponse(newAccessToken,refreshToken,"Token refreshed"));
	}
	return ResponseEntity.status(403).body(new AuthResponse(null,null,"Invalid or expired refresh token"));
}
//google oauth2 login
public ResponseEntity<AuthResponse> handleOAuthSuccess(OAuth2User principal) {
    String email = principal.getAttribute("email");
    String name = principal.getAttribute("name");

    if (email == null) {
        return ResponseEntity.status(400).body(
            new AuthResponse(null, null, "Email not found from OAuth2 provider"));
    }

    Optional<User> userOpt = userRepository.findByUsername(email);

    User user = userOpt.orElseGet(() -> {
        User newUser = new User();
        newUser.setUsername(email);
        newUser.setPassword(null); // OAuth users don’t need a password
        newUser.setRole(Role.BUYER);
        return userRepository.save(newUser);
    });

    String accessToken = jwtUtil.generateToken(user);
    String refreshToken = jwtUtil.generateRefreshToken(user);
    refreshTokenService.saveRefreshToken(user.getUsername(), refreshToken);

    return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, "OAuth2 login successful"));
}



//token validation can directly use in api gateway
public UserInfoResponse validateToken(String token) {
	
	if(jwtUtil.isTokenExpired(token) || tokenBlacklistService.isTokenBlacklisted(token)) {
		throw new RuntimeException("token expired");
		}
	
	String username=jwtUtil.extractUsername(token);
	String role=jwtUtil.extractRole(token);
	
	return new UserInfoResponse(username, role);
}




}
