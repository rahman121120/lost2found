package com.lost2found.backend.service;

import com.lost2found.backend.dto.DashboardResponse;
import com.lost2found.backend.dto.MatchNotification;
import com.lost2found.backend.entity.Claim;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.ClaimRepository;
import com.lost2found.backend.repository.FoundItemRepository;
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
    private FoundItemRepository foundItemRepository;

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

        // My Active Lost Items
        int myItems =
                lostItemRepository
                        .findByUserIdAndExpiredFalse(user.getId())
                        .size();

        // My Claims
        int myClaims =
                (int) claimRepository.countByClaimant(user);

        // Verified Claims
        int verifiedClaims =
                (int) claimRepository.countByClaimantAndStatus(
                        user,
                        "VERIFIED"
                );

        // Pending Claims
        int pendingClaims =
                (int) claimRepository.countByClaimantAndStatus(
                        user,
                        "PENDING"
                );

        // Returned Claims
        long returnedItems =
                claimRepository.countByClaimantAndStatus(
                        user,
                        "RETURNED"
                );

        // Active Found Items
        long activeFoundItems =
                foundItemRepository.countByExpiredFalse();

        // Recovery Percentage
        long recoveryRate = 0;

        if (myItems > 0) {

            recoveryRate =
                    (returnedItems * 100) / myItems;

        }

        return new DashboardResponse(

                myItems,
                myClaims,
                verifiedClaims,
                pendingClaims,
                returnedItems,
                activeFoundItems,
                recoveryRate

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
                lostItemRepository
                        .findByUserIdAndExpiredFalse(user.getId());

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

    // =====================================================
    // Pending Ownership Requests
    // =====================================================
    public List<Claim> getPendingOwnershipRequests(String email) {

        User finder = userRepository.findByEmail(email);

        if (finder == null) {
            throw new RuntimeException("User Not Found");
        }

        List<Claim> pendingRequests = new ArrayList<>();

        List<FoundItem> myFoundItems =
                foundItemRepository.findByUserIdAndExpiredFalse(
                        finder.getId());

        for (FoundItem item : myFoundItems) {

            List<Claim> claims =
                    claimRepository.findByFoundItemAndStatus(
                            item,
                            "PENDING"
                    );

            pendingRequests.addAll(claims);

        }

        return pendingRequests;

    }

    // =====================================================
    // Recent Found Items
    // =====================================================
    public List<FoundItem> getRecentFoundItems() {

        List<FoundItem> items =
                foundItemRepository
                        .findByExpiredFalseOrderByCreatedAtDesc();

        if (items.size() > 5) {

            return items.subList(0, 5);

        }

        return items;

    }

}