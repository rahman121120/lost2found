package com.lost2found.backend.repository;

import com.lost2found.backend.entity.Claim;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Integer> {

    // Claims submitted by a user
    List<Claim> findByClaimant(User claimant);

    // Claims for a particular Found Item
    List<Claim> findByFoundItem(FoundItem foundItem);

    // Claims by status
    List<Claim> findByFoundItemAndStatus(
            FoundItem foundItem,
            String status
    );

    // Dashboard counts
    long countByClaimant(User claimant);

    long countByClaimantAndStatus(
            User claimant,
            String status
    );

    // Prevent duplicate claims
    boolean existsByClaimantAndFoundItem(
            User claimant,
            FoundItem foundItem
    );

}