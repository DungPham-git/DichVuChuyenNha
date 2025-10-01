package com.swp391.dichvuchuyennha.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VehicleResponse {
    private Integer vehicleId;
    private String vehicleType;
    private String licensePlate;
    private Double capacity;
    private String status;
    private Integer driverId;
    private String driverName;
}


