package com.lost2found.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // User who receives the notification
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Notification title
    private String title;

    // Detailed notification message
    @Column(columnDefinition = "TEXT")
    private String message;

    /*
     * MATCH_FOUND
     * CLAIM_RECEIVED
     * CLAIM_APPROVED
     * CLAIM_REJECTED
     * ITEM_RETURNED
     */
    private String type;

    // Related Lost Item / Found Item / Claim ID
    private Integer referenceId;

    // Read status
    @Column(name = "is_read")
    private boolean isRead = false;

    // Notification creation time
    @CreationTimestamp
    private LocalDateTime createdAt;

}