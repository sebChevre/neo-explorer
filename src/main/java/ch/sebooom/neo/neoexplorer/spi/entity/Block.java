package ch.sebooom.neo.neoexplorer.spi.entity;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Block {
    public Block(){}

    private String hash;
    private Integer size;
    private Integer version;
    private String previousblockhash;
    private String merkleroot;
    private Long time;
    private Integer index;
    private String nonce;
    private String nextconsensus;
    private List<Transaction> tx;
    private String nextblockhash;

}
