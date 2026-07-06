package com.lost2found.backend.controller;

import com.lost2found.backend.dto.UpdateProfileRequest;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.service.JwtService;
import com.lost2found.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
      @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;


    

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
    
     @GetMapping("/profile")
    public User getProfile(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return userService.getProfile(email);
    }

    @PutMapping("/profile")
    public String updateProfile(
            @RequestBody UpdateProfileRequest request,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return userService.updateProfile(request, email);
    }
}