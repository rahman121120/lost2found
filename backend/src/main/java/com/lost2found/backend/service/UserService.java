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
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }
    public User getProfile(String email) {
        return userRepository.findByEmail(email);
    }

    public String updateProfile(UpdateProfileRequest request, String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User Not Found";
        }

        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setDepartment(request.getDepartment());
        user.setYear(request.getYear());
        user.setProfileImage(request.getProfileImage());

        userRepository.save(user);

        return "Profile Updated Successfully";
    }
}