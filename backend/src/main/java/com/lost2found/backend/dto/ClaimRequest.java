package com.lost2found.backend.dto;

public class ClaimRequest {

    private Integer lostItemId;
    private String message;

    public ClaimRequest() {
    }

    public Integer getLostItemId() {
        return lostItemId;
    }

    public void setLostItemId(Integer lostItemId) {
        this.lostItemId = lostItemId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}