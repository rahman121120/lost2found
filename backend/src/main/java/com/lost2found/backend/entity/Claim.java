package com.lost2found.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "claims")

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Person claiming ownership
    @ManyToOne
    @JoinColumn(name = "claimant_id")
    private User claimant;

    // Found item being claimed
    @ManyToOne
    @JoinColumn(name = "found_item_id")
    private FoundItem foundItem;

    @Column(columnDefinition = "TEXT")
    private String message;

    /*
     * PENDING
     * VERIFIED
     * REJECTED
     * RETURNED
     */
    private String status;

    @CreationTimestamp
    private LocalDateTime createdAt;
}