package com.swp391.dichvuchuyennha.service;

import com.swp391.dichvuchuyennha.dto.request.VehicleRequest;
import com.swp391.dichvuchuyennha.dto.response.VehicleResponse;
import com.swp391.dichvuchuyennha.dto.response.VehicleHistoryItem;
import com.swp391.dichvuchuyennha.entity.Employee;
import com.swp391.dichvuchuyennha.entity.Vehicles;
import com.swp391.dichvuchuyennha.exception.AppException;
import com.swp391.dichvuchuyennha.exception.ErrorCode;
import com.swp391.dichvuchuyennha.repository.EmployeeRepository;
import com.swp391.dichvuchuyennha.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VehicleService {

    private final VehicleRepository vehicleRepository;
    private final EmployeeRepository employeeRepository;

    private VehicleResponse toResponse(Vehicles v) {
        return VehicleResponse.builder()
                .vehicleId(v.getVehicleId())
                .vehicleType(v.getVehicleType())
                .licensePlate(v.getLicensePlate())
                .capacity(v.getCapacity())
                .status(v.getStatus())
                .driverId(v.getDriver() != null ? v.getDriver().getEmployeeId() : null)
                .driverName(v.getDriver() != null && v.getDriver().getUser() != null ? v.getDriver().getUser().getUsername() : null)
                .build();
    }

    public List<VehicleResponse> getAll() {
        return vehicleRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public VehicleResponse getById(Integer id) {
        Vehicles v = vehicleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        return toResponse(v);
    }

    @Transactional
    public VehicleResponse create(VehicleRequest request) {
        Vehicles v = new Vehicles();
        v.setVehicleType(request.getVehicleType());
        v.setLicensePlate(request.getLicensePlate());
        v.setCapacity(request.getCapacity());
        v.setStatus(request.getStatus());
        if (request.getDriverId() != null) {
            Employee driver = employeeRepository.findById(request.getDriverId()).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
            v.setDriver(driver);
        }
        Vehicles saved = vehicleRepository.save(v);
        return toResponse(saved);
    }

    @Transactional
    public VehicleResponse update(Integer id, VehicleRequest request) {
        Vehicles v = vehicleRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        if (request.getVehicleType() != null) v.setVehicleType(request.getVehicleType());
        if (request.getLicensePlate() != null) v.setLicensePlate(request.getLicensePlate());
        if (request.getCapacity() != null) v.setCapacity(request.getCapacity());
        if (request.getStatus() != null) v.setStatus(request.getStatus());
        if (request.getDriverId() != null) {
            Employee driver = employeeRepository.findById(request.getDriverId()).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
            v.setDriver(driver);
        }
        Vehicles saved = vehicleRepository.save(v);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Integer id) {
        if (!vehicleRepository.existsById(id)) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        vehicleRepository.deleteById(id);
    }

    public List<VehicleHistoryItem> getHistory(Integer vehicleId) {
        Vehicles v = vehicleRepository.findById(vehicleId).orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        if (v.getQuotation() == null || v.getQuotation().getContracts() == null) {
            return List.of();
        }
        return v.getQuotation().getContracts().stream()
                .map(c -> VehicleHistoryItem.builder()
                        .contractId(c.getContractId())
                        .contractStatus(c.getStatus())
                        .build())
                .collect(Collectors.toList());
    }
}


