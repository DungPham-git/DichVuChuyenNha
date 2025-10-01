package com.swp391.dichvuchuyennha.controller;

import com.swp391.dichvuchuyennha.dto.request.VehicleRequest;
import com.swp391.dichvuchuyennha.dto.request.ApiResponse;
import com.swp391.dichvuchuyennha.dto.response.VehicleResponse;
import com.swp391.dichvuchuyennha.dto.response.VehicleHistoryItem;
import com.swp391.dichvuchuyennha.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
public class VehicleController {

    private final VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<VehicleResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.<List<VehicleResponse>>builder()
                .result(vehicleService.getAll())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VehicleResponse>> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.<VehicleResponse>builder()
                .result(vehicleService.getById(id))
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<VehicleResponse>> create(@RequestBody VehicleRequest request) {
        return ResponseEntity.ok(ApiResponse.<VehicleResponse>builder()
                .result(vehicleService.create(request))
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<VehicleResponse>> update(@PathVariable Integer id, @RequestBody VehicleRequest request) {
        return ResponseEntity.ok(ApiResponse.<VehicleResponse>builder()
                .result(vehicleService.update(id, request))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Integer id) {
        vehicleService.delete(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<ApiResponse<List<VehicleHistoryItem>>> history(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.<List<VehicleHistoryItem>>builder()
                .result(vehicleService.getHistory(id))
                .build());
    }
}


