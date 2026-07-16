package com.lost2found.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {

    private long totalLostItems;

    private long totalFoundItems;

    private long returnedItems;

    private double recoveryRate;

    private Map<String, Long> lostByCategory;

    private Map<String, Long> foundByCategory;

}