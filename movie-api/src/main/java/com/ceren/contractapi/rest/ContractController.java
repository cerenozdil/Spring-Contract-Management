package com.ceren.contractapi.rest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.ceren.contractapi.mapper.ContractMapper;
import com.ceren.contractapi.model.Contract;
import com.ceren.contractapi.rest.dto.ContractDto;
import com.ceren.contractapi.rest.dto.CreateContractRequest;
import com.ceren.contractapi.service.ContractService;

import static com.ceren.contractapi.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/contracts")
public class ContractController {

    private final ContractService contractService;
    private final ContractMapper contractMapper;

    @Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
    @GetMapping
    public List<ContractDto> getContracts(@RequestParam(value = "text", required = false) String text) {
        List<Contract> contracts = (text == null) ? contractService.getContracts()
                : contractService.getContractsContainingText(text);
        return contracts.stream()
                .map(contractMapper::toContractDto)
                .collect(Collectors.toList());
    }

    

    @Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public ContractDto createContract(@Valid @RequestBody CreateContractRequest createContractRequest) {
        Contract contract = contractMapper.toContract(createContractRequest);
        return contractMapper.toContractDto(contractService.saveContract(contract));
    }

    

    @Operation(security = { @SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME) })
    @DeleteMapping("/{price}")
    public ContractDto deleteContract(@PathVariable String price) {
        Contract contract = contractService.validateAndGetContract(price);
        contractService.deleteContract(contract);
        return contractMapper.toContractDto(contract);
    }
}
