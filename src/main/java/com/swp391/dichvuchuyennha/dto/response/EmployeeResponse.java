package com.swp391.dichvuchuyennha.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EmployeeResponse {
    private Integer employeeId;
    private Integer userId;
    private String username;
    private String position;
    private String phone;
    private String status;
}


