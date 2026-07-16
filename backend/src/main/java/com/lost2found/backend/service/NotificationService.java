package com.lost2found.backend.service;

import com.lost2found.backend.dto.NotificationRequest;
import com.lost2found.backend.entity.Notification;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.NotificationRepository;
import com.lost2found.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    // =====================================================
    // Create Notification
    // =====================================================
    public void createNotification(
            User user,
            String title,
            String message,
            String type,
            Integer referenceId) {

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setReferenceId(referenceId);
        notification.setRead(false);

        notificationRepository.save(notification);

    }

    // =====================================================
    // Alternative Method using DTO
    // =====================================================
    public String createNotification(
            NotificationRequest request,
            String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User Not Found";
        }

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setTitle(request.getTitle());
        notification.setMessage(request.getMessage());
        notification.setType(request.getType());
        notification.setReferenceId(request.getReferenceId());
        notification.setRead(false);

        notificationRepository.save(notification);

        return "Notification Created";

    }

    // =====================================================
    // Get Logged In User Notifications
    // =====================================================
    public List<Notification> getMyNotifications(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        return notificationRepository.findByUserOrderByCreatedAtDesc(user);

    }

    // =====================================================
    // Unread Count
    // =====================================================
    public long getUnreadCount(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        return notificationRepository.countByUserAndIsReadFalse(user);

    }

    // =====================================================
    // Mark Notification as Read
    // =====================================================
    public String markAsRead(Integer id, String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User Not Found";
        }

        Notification notification = notificationRepository
                .findById(id)
                .orElse(null);

        if (notification == null) {
            return "Notification Not Found";
        }

        if (!notification.getUser().getId().equals(user.getId())) {
            return "Unauthorized";
        }

        notification.setRead(true);

        notificationRepository.save(notification);

        return "Notification Marked as Read";

    }

}