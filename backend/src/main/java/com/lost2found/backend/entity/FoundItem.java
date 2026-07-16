package com.lost2found.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "found_items")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FoundItem {

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

    /*
     * AVAILABLE
     * VERIFIED
     * RETURNED
     * ARCHIVED
     */
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // Automatically set when the item should be archived
    private LocalDateTime archiveAt;

    // Whether the item is archived/expired
    private boolean expired = false;

}