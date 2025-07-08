package com.tarbi.util;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.tarbi.model.CustomUserDetails;
import com.tarbi.model.User;
import com.tarbi.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
      Optional<User> user;
       
      //email
       if(identifier.contains("@")){
    	   user=userRepository.findByEmail(identifier);
       }
       //basic numeric check
       else if(identifier.matches("\\d{10,}")) {
    	 user=userRepository.findByPhoneNumber(identifier);
       }
       else {
    	   user=userRepository.findByUsername(identifier);
       }
       
       return user.map(CustomUserDetails::new)
    		   .orElseThrow(()->new UsernameNotFoundException("User not found"));
}
    }