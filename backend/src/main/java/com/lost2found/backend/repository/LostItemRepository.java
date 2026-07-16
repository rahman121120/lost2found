package com.lost2found.backend.repository;

import com.lost2found.backend.entity.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LostItemRepository extends JpaRepository<LostItem, Integer> {

    // =====================================================
    // Basic Queries
    // =====================================================

    List<LostItem> findAllByOrderByCreatedAtDesc();

    List<LostItem> findByExpiredFalseOrderByCreatedAtDesc();

    Optional<LostItem> findById(Integer id);

    // =====================================================
    // User
    // =====================================================

    List<LostItem> findByUserId(Integer userId);

    List<LostItem> findByUserIdAndExpiredFalse(Integer userId);

    // =====================================================
    // Search
    // =====================================================

    List<LostItem> findByTitleContainingIgnoreCase(String title);

    List<LostItem> findByTitleContainingIgnoreCaseAndExpiredFalse(String title);

    List<LostItem> findByCategoryIgnoreCase(String category);

    List<LostItem> findByCategoryIgnoreCaseAndExpiredFalse(String category);

    List<LostItem> findByStatusIgnoreCase(String status);

    List<LostItem> findByStatusIgnoreCaseAndExpiredFalse(String status);

    List<LostItem> findByLocationContainingIgnoreCase(String location);

    List<LostItem> findByLocationContainingIgnoreCaseAndExpiredFalse(String location);

    // =====================================================
    // Archive
    // =====================================================

    List<LostItem> findByExpiredFalse();

    // =====================================================
    // Analytics
    // =====================================================

    long countByExpiredFalse();

    long countByStatusIgnoreCase(String status);

}