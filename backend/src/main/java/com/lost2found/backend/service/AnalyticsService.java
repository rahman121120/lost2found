package com.lost2found.backend.service;

import com.lost2found.backend.dto.AnalyticsResponse;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.repository.FoundItemRepository;
import com.lost2found.backend.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AnalyticsService {

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private FoundItemRepository foundItemRepository;

    public AnalyticsResponse getAnalytics() {

        AnalyticsResponse response = new AnalyticsResponse();

        // ==========================================
        // Overall Statistics
        // ==========================================

        long totalLostItems = lostItemRepository.countByExpiredFalse();

        long totalFoundItems = foundItemRepository.countByExpiredFalse();

        long returnedItems =
                foundItemRepository.countByStatusIgnoreCase("RETURNED");

        double recoveryRate = 0;

        if (totalLostItems > 0) {

            recoveryRate =
                    (returnedItems * 100.0) / totalLostItems;

        }

        response.setTotalLostItems(totalLostItems);
        response.setTotalFoundItems(totalFoundItems);
        response.setReturnedItems(returnedItems);
        response.setRecoveryRate(recoveryRate);

        // ==========================================
        // Lost Item Category Analytics
        // ==========================================

        List<LostItem> lostItems =
                lostItemRepository.findByExpiredFalse();

        Map<String, Long> lostCategories =
                new HashMap<>();

        for (LostItem item : lostItems) {

            String category = item.getCategory();

            if (category == null || category.isBlank()) {

                category = "Others";

            }

            lostCategories.put(

                    category,

                    lostCategories.getOrDefault(category, 0L) + 1

            );

        }

        response.setLostByCategory(lostCategories);

        // ==========================================
        // Found Item Category Analytics
        // ==========================================

        List<FoundItem> foundItems =
                foundItemRepository.findByExpiredFalse();

        Map<String, Long> foundCategories =
                new HashMap<>();

        for (FoundItem item : foundItems) {

            String category = item.getCategory();

            if (category == null || category.isBlank()) {

                category = "Others";

            }

            foundCategories.put(

                    category,

                    foundCategories.getOrDefault(category, 0L) + 1

            );

        }

        response.setFoundByCategory(foundCategories);

        return response;

    }

}