package com.swp391.dichvuchuyennha.service;

import com.swp391.dichvuchuyennha.dto.request.EmployeeRequest;
import com.swp391.dichvuchuyennha.dto.response.AssignmentHistoryItem;
import com.swp391.dichvuchuyennha.dto.response.EmployeeResponse;
import com.swp391.dichvuchuyennha.entity.AssignmentEmployee;
import com.swp391.dichvuchuyennha.entity.Employee;
import com.swp391.dichvuchuyennha.entity.Users;
import com.swp391.dichvuchuyennha.exception.AppException;
import com.swp391.dichvuchuyennha.exception.ErrorCode;
import com.swp391.dichvuchuyennha.repository.AssignmentEmployeeRepository;
import com.swp391.dichvuchuyennha.repository.EmployeeRepository;
import com.swp391.dichvuchuyennha.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AssignmentEmployeeRepository assignmentEmployeeRepository;
    private final UserRepository userRepository;

    private EmployeeResponse toResponse(Employee employee) {
        return EmployeeResponse.builder()
                .employeeId(employee.getEmployeeId())
                .userId(employee.getUser() != null ? employee.getUser().getUserId() : null)
                .username(employee.getUser() != null ? employee.getUser().getUsername() : null)
                .position(employee.getPosition())
                .phone(employee.getPhone())
                .status(employee.getStatus())
                .build();
    }

    public List<EmployeeResponse> getAll() {
        return employeeRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public EmployeeResponse getById(Integer id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        return toResponse(employee);
    }

    @Transactional
    public EmployeeResponse create(EmployeeRequest request) {
        Users user = null;
        if (request.getUserId() != null) {
            user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        }

        Employee employee = new Employee();
        employee.setUser(user);
        employee.setPosition(request.getPosition());
        employee.setPhone(request.getPhone());
        employee.setStatus(request.getStatus());

        Employee saved = employeeRepository.save(employee);
        return toResponse(saved);
    }

    @Transactional
    public EmployeeResponse update(Integer id, EmployeeRequest request) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));

        if (request.getUserId() != null) {
            Users user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
            employee.setUser(user);
        }
        if (request.getPosition() != null) employee.setPosition(request.getPosition());
        if (request.getPhone() != null) employee.setPhone(request.getPhone());
        if (request.getStatus() != null) employee.setStatus(request.getStatus());

        Employee saved = employeeRepository.save(employee);
        return toResponse(saved);
    }

    @Transactional
    public void delete(Integer id) {
        if (!employeeRepository.existsById(id)) {
            throw new AppException(ErrorCode.NOT_FOUND);
        }
        employeeRepository.deleteById(id);
    }

    public List<AssignmentHistoryItem> getAssignmentHistory(Integer employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new AppException(ErrorCode.NOT_FOUND));
        List<AssignmentEmployee> assignments = assignmentEmployeeRepository.findByEmployee(employee);
        return assignments.stream().map(a -> AssignmentHistoryItem.builder()
                        .contractId(a.getContract() != null ? a.getContract().getContractId() : null)
                        .assignedTime(a.getAssignedTime())
                        .contractStatus(a.getContract() != null ? a.getContract().getStatus() : null)
                        .build())
                .collect(Collectors.toList());
    }
}


