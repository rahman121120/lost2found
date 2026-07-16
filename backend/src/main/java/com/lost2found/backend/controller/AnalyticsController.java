package com.lost2found.backend.controller;

import com.lost2found.backend.dto.AnalyticsResponse;
import com.lost2found.backend.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    // ==========================================
    // Get Analytics Dashboard Data
    // ==========================================
    @GetMapping
    public AnalyticsResponse getAnalytics() {

        return analyticsService.getAnalytics();

    }

}