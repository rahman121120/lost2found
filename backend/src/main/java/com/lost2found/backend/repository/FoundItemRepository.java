package com.lost2found.backend.repository;

import com.lost2found.backend.entity.FoundItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FoundItemRepository extends JpaRepository<FoundItem, Integer> {

    List<FoundItem> findAllByOrderByCreatedAtDesc();

    Optional<FoundItem> findById(Integer id);

    List<FoundItem> findByUserId(Integer userId);

    List<FoundItem> findByTitleContainingIgnoreCase(String title);

    List<FoundItem> findByCategoryIgnoreCase(String category);

    List<FoundItem> findByStatusIgnoreCase(String status);

    List<FoundItem> findByLocationContainingIgnoreCase(String location);

   List<FoundItem> findByExpiredFalse();

}