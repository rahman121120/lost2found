package com.lost2found.backend.controller;

import com.lost2found.backend.dto.SearchResult;
import com.lost2found.backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/search")
@CrossOrigin(origins = "http://localhost:5173")
public class SearchController {

    @Autowired
    private SearchService searchService;

    // ============================================
    // Global Search
    // Example:
    // GET /api/search?keyword=watch
    // ============================================
    @GetMapping
    public List<SearchResult> globalSearch(
            @RequestParam String keyword) {

        return searchService.globalSearch(keyword);

    }

} 