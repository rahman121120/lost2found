package com.lost2found.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchResult {

    private Integer id;

    private String title;

    // LOST or FOUND
    private String type;

    private String image;

    private String location;

    private String status;

}