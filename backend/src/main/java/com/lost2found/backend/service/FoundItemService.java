package com.lost2found.backend.service;

import com.lost2found.backend.dto.FoundItemRequest;
import com.lost2found.backend.dto.UpdateFoundItemRequest;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.FoundItemRepository;
import com.lost2found.backend.repository.LostItemRepository;
import com.lost2found.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class FoundItemService {

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private FoundItemRepository foundItemRepository;

    @Autowired
    private UserRepository userRepository;

    // =====================================================
    // Create Found Item
    // =====================================================
    public String createFoundItem(FoundItemRequest request, String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User Not Found";
        }

        FoundItem item = new FoundItem();

        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setLocation(request.getLocation());
        item.setLatitude(request.getLatitude());
        item.setLongitude(request.getLongitude());
        item.setImage(request.getImage());

        if (request.getStatus() == null || request.getStatus().isBlank()) {
            item.setStatus("AVAILABLE");
        } else {
            item.setStatus(request.getStatus());
        }

        item.setExpired(false);

        item.setArchiveAt(
                LocalDateTime.now().plusDays(10)
        );

        item.setUser(user);

        foundItemRepository.save(item);

        return "Found Item Posted Successfully";
    }

    // =====================================================
    // Get All Active Found Items
    // =====================================================
    public List<FoundItem> getAllFoundItems() {

        return foundItemRepository
                .findByExpiredFalseOrderByCreatedAtDesc();

    }

    // =====================================================
    // Get Found Item By ID
    // =====================================================
    public FoundItem getFoundItemById(Integer id) {

        return foundItemRepository.findById(id).orElse(null);

    }

    // =====================================================
    // Update Found Item
    // =====================================================
    public String updateFoundItem(
            Integer id,
            UpdateFoundItemRequest request,
            String email) {

        FoundItem item = foundItemRepository
                .findById(id)
                .orElse(null);

        if (item == null) {
            return "Found Item Not Found";
        }

        if (!item.getUser().getEmail().equals(email)) {
            return "You can update only your own post";
        }

        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setLocation(request.getLocation());
        item.setLatitude(request.getLatitude());
        item.setLongitude(request.getLongitude());
        item.setImage(request.getImage());
        item.setStatus(request.getStatus());

        foundItemRepository.save(item);

        return "Found Item Updated Successfully";
    }

    // =====================================================
    // Delete Found Item
    // =====================================================
    public String deleteFoundItem(Integer id, String email) {

        FoundItem item = foundItemRepository
                .findById(id)
                .orElse(null);

        if (item == null) {
            return "Found Item Not Found";
        }

        if (!item.getUser().getEmail().equals(email)) {
            return "You can delete only your own post";
        }

        foundItemRepository.delete(item);

        return "Found Item Deleted Successfully";
    }

    // =====================================================
    // Search
    // =====================================================
    public List<FoundItem> searchByTitle(String title) {

        return foundItemRepository
                .findByTitleContainingIgnoreCaseAndExpiredFalse(title);

    }

    public List<FoundItem> searchByCategory(String category) {

        return foundItemRepository
                .findByCategoryIgnoreCaseAndExpiredFalse(category);

    }

    public List<FoundItem> searchByStatus(String status) {

        return foundItemRepository
                .findByStatusIgnoreCaseAndExpiredFalse(status);

    }

    public List<FoundItem> searchByLocation(String location) {

        return foundItemRepository
                .findByLocationContainingIgnoreCaseAndExpiredFalse(location);

    }

    // =====================================================
    // Smart Matching Engine
    // =====================================================
    public List<FoundItem> findPossibleMatches(Integer lostItemId) {

        LostItem lostItem = lostItemRepository
                .findById(lostItemId)
                .orElse(null);

        if (lostItem == null || lostItem.isExpired()) {
            return new ArrayList<>();
        }

        List<FoundItem> candidates =
                foundItemRepository
                        .findByCategoryIgnoreCaseAndExpiredFalse(
                                lostItem.getCategory());

        List<FoundItem> matches = new ArrayList<>();

        for (FoundItem item : candidates) {

            if ("RETURNED".equalsIgnoreCase(item.getStatus())) {
                continue;
            }

            int score = 30;

            // Title similarity
            if (item.getTitle() != null && lostItem.getTitle() != null) {

                String foundTitle = item.getTitle().toLowerCase();
                String lostTitle = lostItem.getTitle().toLowerCase();

                if (foundTitle.contains(lostTitle)
                        || lostTitle.contains(foundTitle)) {

                    score += 40;

                }

            }

            // Location similarity
            if (item.getLocation() != null && lostItem.getLocation() != null) {

                String foundLocation = item.getLocation().toLowerCase();
                String lostLocation = lostItem.getLocation().toLowerCase();

                if (foundLocation.contains(lostLocation)
                        || lostLocation.contains(foundLocation)) {

                    score += 20;

                }

            }

            // Image bonus
            if (item.getImage() != null && !item.getImage().isBlank()) {

                score += 10;

            }

            if (score >= 60) {

                matches.add(item);

            }

        }

        return matches;

    }

}