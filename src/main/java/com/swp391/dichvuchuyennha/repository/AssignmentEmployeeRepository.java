package com.swp391.dichvuchuyennha.repository;

import com.swp391.dichvuchuyennha.entity.AssignmentEmployee;
import com.swp391.dichvuchuyennha.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentEmployeeRepository extends JpaRepository<AssignmentEmployee, Integer> {
    List<AssignmentEmployee> findByEmployee(Employee employee);
}


