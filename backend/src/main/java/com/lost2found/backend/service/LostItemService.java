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

        lostItemRepository.save(item);

        return "Lost Item Posted Successfully";
    }
    public List<LostItem> getAllLostItems() {

    updateExpiredItems();

    return lostItemRepository.findByExpiredFalseOrderByCreatedAtDesc();

    }

    public LostItem getLostItemById(Integer id) {

    return lostItemRepository
            .findById(id)
            .orElse(null);

    }
    public String updateLostItem(Integer id,
                             UpdateLostItemRequest request,
                             String email) {

    LostItem item = lostItemRepository.findById(id).orElse(null);

    if (item == null) {
        return "Item Not Found";
    }

    // Only owner can update
    if (!item.getUser().getEmail().equals(email)) {
        return "You are not allowed to update this item";
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

    public String deleteLostItem(Integer id, String email) {

    LostItem item = lostItemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Lost Item Not Found"));

    if (!item.getUser().getEmail().equals(email)) {
        throw new RuntimeException("You can delete only your own items");
    }

    lostItemRepository.delete(item);

    return "Lost Item Deleted Successfully";
    }
    
    // Search by Title
    public List<LostItem> searchByTitle(String title) {

    return lostItemRepository.findByTitleContainingIgnoreCase(title);

    }

// Search by Category
    public List<LostItem> searchByCategory(String category) {

    return lostItemRepository.findByCategoryIgnoreCase(category);

    }

// Search by Status
    public List<LostItem> searchByStatus(String status) {

    return lostItemRepository.findByStatusIgnoreCase(status);

    }

// Search by Location
    public List<LostItem> searchByLocation(String location) {

    return lostItemRepository.findByLocationContainingIgnoreCase(location);

    }
    public void updateExpiredItems() {

    List<LostItem> items = lostItemRepository.findAll();

    LocalDateTime now = LocalDateTime.now();

    for (LostItem item : items) {

        if (!item.isExpired()
                && item.getCreatedAt().plusDays(4).isBefore(now)) {

            item.setExpired(true);

            lostItemRepository.save(item);
        }
    }
    }
    
}