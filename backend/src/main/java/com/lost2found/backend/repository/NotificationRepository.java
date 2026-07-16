package com.lost2found.backend.repository;

import com.lost2found.backend.entity.Notification;
import com.lost2found.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    // Get all notifications of a user (Newest first)
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    // Count unread notifications
    long countByUserAndIsReadFalse(User user);

    // Get unread notifications only
    List<Notification> findByUserAndIsReadFalseOrderByCreatedAtDesc(User user);

}