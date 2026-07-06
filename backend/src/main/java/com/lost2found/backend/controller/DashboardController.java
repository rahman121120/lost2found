package com.lost2found.backend.controller;

import com.lost2found.backend.dto.DashboardResponse;
import com.lost2found.backend.service.DashboardService;
import com.lost2found.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public DashboardResponse getDashboard(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        String email = jwtService.extractEmail(token);

        return dashboardService.getDashboard(email);
    }
}