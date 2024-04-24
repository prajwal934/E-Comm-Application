package com.retail.ecom.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.retail.ecom.enums.UserRole;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

	@Value("${myapp.jwt.secret}")
	private String secret;
	
	@Value("${myapp.jwt.access.expiration}")
	private long accessExpiry;
	
	@Value("${myapp.jwt.refresh.expiration}")
	private long refreshExpiry;
	
	public String generateAccessToken(String  username , UserRole userRole) {
		return generateToken(username, accessExpiry , userRole);
		
	}
	
	public String generateRefreshToken(String username , UserRole role) {
		return generateToken(username, refreshExpiry , role);
	}
	
	
	private String generateToken(String username , long expiration , UserRole role) {
	return 	Jwts.builder()
		.setClaims(new HashMap<>())
		.setSubject(username)
		.setIssuedAt(new Date(System.currentTimeMillis()))
		.setExpiration(new Date(System.currentTimeMillis() + expiration))
		.signWith(getSignatureKey() , SignatureAlgorithm.HS256)
		.compact();
	}
	
	private Key getSignatureKey() { //key is an interface 
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
	}
	
	public String getUsername(String token) {
		return parseJWT(token).getSubject();
	}
	
	private Claims parseJWT(String token) {
	 return Jwts.parserBuilder().setSigningKey(getSignatureKey()).build()
		.parseClaimsJws(token).getBody();
	}
	
	public String getUserRole(String accessToken) {
		return parseJWT(getUserRole(accessToken)).get("role" , String.class);
	}
	
}
