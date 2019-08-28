package ch.sebooom.neo.neoexplorer.spi.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Asset {

    public Asset(){}
     private Integer version;
     private String id;
     private String type;
     private List<AssetName> name = new ArrayList<>();
     private String amount;
     private String available;
     private Integer precision;
     private String owner;
     private String admin;
     private String issuer;
     private Integer expiration;
     private Boolean frozen;
}

