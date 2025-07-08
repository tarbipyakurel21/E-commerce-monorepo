package com.tarbi.security;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.tarbi.util.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled=true)
public class SecurityConfig {

@Autowired
private JwtAuthenticationFilter jwtFilter;

@Autowired
private CustomUserDetailsService userDetailsService;

@Bean 
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
	return http
			.csrf(AbstractHttpConfigurer::disable)
			.sessionManagement(sm->sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			.authorizeHttpRequests(auth->auth
					.requestMatchers("/auth/**","/swagger-ui.html","/swagger-ui/**", "/v3/api-docs/**",
							"/v2/api-docs",
					        "/swagger-resources/**",
					        "/webjars/**").permitAll()
					.anyRequest().authenticated()
					)
			.authenticationProvider(authenticationProvider())
			.addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class)
			.build();
	
}

@Bean
public AuthenticationProvider authenticationProvider() {
	DaoAuthenticationProvider provider=new DaoAuthenticationProvider();
	provider.setUserDetailsService(userDetailsService);
	provider.setPasswordEncoder(new BCryptPasswordEncoder());
	return provider;
	
}

@Bean
public AuthenticationManager authManager(HttpSecurity http) throws Exception{
	return http.getSharedObject(AuthenticationManagerBuilder.class)
			.authenticationProvider(authenticationProvider())
			.build();
	
}


}
