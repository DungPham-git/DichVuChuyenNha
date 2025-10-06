package com.swp391.dichvuchuyennha.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VehicleContractHistoryResponse {
    private Integer contractId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String contractStatus;
}


