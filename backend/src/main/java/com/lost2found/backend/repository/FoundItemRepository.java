package com.lost2found.backend.repository;

import com.lost2found.backend.entity.FoundItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoundItemRepository extends JpaRepository<FoundItem, Integer> {

    // =====================================================
    // Basic Queries
    // =====================================================

    List<FoundItem> findAllByOrderByCreatedAtDesc();

    List<FoundItem> findByExpiredFalseOrderByCreatedAtDesc();

    Optional<FoundItem> findById(Integer id);

    // =====================================================
    // User
    // =====================================================

    List<FoundItem> findByUserId(Integer userId);

    List<FoundItem> findByUserIdAndExpiredFalse(Integer userId);

    // =====================================================
    // Search
    // =====================================================

    List<FoundItem> findByTitleContainingIgnoreCase(String title);

    List<FoundItem> findByTitleContainingIgnoreCaseAndExpiredFalse(String title);

    List<FoundItem> findByCategoryIgnoreCase(String category);

    List<FoundItem> findByCategoryIgnoreCaseAndExpiredFalse(String category);

    List<FoundItem> findByStatusIgnoreCase(String status);

    List<FoundItem> findByStatusIgnoreCaseAndExpiredFalse(String status);

    List<FoundItem> findByLocationContainingIgnoreCase(String location);

    List<FoundItem> findByLocationContainingIgnoreCaseAndExpiredFalse(String location);

    // =====================================================
    // Lifecycle
    // =====================================================

    List<FoundItem> findByExpiredFalse();

    // =====================================================
    // Analytics
    // =====================================================

    long countByExpiredFalse();

    long countByStatusIgnoreCase(String status);

}