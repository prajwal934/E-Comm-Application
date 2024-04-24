package com.retail.ecom.jwt;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.retail.ecom.repository.AccessTokenRepo;
import com.retail.ecom.repository.RefreshTokenRepo;

import ch.qos.logback.core.subst.Token;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtFilter extends OncePerRequestFilter{
	
	private AccessTokenRepo accessTokenRepo;
	private RefreshTokenRepo refreshTokenRepo;
	private JwtService jwtService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String accessToken = null;
		String refreshToken = null;
		Cookie[] cookies = request.getCookies();
		
		if(cookies != null)
			for(Cookie cookie: cookies) {
				if(cookie.getName().equals("at"))
					accessToken = cookie.getValue();
				if(cookie.getName().equals("rt"))
					refreshToken = cookie.getValue();
					
			}
			
			if(accessToken != null && refreshToken != null) {
				if(accessTokenRepo.existsByTokenAndIsBlocked(accessToken,true)  
						&& refreshTokenRepo.existsByTokenAndIsBlocked(refreshToken,true)) {
					throw new RuntimeException("Token Is Blocked!!!");
				}
				String username = jwtService.getUsername(accessToken);
				String userRole = jwtService.getUserRole(accessToken);
				if(username != null && SecurityContextHolder.getContext().getAuthentication()== null) {
					new UsernamePasswordAuthenticationToken(username,null , 
							Collections.singleton(new SimpleGrantedAuthority(userRole)))
					.setDetails(new WebAuthenticationDetails(request));
					SecurityContextHolder.getContext().setAuthentication(null);
				}
				
				
			}
			
			filterChain.doFilter(request, response);
	}

}
