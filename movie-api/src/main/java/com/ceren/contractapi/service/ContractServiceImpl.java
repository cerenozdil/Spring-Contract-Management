package com.ceren.contractapi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.ceren.contractapi.exception.ContractNotFoundException;
import com.ceren.contractapi.model.Contract;
import com.ceren.contractapi.repository.ContractRepository;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ContractServiceImpl implements ContractService {

    private final ContractRepository contractRepository;

    @Override
    public List<Contract> getContracts() {
        return contractRepository.findAllByOrderByName();
    }

    @Override
    public List<Contract> getContractsContainingText(String text) {
        return contractRepository.findByPriceContainingOrNameContainingIgnoreCaseOrderByName(text, text);
    }

    @Override
    public Contract validateAndGetContract(String price) {
        return contractRepository.findById(price)
                .orElseThrow(
                        () -> new ContractNotFoundException(String.format("Contract with price is not found", price)));
    }

    @Override
    public Contract saveContract(Contract contract) {
        return contractRepository.save(contract);
    }

    @Override
    public void deleteContract(Contract contract) {
        contractRepository.delete(contract);
    }
}
