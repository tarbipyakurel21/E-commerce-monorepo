package com.tarbi.config;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class HeaderAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String userId = request.getHeader("X-LoggedInUser");
        String role = request.getHeader("X-Role");

        if (userId != null && role != null &&SecurityContextHolder.getContext().getAuthentication()==null) {
           
        	
        	SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_"+role.toUpperCase());
            
           UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
        		   userId, null, Collections.singletonList(authority));
            
            SecurityContextHolder.getContext().setAuthentication(authentication);

            
            System.out.println("[HeaderAuthenticationFilter] Authenticated User ID: " + userId);
       
        } else {
          
        	System.out.println("[HeaderAuthenticationFilter] Missing headers - X-USER-ID or X-USER-ROLE");
        }

        filterChain.doFilter(request, response);
    }
}
