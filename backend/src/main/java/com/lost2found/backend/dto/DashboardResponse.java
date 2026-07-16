package com.lost2found.backend.dto;

public class DashboardResponse {

    private int myItems;
    private int myClaims;
    private int approvedClaims;
    private int pendingClaims;

    private long returnedItems;
    private long activeFoundItems;
    private long recoveryRate;

    public DashboardResponse() {
    }

    public DashboardResponse(
            int myItems,
            int myClaims,
            int approvedClaims,
            int pendingClaims,
            long returnedItems,
            long activeFoundItems,
            long recoveryRate) {

        this.myItems = myItems;
        this.myClaims = myClaims;
        this.approvedClaims = approvedClaims;
        this.pendingClaims = pendingClaims;
        this.returnedItems = returnedItems;
        this.activeFoundItems = activeFoundItems;
        this.recoveryRate = recoveryRate;
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

    public long getReturnedItems() {
        return returnedItems;
    }

    public void setReturnedItems(long returnedItems) {
        this.returnedItems = returnedItems;
    }

    public long getActiveFoundItems() {
        return activeFoundItems;
    }

    public void setActiveFoundItems(long activeFoundItems) {
        this.activeFoundItems = activeFoundItems;
    }

    public long getRecoveryRate() {
        return recoveryRate;
    }

    public void setRecoveryRate(long recoveryRate) {
        this.recoveryRate = recoveryRate;
    }

}