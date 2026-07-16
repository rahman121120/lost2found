package com.lost2found.backend.repository;

import com.lost2found.backend.entity.Claim;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Integer> {

    // =====================================================
    // Claims submitted by a user
    // =====================================================
    List<Claim> findByClaimant(User claimant);

    // =====================================================
    // Claims for a particular Found Item
    // =====================================================
    List<Claim> findByFoundItem(FoundItem foundItem);

    // =====================================================
    // Claims by Found Item and Status
    // =====================================================
    List<Claim> findByFoundItemAndStatus(
            FoundItem foundItem,
            String status
    );

    // =====================================================
    // Dashboard Statistics
    // =====================================================
    long countByClaimant(User claimant);

    long countByClaimantAndStatus(
            User claimant,
            String status
    );

    // Total Returned Claims
    long countByStatus(String status);

    // =====================================================
    // Prevent Duplicate Claims
    // =====================================================
    boolean existsByClaimantAndFoundItem(
            User claimant,
            FoundItem foundItem
    );

    // =====================================================
    // Finder Dashboard
    // =====================================================

    // Get all claims having a particular status
    List<Claim> findByStatus(String status);

    // Get claims for multiple found items
    List<Claim> findByFoundItemIn(List<FoundItem> foundItems);

    // Get claims for multiple found items with status
    List<Claim> findByFoundItemInAndStatus(
            List<FoundItem> foundItems,
            String status
    );

}