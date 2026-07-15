package com.lost2found.backend.dto;

public class ClaimRequest {

    private Integer foundItemId;
    private String message;

    public ClaimRequest() {
    }

    public Integer getFoundItemId() {
        return foundItemId;
    }

    public void setFoundItemId(Integer foundItemId) {
        this.foundItemId = foundItemId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}