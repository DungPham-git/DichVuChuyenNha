package com.swp391.dichvuchuyennha.controller;

import com.swp391.dichvuchuyennha.dto.request.EmployeeRequest;
import com.swp391.dichvuchuyennha.dto.request.ApiResponse;
import com.swp391.dichvuchuyennha.dto.response.AssignmentHistoryItem;
import com.swp391.dichvuchuyennha.dto.response.EmployeeResponse;
import com.swp391.dichvuchuyennha.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<EmployeeResponse>>> getAll() {
        return ResponseEntity.ok(ApiResponse.<List<EmployeeResponse>>builder()
                .result(employeeService.getAll())
                .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponse>> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.<EmployeeResponse>builder()
                .result(employeeService.getById(id))
                .build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<EmployeeResponse>> create(@RequestBody EmployeeRequest request) {
        return ResponseEntity.ok(ApiResponse.<EmployeeResponse>builder()
                .result(employeeService.create(request))
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponse>> update(@PathVariable Integer id, @RequestBody EmployeeRequest request) {
        return ResponseEntity.ok(ApiResponse.<EmployeeResponse>builder()
                .result(employeeService.update(id, request))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Integer id) {
        employeeService.delete(id);
        return ResponseEntity.ok(ApiResponse.<Void>builder().build());
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<ApiResponse<List<AssignmentHistoryItem>>> history(@PathVariable Integer id) {
        return ResponseEntity.ok(ApiResponse.<List<AssignmentHistoryItem>>builder()
                .result(employeeService.getAssignmentHistory(id))
                .build());
    }
}


