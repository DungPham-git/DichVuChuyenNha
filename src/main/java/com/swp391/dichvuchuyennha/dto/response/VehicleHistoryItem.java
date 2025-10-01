package com.swp391.dichvuchuyennha.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VehicleHistoryItem {
    private Integer contractId;
    private String contractStatus;
}


