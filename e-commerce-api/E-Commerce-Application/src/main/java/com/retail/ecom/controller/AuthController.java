package com.retail.ecom.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.retail.ecom.jwt.JwtService;
import com.retail.ecom.request.dto.AuthRequest;
import com.retail.ecom.request.dto.OtpRequest;
import com.retail.ecom.request.dto.UserRequest;
import com.retail.ecom.response.dto.AuthResponse;
import com.retail.ecom.response.dto.UserResponse;
import com.retail.ecom.service.AuthService;
import com.retail.ecom.utility.ResponseStructure;
import com.retail.ecom.utility.SimpleResponseStructure;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/ecom/v1")
@CrossOrigin(origins = "http://localhost:5174/", allowCredentials = "true")
@AllArgsConstructor
public class AuthController {
	private AuthService authService;
	private JwtService jwtService;
	
	@PostMapping("/register")
	ResponseEntity<SimpleResponseStructure> registerUSer(@RequestBody UserRequest userRequest) {
		return authService.registerUser(userRequest);
	}

	@PostMapping("/verify-email")
	ResponseEntity<ResponseStructure<UserResponse>> verifyOtp(@RequestBody OtpRequest otpRequest) {
		return authService.verifyOtp(otpRequest);
	}
	
	/*
	 * @GetMapping("/access") public String accessToken(String username) { return
	 * jwtService.generateAccessToken("pinku"); }
	 * 
	 * @GetMapping("/refresh/{username}") public String refreshToken(String
	 * username) { return jwtService.generateRefreshToken("prajwal"); }
	 */
	
	@PostMapping("/login")
	public ResponseEntity<ResponseStructure<AuthResponse>> login(@RequestBody AuthRequest authRequest) {
		return authService.login(authRequest);
	}
}
