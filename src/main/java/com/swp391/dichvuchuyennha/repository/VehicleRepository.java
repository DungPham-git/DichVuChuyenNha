package com.swp391.dichvuchuyennha.repository;

import com.swp391.dichvuchuyennha.entity.Vehicles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicles, Integer> {
}


