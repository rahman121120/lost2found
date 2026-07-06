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

    // Create Found Item
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
        item.setStatus(request.getStatus());

        item.setUser(user);

        foundItemRepository.save(item);

        return "Found Item Posted Successfully";
    }


    // Get All Found Items
    public List<FoundItem> getAllFoundItems() {

        return foundItemRepository.findAllByOrderByCreatedAtDesc();

    }

    // Get One Found Item
    public FoundItem getFoundItemById(Integer id) {

        return foundItemRepository.findById(id).orElse(null);

    }

    // Update Found Item
    public String updateFoundItem(Integer id,
                                  UpdateFoundItemRequest request,
                                  String email) {

        FoundItem item = foundItemRepository.findById(id).orElse(null);

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

    // Delete Found Item
    public String deleteFoundItem(Integer id, String email) {

        FoundItem item = foundItemRepository.findById(id).orElse(null);

        if (item == null) {
            return "Found Item Not Found";
        }

        if (!item.getUser().getEmail().equals(email)) {
            return "You can delete only your own post";
        }

        foundItemRepository.delete(item);

        return "Found Item Deleted Successfully";
    }
    
    public List<FoundItem> searchByTitle(String title){
    return foundItemRepository.findByTitleContainingIgnoreCase(title);
    }

    public List<FoundItem> searchByCategory(String category){
    return foundItemRepository.findByCategoryIgnoreCase(category);
    }

    public List<FoundItem> searchByStatus(String status){
    return foundItemRepository.findByStatusIgnoreCase(status);
    }

    public List<FoundItem> searchByLocation(String location){
    return foundItemRepository.findByLocationContainingIgnoreCase(location);
    }

   public List<FoundItem> findPossibleMatches(Integer lostItemId) {

    LostItem lostItem = lostItemRepository
            .findById(lostItemId)
            .orElse(null);

    if (lostItem == null) {
        return new ArrayList<>();
    }

    List<FoundItem> candidates =
            foundItemRepository.findByCategoryIgnoreCase(
                    lostItem.getCategory());

    List<FoundItem> matches = new ArrayList<>();

    for (FoundItem item : candidates) {

        boolean titleMatch =
                item.getTitle().toLowerCase()
                        .contains(lostItem.getTitle().toLowerCase())
                ||
                lostItem.getTitle().toLowerCase()
                        .contains(item.getTitle().toLowerCase());

        boolean locationMatch =
                item.getLocation().toLowerCase()
                        .contains(lostItem.getLocation().toLowerCase())
                ||
                lostItem.getLocation().toLowerCase()
                        .contains(item.getLocation().toLowerCase());

        if (titleMatch || locationMatch) {
            matches.add(item);
        }
    }

    return matches;
    }
}