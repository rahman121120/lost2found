package com.lost2found.backend.service;

import com.lost2found.backend.dto.DashboardResponse;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.ClaimRepository;
import com.lost2found.backend.repository.LostItemRepository;
import com.lost2found.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private ClaimRepository claimRepository;

    public DashboardResponse getDashboard(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        int myItems =
                lostItemRepository.findByUserId(user.getId()).size();

        int myClaims =
                (int) claimRepository.countByClaimant(user);

        int approvedClaims =
                (int) claimRepository.countByClaimantAndStatus(
                        user,
                        "APPROVED"
                );

        int pendingClaims =
                (int) claimRepository.countByClaimantAndStatus(
                        user,
                        "PENDING"
                );

        return new DashboardResponse(
                myItems,
                myClaims,
                approvedClaims,
                pendingClaims
        );
    }
}