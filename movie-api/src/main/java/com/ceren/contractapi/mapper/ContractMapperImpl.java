package com.ceren.contractapi.mapper;

import org.springframework.stereotype.Service;

import com.ceren.contractapi.model.Contract;
import com.ceren.contractapi.rest.dto.ContractDto;
import com.ceren.contractapi.rest.dto.CreateContractRequest;

import java.time.format.DateTimeFormatter;

@Service
public class ContractMapperImpl implements ContractMapper {
    

    @Override
    public Contract toContract(CreateContractRequest createContractRequest) {
        if (createContractRequest == null) {
            return null;
        }
        return new Contract(createContractRequest.getPrice(), createContractRequest.getName(),
                createContractRequest.getFile());
    }

    @Override
    public ContractDto toContractDto(Contract contract) {
        if (contract == null) {
            return null;
        }
        return new ContractDto(contract.getPrice(), contract.getName(), contract.getFile(),
                DateTimeFormatter.ISO_OFFSET_DATE_TIME.format(contract.getCreatedAt()));
    }
}
