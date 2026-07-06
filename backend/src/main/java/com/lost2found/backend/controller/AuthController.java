package com.lost2found.backend.controller;

import com.lost2found.backend.dto.LoginRequest;
import com.lost2found.backend.dto.LoginResponse;
import com.lost2found.backend.dto.RegisterRequest;
import com.lost2found.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}