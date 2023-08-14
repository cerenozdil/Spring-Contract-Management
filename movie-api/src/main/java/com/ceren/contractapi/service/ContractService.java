package com.ceren.contractapi.service;

import java.util.List;

import com.ceren.contractapi.model.Contract;

public interface ContractService {

    List<Contract> getContracts();

    List<Contract> getContractsContainingText(String text);

    Contract validateAndGetContract(String price);

    Contract saveContract(Contract contract);

    void deleteContract(Contract contract);
}
