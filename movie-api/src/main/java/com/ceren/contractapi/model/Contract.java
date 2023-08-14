package com.ceren.contractapi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "contracts")
public class Contract {

    @Id
    private String price;

    private String name;
    private String file;

 
    

    private ZonedDateTime createdAt;
    

    public Contract(String price, String name, String file) {
        this.price = price;
        this.name = name;
        this.file = file;
    
    }

    @PrePersist
    public void onPrePersist() {
        createdAt = ZonedDateTime.now();
    }
  
}
