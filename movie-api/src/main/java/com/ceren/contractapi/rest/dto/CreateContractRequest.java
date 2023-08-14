package com.ceren.contractapi.rest.dto;




import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateContractRequest {

    @Schema(example = "100$")
    @NotBlank
    private String price;

    @Schema(example = "Sirket")
    @NotBlank
    private String name;

    @Schema(example = "https://www.hloom.com/images/Vendor-Contract.jpg")
    private String file;

      

    

   
    
    
}
