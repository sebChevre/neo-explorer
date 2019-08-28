package ch.sebooom.neo.neoexplorer.spi.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class TransactionLight {

    public TransactionLight() {}

    private String txid;
    private Integer size;
    private String type;
    private Integer version;
    private String nonce;
    private Long blocktime;

}
