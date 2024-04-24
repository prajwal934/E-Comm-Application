package com.retail.ecom.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.retail.ecom.model.AccessToken;

public interface AccessTokenRepo extends JpaRepository<AccessToken, Integer> {

	boolean existsByTokenAndIsBlocked(String accessToken, boolean isBlocked);

}
