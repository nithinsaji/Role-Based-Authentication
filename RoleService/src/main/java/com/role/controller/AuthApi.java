package com.role.controller;

import java.time.LocalDateTime;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.role.dto.AuthRequest;
import com.role.dto.AuthResponse;
import com.role.jwt.JwtTokenUtil;
import com.role.user.User;
import com.role.user.UserRepository;


@RestController
public class AuthApi {
	@Autowired AuthenticationManager authManager;
	@Autowired JwtTokenUtil jwtUtil;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/auth/login")
	public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
		System.out.println("Inside AuthAPI");
		try {
			Authentication authentication = authManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							request.getEmail(), request.getPassword())
			);
			
			User user = (User) authentication.getPrincipal();
			String accessToken = jwtUtil.generateAccessToken(user);
			AuthResponse response = new AuthResponse(user.getEmail(), accessToken, user.getRoles());
			
			//Updating last login time
			user.setLastLogin(LocalDateTime.now());
			userRepository.save(user);
			
			
			return ResponseEntity.ok().body(response);
			
		} catch (BadCredentialsException ex) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
	}
	
	@GetMapping("/validate")
	public ResponseEntity<Boolean> validate() {
		return ResponseEntity.ok().body(true);
	}
}
