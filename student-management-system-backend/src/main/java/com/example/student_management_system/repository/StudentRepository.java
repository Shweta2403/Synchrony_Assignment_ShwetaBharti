package com.example.student_management_system.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.student_management_system.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    
	List<Student> findByNameContaining(String name);
}

