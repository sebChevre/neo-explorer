package ch.sebooom.neo.neoexplorer.spi.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class Transaction {

    public Transaction () {}

    private String txid;
    private Integer size;
    private String type;
    private Integer version;
    private String nonce;
    private Long blocktime;
    private String sys_fee;
    private String net_fee;
    private String blockhash;
    private Integer confirmations;

    //pour registered
    private Asset asset;
    private List<Scripts> scripts;

    private List<TransactionIn> vin;
    private List<TransactionOut> vout;



}
