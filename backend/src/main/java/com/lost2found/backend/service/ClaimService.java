package com.lost2found.backend.service;

import com.lost2found.backend.dto.ClaimRequest;
import com.lost2found.backend.entity.Claim;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.ClaimRepository;
import com.lost2found.backend.repository.FoundItemRepository;
import com.lost2found.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private FoundItemRepository foundItemRepository;

    @Autowired
    private UserRepository userRepository;

    // ==========================================================
    // Submit Ownership Claim
    // ==========================================================
    public String createClaim(ClaimRequest request, String email) {

        User claimant = userRepository.findByEmail(email);

        if (claimant == null) {
            return "User Not Found";
        }

        FoundItem foundItem = foundItemRepository
                .findById(request.getFoundItemId())
                .orElse(null);

        if (foundItem == null) {
            return "Found Item Not Found";
        }

        // Finder cannot claim their own item
        if (foundItem.getUser().getId().equals(claimant.getId())) {
            return "You cannot claim your own found item.";
        }

        // Prevent duplicate claims
        if (claimRepository.existsByClaimantAndFoundItem(claimant, foundItem)) {
            return "You have already submitted a claim.";
        }

        Claim claim = new Claim();

        claim.setClaimant(claimant);
        claim.setFoundItem(foundItem);
        claim.setMessage(request.getMessage());
        claim.setStatus("PENDING");

        claimRepository.save(claim);

        return "Ownership Claim Submitted Successfully";
    }

    // ==========================================================
    // Finder views all claims for one Found Item
    // ==========================================================
    public List<Claim> getClaimsByFoundItem(Integer foundItemId) {

        FoundItem foundItem = foundItemRepository
                .findById(foundItemId)
                .orElseThrow(() ->
                        new RuntimeException("Found Item Not Found"));

        return claimRepository.findByFoundItem(foundItem);
    }

    // ==========================================================
    // Finder approves ownership
    // ==========================================================
    public String approveClaim(Integer claimId, String email) {

        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() ->
                        new RuntimeException("Claim Not Found"));

        if (!claim.getFoundItem().getUser().getEmail().equals(email)) {
            return "Only the finder can approve claims.";
        }

        claim.setStatus("VERIFIED");

        claimRepository.save(claim);

        return "Ownership Verified. Contact the claimant.";
    }

    // ==========================================================
    // Finder rejects ownership
    // ==========================================================
    public String rejectClaim(Integer claimId, String email) {

        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() ->
                        new RuntimeException("Claim Not Found"));

        if (!claim.getFoundItem().getUser().getEmail().equals(email)) {
            return "Only the finder can reject claims.";
        }

        claim.setStatus("REJECTED");

        claimRepository.save(claim);

        return "Claim Rejected Successfully";
    }

    // ==========================================================
    // Finder confirms item returned
    // ==========================================================
    public String confirmClaim(Integer claimId, String email) {

        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() ->
                        new RuntimeException("Claim Not Found"));

        if (!claim.getFoundItem().getUser().getEmail().equals(email)) {
            return "Only the finder can confirm return.";
        }

        if (!claim.getStatus().equals("VERIFIED")) {
            return "Claim has not been verified.";
        }

        // Mark claim as returned
        claim.setStatus("RETURNED");

        // Update found item
        FoundItem foundItem = claim.getFoundItem();

        foundItem.setStatus("RETURNED");

        // Archive after 1 day
        foundItem.setArchiveAt(
                LocalDateTime.now().plusDays(1)
        );

        foundItemRepository.save(foundItem);

        // Reject remaining pending claims
        List<Claim> pendingClaims =
                claimRepository.findByFoundItemAndStatus(
                        foundItem,
                        "PENDING"
                );

        for (Claim otherClaim : pendingClaims) {

            if (!otherClaim.getId().equals(claim.getId())) {

                otherClaim.setStatus("REJECTED");

            }

        }

        claimRepository.save(claim);
        claimRepository.saveAll(pendingClaims);

        return "Item Returned Successfully";
    }

    // ==========================================================
    // Logged-in user's claims
    // ==========================================================
    public List<Claim> getMyClaims(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        return claimRepository.findByClaimant(user);
    }

}