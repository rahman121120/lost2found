package com.lost2found.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "lost_items")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LostItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String category;

    private String location;

    private Double latitude;

    private Double longitude;

    private String image;

    private String reward;

    /*
     * LOST
     * RECOVERED
     * ARCHIVED
     */
    private String status;

    // Used by scheduler to hide archived posts
    private boolean expired = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // Automatically determines when this post should disappear
    private LocalDateTime archiveAt;

}