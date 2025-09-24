package com.swp391.dichvuchuyennha.dto.request;

import lombok.Data;

@Data
public class EmployeeRequest {
    private Integer userId; // link to existing Users
    private String position;
    private String phone;
    private String status;
}


