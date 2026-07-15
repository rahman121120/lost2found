package com.lost2found.backend.controller;

import com.lost2found.backend.dto.ClaimRequest;
import com.lost2found.backend.entity.Claim;
import com.lost2found.backend.service.ClaimService;
import com.lost2found.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @Autowired
    private JwtService jwtService;

    // ============================================
    // Submit Ownership Claim
    // ============================================
    @PostMapping
    public String createClaim(
            @RequestBody ClaimRequest request,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return claimService.createClaim(request, email);
    }

    // ============================================
    // Finder views all claims for one Found Item
    // ============================================
    @GetMapping("/found-item/{foundItemId}")
    public List<Claim> getClaimsByFoundItem(
            @PathVariable Integer foundItemId) {

        return claimService.getClaimsByFoundItem(foundItemId);
    }

    // ============================================
    // Finder approves ownership
    // ============================================
    @PutMapping("/{claimId}/approve")
    public String approveClaim(
            @PathVariable Integer claimId,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return claimService.approveClaim(claimId, email);
    }

    // ============================================
    // Finder rejects ownership
    // ============================================
    @PutMapping("/{claimId}/reject")
    public String rejectClaim(
            @PathVariable Integer claimId,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return claimService.rejectClaim(claimId, email);
    }

    // ============================================
    // Finder confirms item returned
    // ============================================
    @PutMapping("/{claimId}/confirm")
    public String confirmClaim(
            @PathVariable Integer claimId,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return claimService.confirmClaim(claimId, email);
    }

    // ============================================
    // Logged-in user's claims
    // ============================================
    @GetMapping
    public List<Claim> getMyClaims(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        return claimService.getMyClaims(email);
    }

}