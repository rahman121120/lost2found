package com.lost2found.backend.service;

import com.lost2found.backend.dto.UpdateProfileRequest;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ==========================================
    // Get All Users
    // ==========================================
    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    // ==========================================
    // Save User
    // ==========================================
    public User saveUser(User user) {

        return userRepository.save(user);

    }

    // ==========================================
    // Get Logged-in User Profile
    // ==========================================
    public User getProfile(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        return user;

    }

    // ==========================================
    // Update Profile
    // ==========================================
    public User updateProfile(UpdateProfileRequest request, String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setDepartment(request.getDepartment());
        user.setYear(request.getYear());

        // Update profile image only if a new one is provided
        if (request.getProfileImage() != null &&
                !request.getProfileImage().isBlank()) {

            user.setProfileImage(request.getProfileImage());

        }

        return userRepository.save(user);

    }

}