package com.swp391.dichvuchuyennha.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class AssignmentHistoryItem {
    private Integer contractId;
    private LocalDate assignedTime;
    private String contractStatus;
}


