package com.lost2found.backend.dto;

public class DashboardResponse {

    private int myItems;
    private int myClaims;
    private int approvedClaims;
    private int pendingClaims;

    public DashboardResponse() {
    }

    public DashboardResponse(int myItems, int myClaims, int approvedClaims, int pendingClaims) {
        this.myItems = myItems;
        this.myClaims = myClaims;
        this.approvedClaims = approvedClaims;
        this.pendingClaims = pendingClaims;
    }

    public int getMyItems() {
        return myItems;
    }

    public void setMyItems(int myItems) {
        this.myItems = myItems;
    }

    public int getMyClaims() {
        return myClaims;
    }

    public void setMyClaims(int myClaims) {
        this.myClaims = myClaims;
    }

    public int getApprovedClaims() {
        return approvedClaims;
    }

    public void setApprovedClaims(int approvedClaims) {
        this.approvedClaims = approvedClaims;
    }

    public int getPendingClaims() {
        return pendingClaims;
    }

    public void setPendingClaims(int pendingClaims) {
        this.pendingClaims = pendingClaims;
    }
}