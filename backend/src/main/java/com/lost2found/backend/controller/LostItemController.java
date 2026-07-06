
package com.lost2found.backend.controller;

import java.util.List;
import com.lost2found.backend.dto.UpdateLostItemRequest;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.dto.LostItemRequest;
import com.lost2found.backend.service.JwtService;
import com.lost2found.backend.service.LostItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173")
public class LostItemController {
    
    @Autowired
    private LostItemService lostItemService;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public String createLostItem(
            @RequestBody LostItemRequest request,
            @RequestHeader("Authorization") String authHeader) {
        // Remove "Bearer "
        String token = authHeader.substring(7);

        // Extract email from JWT
        String email = jwtService.extractEmail(token);

        return lostItemService.createLostItem(request, email);
    }
    @GetMapping
    public List<LostItem> getAllLostItems() {

        return lostItemService.getAllLostItems();

    }
    @GetMapping("/{id}")
    public LostItem getLostItemById(@PathVariable Integer id) {

        return lostItemService.getLostItemById(id);

    }
    @PutMapping("/{id}")
    public String updateLostItem(
        @PathVariable Integer id,
        @RequestBody UpdateLostItemRequest request,
        @RequestHeader("Authorization") String authHeader) {

    // Remove "Bearer "
    String token = authHeader.substring(7);

    // Extract email from JWT
    String email = jwtService.extractEmail(token);

    return lostItemService.updateLostItem(id, request, email);
    }

    @DeleteMapping("/{id}")
    public String deleteLostItem(
        @PathVariable Integer id,
        @RequestHeader("Authorization") String authHeader) {

    // Remove "Bearer "
    String token = authHeader.substring(7);

    // Extract email from JWT
    String email = jwtService.extractEmail(token);

    return lostItemService.deleteLostItem(id, email);
    }
    @GetMapping("/search")
        public List<LostItem> searchByTitle(
        @RequestParam String title) {

    return lostItemService.searchByTitle(title);

    }
    
    @GetMapping("/category/{category}")
    public List<LostItem> searchByCategory(
        @PathVariable String category) {

    return lostItemService.searchByCategory(category);

    }

    @GetMapping("/location/{location}")
    public List<LostItem> searchByLocation(
        @PathVariable String location) {

    return lostItemService.searchByLocation(location);

    }

    @GetMapping("/status/{status}")
    public List<LostItem> searchByStatus(
        @PathVariable String status) {

    return lostItemService.searchByStatus(status);

    }

}