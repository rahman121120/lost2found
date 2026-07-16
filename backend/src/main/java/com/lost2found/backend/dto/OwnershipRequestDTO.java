package com.lost2found.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OwnershipRequestDTO {

    private Integer claimId;

    private Integer foundItemId;

    private String foundItemTitle;

    private String claimantName;

    private String claimantEmail;

    private String message;

    private String status;

}