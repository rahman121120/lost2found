package com.lost2found.backend.controller;


import com.lost2found.backend.dto.UpdateFoundItemRequest;
import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.dto.FoundItemRequest;
import com.lost2found.backend.service.FoundItemService;
import com.lost2found.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/found-items")
@CrossOrigin(origins = "http://localhost:5173")
public class FoundItemController {

    @Autowired
    private FoundItemService foundItemService;

    @Autowired
    private JwtService jwtService;

    @PostMapping
    public String createFoundItem(
            @RequestBody FoundItemRequest request,
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);

        String email = jwtService.extractEmail(token);

        return foundItemService.createFoundItem(request, email);
    }
    @GetMapping
    public java.util.List<com.lost2found.backend.entity.FoundItem> getAllFoundItems() {

    return foundItemService.getAllFoundItems();

    }
    @GetMapping("/{id}")
    public com.lost2found.backend.entity.FoundItem getFoundItemById(
        @PathVariable Integer id) {

        return foundItemService.getFoundItemById(id);

        }
        @PutMapping("/{id}")
        public String updateFoundItem(
        @PathVariable Integer id,
        @RequestBody UpdateFoundItemRequest request,
        @RequestHeader("Authorization") String authHeader) {

    String token = authHeader.substring(7);
    String email = jwtService.extractEmail(token);

    return foundItemService.updateFoundItem(id, request, email);
    }
    @DeleteMapping("/{id}")
    public String deleteFoundItem(
        @PathVariable Integer id,
        @RequestHeader("Authorization") String authHeader) {

    String token = authHeader.substring(7);
    String email = jwtService.extractEmail(token);

    return foundItemService.deleteFoundItem(id, email);
    }

    @GetMapping("/search")
    public List<FoundItem> searchByTitle(@RequestParam String title){
    return foundItemService.searchByTitle(title);
    }

    @GetMapping("/category/{category}")
    public List<FoundItem> searchByCategory(@PathVariable String category){
        return foundItemService.searchByCategory(category);
    }

    @GetMapping("/status/{status}")
    public List<FoundItem> searchByStatus(@PathVariable String status){
    return foundItemService.searchByStatus(status);
    }

    @GetMapping("/location/{location}")
    public List<FoundItem> searchByLocation(@PathVariable String location){
        return foundItemService.searchByLocation(location);
    }

    @GetMapping("/matches/{lostItemId}")
    public List<FoundItem> getPossibleMatches(
        @PathVariable Integer lostItemId) {

     return foundItemService.findPossibleMatches(lostItemId);
    }
}