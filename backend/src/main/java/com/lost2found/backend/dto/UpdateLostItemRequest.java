package com.lost2found.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateLostItemRequest {

    private String title;
    private String description;
    private String category;
    private String location;
    private Double latitude;
    private Double longitude;
    private String image;
    private String reward;
}