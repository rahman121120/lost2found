package com.lost2found.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MatchNotification {

    private Integer lostItemId;

    private String lostItemTitle;

    private Integer foundItemId;

    private String foundItemTitle;

    private String location;

    private String image;

}