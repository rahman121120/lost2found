package com.lost2found.backend.controller;

import com.lost2found.backend.dto.DashboardResponse;
import com.lost2found.backend.dto.MatchNotification;
import com.lost2found.backend.entity.Claim;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.service.DashboardService;
import com.lost2found.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private JwtService jwtService;

    // =====================================================
    // Dashboard Statistics
    // =====================================================
    @GetMapping
    public DashboardResponse getDashboard(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return dashboardService.getDashboard(email);
    }

    // =====================================================
    // Smart Match Notifications
    // =====================================================
    @GetMapping("/matches")
    public List<MatchNotification> getPossibleMatches(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return dashboardService.getPossibleMatches(email);
    }

    // =====================================================
    // Pending Ownership Requests
    // =====================================================
    @GetMapping("/ownership-requests")
    public List<Claim> getPendingOwnershipRequests(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return dashboardService.getPendingOwnershipRequests(email);
    }

    // =====================================================
    // Recent Found Items
    // =====================================================
    @GetMapping("/recent-found-items")
    public List<FoundItem> getRecentFoundItems() {

        return dashboardService.getRecentFoundItems();
    }

}