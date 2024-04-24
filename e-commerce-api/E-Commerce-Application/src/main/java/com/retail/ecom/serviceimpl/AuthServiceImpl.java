package com.retail.ecom.serviceimpl;

import java.time.Duration;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.retail.ecom.cache.CacheStore;
import com.retail.ecom.enums.UserRole;
import com.retail.ecom.exceptions.OTPExpiredException;
import com.retail.ecom.exceptions.OTPInvalidException;
import com.retail.ecom.exceptions.RegistrationSessionExpireException;
import com.retail.ecom.exceptions.UserAlreadyExistByEmailException;
import com.retail.ecom.exceptions.UsernameNotFoundException;
import com.retail.ecom.jwt.JwtService;
import com.retail.ecom.mail_service.MailService;
import com.retail.ecom.mail_service.MessageModel;
import com.retail.ecom.model.AccessToken;
import com.retail.ecom.model.Customer;
import com.retail.ecom.model.RefreshToken;
import com.retail.ecom.model.Seller;
import com.retail.ecom.model.User;
import com.retail.ecom.repository.AccessTokenRepo;
import com.retail.ecom.repository.RefreshTokenRepo;
import com.retail.ecom.repository.UserRepository;
import com.retail.ecom.request.dto.AuthRequest;
import com.retail.ecom.request.dto.OtpRequest;
import com.retail.ecom.request.dto.UserRequest;
import com.retail.ecom.response.dto.AuthResponse;
import com.retail.ecom.response.dto.UserResponse;
import com.retail.ecom.service.AuthService;
import com.retail.ecom.utility.ResponseStructure;
import com.retail.ecom.utility.SimpleResponseStructure;

import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;

@Service
public class AuthServiceImpl implements AuthService {
	
	private PasswordEncoder passwordEncoder;
	private UserRepository userRepository;
	private CacheStore<String> otpCache;
	private CacheStore<User> userCache;
	private ResponseStructure<UserResponse> responseStructure;
	private ResponseStructure<AuthResponse> authStructure;
	private SimpleResponseStructure simpleResponse;
	private MailService mailService;
	private AuthenticationManager authenticationManager;
	private JwtService jwtService;
	private RefreshTokenRepo refreshTokenRepo;
	private AccessTokenRepo accessTokenRepo;

	@Value("${myapp.jwt.access.expiration}")
	private long accessExpiration;
	

	@Value("${myapp.jwt.refresh.expiration}")
	private long refreshExpiration;
	
	public AuthServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository, CacheStore<String> otpCache,
			CacheStore<User> userCache, ResponseStructure<UserResponse> responseStructure,
			ResponseStructure<AuthResponse> authStructure, SimpleResponseStructure simpleResponse, MailService mailService,
			AuthenticationManager authenticationManager, JwtService jwtService, RefreshTokenRepo refreshTokenRepo,
			AccessTokenRepo accessTokenRepo) {
		super();
		this.passwordEncoder = passwordEncoder;
		this.userRepository = userRepository;
		this.otpCache = otpCache;
		this.userCache = userCache;
		this.responseStructure = responseStructure;
		this.authStructure = authStructure;
		this.simpleResponse = simpleResponse;
		this.mailService = mailService;
		this.authenticationManager = authenticationManager;
		this.jwtService = jwtService;
		this.refreshTokenRepo = refreshTokenRepo;
		this.accessTokenRepo = accessTokenRepo;
	}
	

	@Override
	public ResponseEntity<SimpleResponseStructure> registerUser(UserRequest userRequest) {
		if(userRepository.existsByEmail(userRequest.getEmail())) 
			throw new UserAlreadyExistByEmailException("failed to register the user , user emailId already exist");
		User user = mapToChildEntity(userRequest);
		String otp = generateOTP();
		System.out.println(user.getEmail());
		otpCache.add(user.getEmail(), otp);
		userCache.add(user.getEmail(), user);
		
//		return ResponseEntity.ok(otp);
		
//		send mail with otp
		try {
			sendOTP(user , otp);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.ok(simpleResponse.setStatuscode(HttpStatus.ACCEPTED.value())
				.setMessage("Verify OTP through mail to complete registration  !" + "OTP expires in 1 minute"));
		
	}
	
	
	private void sendOTP(User user, String otp) throws MessagingException {
		MessageModel model = MessageModel.builder()
		.to(user.getEmail())
		.subject("Verify Your OTP")
		.text(
				"<p>Hi , <br>"
				+ "Thanks for your intrest in E-com,"
				+ "please verify your mail id using the OTP given below.</p>"
				+ "</br>"
				+"<h1>"+otp+"</h1>"
				+"<br>"
				+ "<p> Please ignore if it's not you</p>"
				+"<br>"
				+ "with best regards"
				+ "<h3>E-Com</h3>"
				)
		.build();
		
		mailService.sendMailMessage(model);
		
	}


	private String generateOTP() {
		return String.valueOf(new Random().nextInt(100000 , 999999));
	}
	

	private <T extends User> T mapToChildEntity(UserRequest userRequest) {
		UserRole role = userRequest.getUserRole();
		
		User user = null;
		switch (role) {
		case SELLER -> user = new Seller();
		case CUSTOMER -> user = new Customer();
		default -> throw new RuntimeException();
		}
		
		user.setDisplayName(userRequest.getName());
		user.setUsername(userRequest.getEmail().split("@gmail.com") [0]);
		user.setEmail(userRequest.getEmail());
		user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
		user.setUserRole(role);
		user.setEmailVerified(false);
		
		return (T) user;
	}


	@Override
	public ResponseEntity<ResponseStructure<UserResponse>> verifyOtp(OtpRequest otpRequest) {
//		System.out.println(otpRequest.getEmail());
//		System.out.println(otpCache.get(otpRequest.getEmail()));
		if(otpCache.get(otpRequest.getEmail()) == null) throw new OTPExpiredException("otp expired");
		
		if(!otpCache.get(otpRequest.getEmail()).equals(otpRequest.getOtp()))
			throw new OTPInvalidException("Entered OTP is invalid");
		
		User user = userCache.get(otpRequest.getEmail());
		
		if(user == null) throw new RegistrationSessionExpireException("registration session expired");
		user.setEmailVerified(true);
		
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(responseStructure.setData(mapToUserResponse(userRepository.save(user)))
						.setMessage("OTP verification successfully")
						.setStatuscode(HttpStatus.CREATED.value()));
	}


	private UserResponse mapToUserResponse(User user) {
		return UserResponse.builder()
				.userId(user.getUserId())
				.username(user.getUsername())
				.displayName(user.getDisplayName())
				.email(user.getEmail())
				.userRole(user.getUserRole())
				.isEmailVerified(user.isEmailVerified())
				.build();
	}


	@Override
	public ResponseEntity<ResponseStructure<AuthResponse>> login(AuthRequest authRequest) {
		String username = authRequest.getUsername().split("@gmail.com")[0];
		System.out.println(authRequest.getPassword()+ " "+username);
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(username , authRequest.getPassword()));
//		validating if the user authentication is authenticated
		if(!authentication.isAuthenticated())
			throw new UsernameNotFoundException("Authentication Failed");
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
//		generate the access and refresh token
		HttpHeaders headers = new HttpHeaders();
		return userRepository.findByUsername(username).map(user -> {
			generateAccessToken(user, headers);
			generateRefreshToken(user, headers);
			return ResponseEntity.ok().headers(headers).body(new ResponseStructure<AuthResponse>()
					.setData(mapToAuthResponse(user))
					.setMessage("Authentication Successfully!")
					.setStatuscode(HttpStatus.OK.value()));
		}).get();
	}


	public AuthResponse mapToAuthResponse(User user) {
		// TODO Auto-generated method stub
		return AuthResponse.builder()
				.userId(user.getUserId())
				.username(user.getUsername())
				.userRole(user.getUserRole())
				.build();
	}

	private void generateRefreshToken(User user, HttpHeaders headers) {
		String token = jwtService.generateRefreshToken(user.getUsername(), user.getUserRole());
		headers.add(HttpHeaders.SET_COOKIE, configureCookie("rt" , token , refreshExpiration));
//		store the token to the database
		RefreshToken refreshToken = new RefreshToken();
		refreshToken.setToken(token);
		refreshToken.setBlocked(false);
		refreshToken.setExpiration(accessExpiration);
		refreshToken.setUser(user);
		refreshTokenRepo.save(refreshToken);
		
	}


	private String configureCookie(String name , String value , long maxAge) {
		return ResponseCookie.from(name , value)
				.domain("localhost")
				.path("/")
				.httpOnly(true)
				.secure(false)
				.maxAge(Duration.ofMillis(maxAge))
				.sameSite("Lax")
				.build().toString();
	}


	private void generateAccessToken(User user, HttpHeaders headers ) {
		
		String token = jwtService.generateAccessToken(user.getUsername() , user.getUserRole());
		headers.add(HttpHeaders.SET_COOKIE, configureCookie("at", token, accessExpiration));
//		Store the token to the database
		
		AccessToken at = new AccessToken();
		at.setToken(token);
		at.setBlocked(false);
		at.setExpirattion(accessExpiration);
		at.setUser(user);
		accessTokenRepo.save(at);
	}
	

}
