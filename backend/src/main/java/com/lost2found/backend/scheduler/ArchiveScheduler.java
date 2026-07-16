package com.lost2found.backend.scheduler;

import com.lost2found.backend.entity.FoundItem;
import com.lost2found.backend.entity.LostItem;
import com.lost2found.backend.repository.FoundItemRepository;
import com.lost2found.backend.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class ArchiveScheduler {

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private FoundItemRepository foundItemRepository;

    @Scheduled(cron = "0 0 * * * *")
    public void archiveExpiredItems() {

        LocalDateTime now = LocalDateTime.now();

        // ------------------------
        // Lost Items
        // ------------------------

        List<LostItem> lostItems =
                lostItemRepository.findAll();

        for (LostItem item : lostItems) {

            if (!item.isExpired()
                    &&
                    item.getArchiveAt() != null
                    &&
                    item.getArchiveAt().isBefore(now)) {

                item.setExpired(true);

                lostItemRepository.save(item);

                System.out.println(
                        "Archived Lost Item : "
                                + item.getTitle());

            }

        }

        // ------------------------
        // Found Items
        // ------------------------

        List<FoundItem> foundItems =
                foundItemRepository.findAll();

        for (FoundItem item : foundItems) {

            if (!item.isExpired()
                    &&
                    item.getArchiveAt() != null
                    &&
                    item.getArchiveAt().isBefore(now)) {

                item.setExpired(true);

                foundItemRepository.save(item);

                System.out.println(
                        "Archived Found Item : "
                                + item.getTitle());

            }

        }

    }

}