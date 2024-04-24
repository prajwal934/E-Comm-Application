package com.retail.ecom.response.dto;

import com.retail.ecom.enums.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {

	private int userId;
	private String username;
	private UserRole userRole;
	private boolean isAuthenticated;
	private long  accessExpiration;
	private long refreshExpiration;
}
