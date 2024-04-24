package com.retail.ecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.retail.ecom.model.RefreshToken;

public interface RefreshTokenRepo  extends JpaRepository<RefreshToken, Integer>{

	boolean existsByTokenAndIsBlocked(String refreshToken, boolean isBlocked);

}
