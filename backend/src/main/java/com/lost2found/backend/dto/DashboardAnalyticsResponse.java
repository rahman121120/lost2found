package com.lost2found.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardAnalyticsResponse {

    // ===============================
    // Overall Statistics
    // ===============================

    private long totalLostItems;

    private long totalFoundItems;

    private long totalReturnedItems;

    private double recoveryRate;

    // ===============================
    // Category Analytics
    // Example:
    // Bag -> 12
    // Wallet -> 5
    // ===============================

    private Map<String, Long> categoryDistribution;

    // ===============================
    // Weekly Lost Posts
    // Example:
    // Mon -> 3
    // Tue -> 1
    // ===============================

    private Map<String, Long> weeklyLostPosts;

    // ===============================
    // Weekly Found Posts
    // ===============================

    private Map<String, Long> weeklyFoundPosts;

}