package com.lost2found.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import com.lost2found.backend.dto.LostItemRequest;
import com.lost2found.backend.dto.UpdateLostItemRequest;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.entity.User;
import com.lost2found.backend.repository.LostItemRepository;
import com.lost2found.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LostItemService {

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private UserRepository userRepository;

    // =========================================================
    // Create Lost Item
    // =========================================================
    public String createLostItem(LostItemRequest request, String email) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return "User Not Found";
        }

        LostItem item = new LostItem();

        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setLocation(request.getLocation());
        item.setLatitude(request.getLatitude());
        item.setLongitude(request.getLongitude());
        item.setImage(request.getImage());
        item.setReward(request.getReward());

        item.setStatus("LOST");
        item.setUser(user);

        // Active for 10 days
        item.setArchiveAt(LocalDateTime.now().plusDays(10));
        item.setExpired(false);

        lostItemRepository.save(item);

        return "Lost Item Posted Successfully";
    }

    // =========================================================
    // Get All Active Lost Items
    // =========================================================
    public List<LostItem> getAllLostItems() {

        updateExpiredItems();

        return lostItemRepository.findByExpiredFalseOrderByCreatedAtDesc();
    }

    // =========================================================
    // Get Lost Item By ID
    // =========================================================
    public LostItem getLostItemById(Integer id) {

        updateExpiredItems();

        return lostItemRepository.findById(id).orElse(null);
    }

    // =========================================================
    // Update Lost Item
    // =========================================================
    public String updateLostItem(
            Integer id,
            UpdateLostItemRequest request,
            String email) {

        updateExpiredItems();

        LostItem item = lostItemRepository.findById(id).orElse(null);

        if (item == null) {
            return "Lost Item Not Found";
        }

        if (item.isExpired()) {
            return "Archived items cannot be edited.";
        }

        if (!item.getUser().getEmail().equals(email)) {
            return "You can update only your own post.";
        }

        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setLocation(request.getLocation());
        item.setLatitude(request.getLatitude());
        item.setLongitude(request.getLongitude());
        item.setImage(request.getImage());
        item.setReward(request.getReward());

        lostItemRepository.save(item);

        return "Lost Item Updated Successfully";
    }

    // =========================================================
    // Delete Lost Item
    // =========================================================
    public String deleteLostItem(Integer id, String email) {

        updateExpiredItems();

        LostItem item = lostItemRepository.findById(id).orElse(null);

        if (item == null) {
            return "Lost Item Not Found";
        }

        if (!item.getUser().getEmail().equals(email)) {
            return "You can delete only your own post.";
        }

        lostItemRepository.delete(item);

        return "Lost Item Deleted Successfully";
    }

    // =========================================================
    // Search By Title
    // =========================================================
    public List<LostItem> searchByTitle(String title) {

        updateExpiredItems();

        return lostItemRepository
                .findByTitleContainingIgnoreCaseAndExpiredFalse(title);
    }

    // =========================================================
    // Search By Category
    // =========================================================
    public List<LostItem> searchByCategory(String category) {

        updateExpiredItems();

        return lostItemRepository
                .findByCategoryIgnoreCaseAndExpiredFalse(category);
    }

    // =========================================================
    // Search By Status
    // =========================================================
    public List<LostItem> searchByStatus(String status) {

        updateExpiredItems();

        return lostItemRepository
                .findByStatusIgnoreCaseAndExpiredFalse(status);
    }

    // =========================================================
    // Search By Location
    // =========================================================
    public List<LostItem> searchByLocation(String location) {

        updateExpiredItems();

        return lostItemRepository
                .findByLocationContainingIgnoreCaseAndExpiredFalse(location);
    }

    // =========================================================
    // My Active Lost Items
    // =========================================================
    public List<LostItem> getMyLostItems(Integer userId) {

        updateExpiredItems();

        return lostItemRepository
                .findByUserIdAndExpiredFalse(userId);
    }

    // =========================================================
    // Update Expired Items
    // =========================================================
    public void updateExpiredItems() {

        List<LostItem> items = lostItemRepository.findAll();

        LocalDateTime now = LocalDateTime.now();

        for (LostItem item : items) {

            if (!item.isExpired()
                    && item.getArchiveAt() != null
                    && item.getArchiveAt().isBefore(now)) {

                item.setExpired(true);

                lostItemRepository.save(item);
            }
        }
    }

}