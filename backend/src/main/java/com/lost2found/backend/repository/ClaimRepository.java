package com.lost2found.backend.repository;

import com.lost2found.backend.entity.Claim;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClaimRepository extends JpaRepository<Claim, Integer> {

    List<Claim> findByClaimant(User claimant);

    List<Claim> findByLostItem(LostItem lostItem);
    
    long countByClaimant(User claimant);

    long countByClaimantAndStatus(User claimant, String status);

    boolean existsByClaimantAndLostItem(User claimant, LostItem lostItem);
}