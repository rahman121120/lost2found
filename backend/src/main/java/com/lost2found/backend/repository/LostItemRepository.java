package com.lost2found.backend.repository;

import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface LostItemRepository extends JpaRepository<LostItem, Integer> {

    List<LostItem> findAllByOrderByCreatedAtDesc();

    Optional<LostItem> findById(Integer id);
    
    java.util.List<LostItem> findByUserId(Integer userId);

    List<LostItem> findByTitleContainingIgnoreCase(String title);

    List<LostItem> findByCategoryIgnoreCase(String category);

    List<LostItem> findByStatusIgnoreCase(String status);

    List<LostItem> findByLocationContainingIgnoreCase(String location);

    List<LostItem> findByExpiredFalseOrderByCreatedAtDesc();

    List<FoundItem> findByExpiredFalse();

}