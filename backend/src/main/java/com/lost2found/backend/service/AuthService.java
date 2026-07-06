package com.lost2found.backend.service;

import com.lost2found.backend.dto.RegisterRequest;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.lost2found.backend.dto.LoginRequest;
import com.lost2found.backend.dto.LoginResponse;
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String register(RegisterRequest request) {

    // Check if email already exists
    if (userRepository.findByEmail(request.getEmail()) != null) {
        return "Email already registered";
    }

    // Create new User
    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setPhone(request.getPhone());
    user.setDepartment(request.getDepartment());
    user.setYear(request.getYear());

    // Save user
    userRepository.save(user);

    return "User Registered Successfully";
    }

    public LoginResponse login(LoginRequest request) {

    // Find user by email
    User user = userRepository.findByEmail(request.getEmail());

    // Check if user exists
    if (user == null) {
        return new LoginResponse(null, "Invalid Email or Password");
    }

    // Check password
    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        return new LoginResponse(null, "Invalid Email or Password");
    }

    // JWT will come here in next step
   String token = jwtService.generateToken(user.getEmail());

    return new LoginResponse(
        token,
        "Login Successful"
    );
}
}