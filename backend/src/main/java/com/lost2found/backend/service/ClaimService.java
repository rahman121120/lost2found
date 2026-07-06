package com.lost2found.backend.service;

import com.lost2found.backend.dto.ClaimRequest;
import com.lost2found.backend.entity.Claim;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.ClaimRepository;
import com.lost2found.backend.repository.LostItemRepository;
import com.lost2found.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClaimService {

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private UserRepository userRepository;

    public String createClaim(ClaimRequest request, String email) {

        // Find logged-in user
        User claimant = userRepository.findByEmail(email);

        if (claimant == null) {
            return "User Not Found";
        }

        // Find lost item
        LostItem lostItem = lostItemRepository
                .findById(request.getLostItemId())
                .orElse(null);
                
        if (claimRepository.existsByClaimantAndLostItem(claimant, lostItem)) {
        return "You have already submitted a claim for this item.";
        }

        if (lostItem == null) {
            return "Lost Item Not Found";
        }
        // Prevent claiming your own item
        if (lostItem.getUser().getId().equals(claimant.getId())) {
        return "You cannot claim your own item";
        }

        // Create claim
        Claim claim = new Claim();

        claim.setClaimant(claimant);
        claim.setLostItem(lostItem);
        claim.setMessage(request.getMessage());
        claim.setStatus("PENDING");

        claimRepository.save(claim);

        return "Claim Submitted Successfully";
    }

    public java.util.List<Claim> getClaimsByLostItem(Integer lostItemId) {

    LostItem lostItem = lostItemRepository
            .findById(lostItemId)
            .orElse(null);

    if (lostItem == null) {
        throw new RuntimeException("Lost Item Not Found");
    }

    return claimRepository.findByLostItem(lostItem);
    }

    public String approveClaim(Integer claimId, String email) {

    Claim claim = claimRepository.findById(claimId)
            .orElseThrow(() -> new RuntimeException("Claim Not Found"));

    // Only owner can approve
    if (!claim.getLostItem().getUser().getEmail().equals(email)) {
        return "Only the item owner can approve claims";
    }

    claim.setStatus("APPROVED");

    // Update lost item status
    claim.getLostItem().setStatus("CLAIMED");

    claimRepository.save(claim);

    return "Claim Approved Successfully";
    }

    public String rejectClaim(Integer claimId, String email) {

    Claim claim = claimRepository.findById(claimId)
            .orElseThrow(() -> new RuntimeException("Claim Not Found"));

    // Only owner can reject
    if (!claim.getLostItem().getUser().getEmail().equals(email)) {
        return "Only the item owner can reject claims";
    }

    claim.setStatus("REJECTED");

    claimRepository.save(claim);

    return "Claim Rejected Successfully";
    }
}