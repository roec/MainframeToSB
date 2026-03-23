export const appJava = `package com.example.migrationdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MigrationDemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MigrationDemoApplication.class, args);
    }
}
`;

export const customerController = `package com.example.migrationdemo.controller;

import com.example.migrationdemo.application.CustomerApplicationService;
import com.example.migrationdemo.dto.CustomerResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerApplicationService service;

    public CustomerController(CustomerApplicationService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public CustomerResponse getById(@PathVariable Long id) {
        return service.getById(id);
    }
}
`;

export const customerService = `package com.example.migrationdemo.application;

import com.example.migrationdemo.dto.CustomerResponse;
import org.springframework.stereotype.Service;

@Service
public class CustomerApplicationService {

    public CustomerResponse getById(Long id) {
        return new CustomerResponse(id, "Demo Customer", "ACTIVE");
    }
}
`;

export const customerDomain = `package com.example.migrationdemo.domain.model;

public record Customer(Long id, String name, String status) {
}
`;

export const customerEntity = `package com.example.migrationdemo.infrastructure.persistence.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customers")
public class CustomerEntity {

    @Id
    private Long id;

    private String name;

    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
`;

export const customerRepo = `package com.example.migrationdemo.infrastructure.persistence.repository;

import com.example.migrationdemo.infrastructure.persistence.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {
}
`;

export const customerRequest = `package com.example.migrationdemo.dto;

public record CustomerRequest(Long id) {
}
`;

export const customerResponse = `package com.example.migrationdemo.dto;

public record CustomerResponse(Long id, String name, String status) {
}
`;

export const exceptionHandler = `package com.example.migrationdemo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handle(Exception ex) {
        return Map.of("error", ex.getMessage());
    }
}
`;

export const customerTest = `package com.example.migrationdemo;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

class CustomerControllerTest {

    @Test
    void smoke() {
        assertTrue(true);
    }
}
`;
