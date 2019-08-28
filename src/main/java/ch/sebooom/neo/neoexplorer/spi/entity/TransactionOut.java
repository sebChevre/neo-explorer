package ch.sebooom.neo.neoexplorer.spi.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class TransactionOut {

    public TransactionOut () {}

    private Integer n;
    private String asset;
    private String value;
    private String address;

}
