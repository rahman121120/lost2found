package com.lost2found.backend.controller;

import com.lost2found.backend.dto.ClaimRequest;
import com.lost2found.backend.service.ClaimService;
import com.lost2found.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "http://localhost:5173")
public class ClaimController {

    @Autowired
    private ClaimService claimService;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public String createClaim(
            @RequestBody ClaimRequest request,
            @RequestHeader("Authorization") String authHeader) {

        // Remove "Bearer "
        String token = authHeader.substring(7);

        // Extract email from JWT
        String email = jwtService.extractEmail(token);

        return claimService.createClaim(request, email);
    }

    @GetMapping("/item/{id}")
    public java.util.List<com.lost2found.backend.entity.Claim> getClaimsByLostItem(
        @PathVariable Integer id) {

    return claimService.getClaimsByLostItem(id);

    }
    @PutMapping("/{claimId}/approve")
    public String approveClaim(
        @PathVariable Integer claimId,
        @RequestHeader("Authorization") String authHeader) {

    String token = authHeader.substring(7);
    String email = jwtService.extractEmail(token);

    return claimService.approveClaim(claimId, email);
    }

   @PutMapping("/{claimId}/reject")
    public String rejectClaim(
        @PathVariable Integer claimId,
        @RequestHeader("Authorization") String authHeader) {

    String token = authHeader.substring(7);
    String email = jwtService.extractEmail(token);

    return claimService.rejectClaim(claimId, email);
    }
    
    @PutMapping("/{claimId}/confirm")
    public String confirmClaim(
        @PathVariable Integer claimId,
        @RequestHeader("Authorization") String authHeader) {

    String token = authHeader.substring(7);
    String email = jwtService.extractEmail(token);

    return claimService.confirmClaim(claimId, email);
    }

    @GetMapping
    public java.util.List<com.lost2found.backend.entity.Claim> getMyClaims(
        @RequestHeader("Authorization") String authHeader) {

    String token = authHeader.substring(7);

    String email = jwtService.extractEmail(token);

    return claimService.getMyClaims(email);

    }
}