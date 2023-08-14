package com.ceren.contractapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ceren.contractapi.model.Contract;

import java.util.List;

@Repository
public interface ContractRepository extends JpaRepository<Contract, String> {

    List<Contract> findAllByOrderByName();

    List<Contract> findByPriceContainingOrNameContainingIgnoreCaseOrderByName(String price, String name);
}
