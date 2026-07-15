package com.lost2found.backend.service;

import com.lost2found.backend.dto.DashboardResponse;
import com.lost2found.backend.dto.MatchNotification;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.ClaimRepository;
import com.lost2found.backend.repository.LostItemRepository;
import com.lost2found.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private ClaimRepository claimRepository;

    @Autowired
    private FoundItemService foundItemService;

    // =====================================================
    // Dashboard Statistics
    // =====================================================
    public DashboardResponse getDashboard(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        int myItems =
                lostItemRepository.findByUserId(user.getId()).size();

        int myClaims =
                (int) claimRepository.countByClaimant(user);

        int verifiedClaims =
                (int) claimRepository.countByClaimantAndStatus(
                        user,
                        "VERIFIED"
                );

        int pendingClaims =
                (int) claimRepository.countByClaimantAndStatus(
                        user,
                        "PENDING"
                );

        return new DashboardResponse(
                myItems,
                myClaims,
                verifiedClaims,
                pendingClaims
        );
    }

    // =====================================================
    // Smart Match Notifications
    // =====================================================
    public List<MatchNotification> getPossibleMatches(String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User Not Found");
        }

        List<LostItem> myLostItems =
                lostItemRepository.findByUserId(user.getId());

        List<MatchNotification> notifications =
                new ArrayList<>();

        for (LostItem lostItem : myLostItems) {

            List<FoundItem> matches =
                    foundItemService.findPossibleMatches(
                            lostItem.getId());

            for (FoundItem foundItem : matches) {

                MatchNotification notification =
                        new MatchNotification();

                notification.setLostItemId(
                        lostItem.getId());

                notification.setLostItemTitle(
                        lostItem.getTitle());

                notification.setFoundItemId(
                        foundItem.getId());

                notification.setFoundItemTitle(
                        foundItem.getTitle());

                notification.setLocation(
                        foundItem.getLocation());

                notification.setImage(
                        foundItem.getImage());

                notifications.add(notification);

            }

        }

        return notifications;

    }

}