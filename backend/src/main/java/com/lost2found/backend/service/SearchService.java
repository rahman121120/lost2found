package com.lost2found.backend.service;

import com.lost2found.backend.dto.SearchResult;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.repository.FoundItemRepository;
import com.lost2found.backend.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SearchService {

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private FoundItemRepository foundItemRepository;

    // =====================================================
    // Global Search (Active Items Only)
    // =====================================================
    public List<SearchResult> globalSearch(String keyword) {

        List<SearchResult> results = new ArrayList<>();

        // ==============================
        // Search Lost Items
        // ==============================

        List<LostItem> lostItems =
                lostItemRepository
                        .findByTitleContainingIgnoreCaseAndExpiredFalse(keyword);

        for (LostItem item : lostItems) {

            SearchResult result = new SearchResult();

            result.setId(item.getId());
            result.setTitle(item.getTitle());
            result.setType("LOST");
            result.setImage(item.getImage());
            result.setLocation(item.getLocation());
            result.setStatus(item.getStatus());

            results.add(result);

        }

        // ==============================
        // Search Found Items
        // ==============================

        List<FoundItem> foundItems =
                foundItemRepository
                        .findByTitleContainingIgnoreCaseAndExpiredFalse(keyword);

        for (FoundItem item : foundItems) {

            SearchResult result = new SearchResult();

            result.setId(item.getId());
            result.setTitle(item.getTitle());
            result.setType("FOUND");
            result.setImage(item.getImage());
            result.setLocation(item.getLocation());
            result.setStatus(item.getStatus());

            results.add(result);

        }

        return results;

    }

}