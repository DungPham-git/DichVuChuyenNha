package com.swp391.dichvuchuyennha.dto.request;

import lombok.Data;

@Data
public class VehicleRequest {
    private String vehicleType;
    private String licensePlate;
    private Double capacity;
    private String status;
    private Integer driverId; // optional - assign to employee
}


