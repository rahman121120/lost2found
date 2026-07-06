package com.lost2found.backend.repository;

import com.lost2found.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository
        extends JpaRepository<User, Integer> {

        User findByEmail(String email);
}