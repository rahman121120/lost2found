package com.lost2found.backend.controller;

import com.lost2found.backend.entity.Notification;
import com.lost2found.backend.service.JwtService;
import com.lost2found.backend.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private JwtService jwtService;

    // =====================================================
    // Get all notifications of logged-in user
    // =====================================================
    @GetMapping
    public List<Notification> getMyNotifications(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return notificationService.getMyNotifications(email);
    }

    // =====================================================
    // Get unread notification count
    // =====================================================
    @GetMapping("/unread-count")
    public long getUnreadCount(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return notificationService.getUnreadCount(email);
    }

    // =====================================================
    // Mark notification as read
    // =====================================================
    @PutMapping("/{id}/read")
    public String markAsRead(
            @PathVariable Integer id,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return notificationService.markAsRead(id, email);
    }

}