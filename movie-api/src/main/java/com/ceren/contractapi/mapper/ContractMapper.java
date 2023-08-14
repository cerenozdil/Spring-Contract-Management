package com.ceren.contractapi.mapper;

import com.ceren.contractapi.model.Contract;
import com.ceren.contractapi.rest.dto.ContractDto;
import com.ceren.contractapi.rest.dto.CreateContractRequest;

public interface ContractMapper {

    Contract toContract(CreateContractRequest createContractRequest);

    ContractDto toContractDto(Contract contract);
}