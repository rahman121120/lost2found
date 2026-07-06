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

    private String status;

    private boolean expired = false;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public boolean isExpired() {
    return expired;
    }

    public void setExpired(boolean expired) {
    this.expired = expired;
    }

}