package com.lost2found.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequest {

    private String title;

    private String message;

    // MATCH_FOUND, CLAIM_RECEIVED, CLAIM_APPROVED,
    // CLAIM_REJECTED, ITEM_RETURNED
    private String type;

    // Lost Item ID / Found Item ID / Claim ID
    private Integer referenceId;

}