package ch.sebooom.neo.neoexplorer.spi.neoclient.response;

import ch.sebooom.neo.neoexplorer.spi.entity.Asset;
import ch.sebooom.neo.neoexplorer.spi.entity.Block;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AssetResponse {

    private Asset result;
    private Integer nbreTransactions;
    private ErrorResponse error;
    private String nom;
    private String nomCourt;

    public Boolean isResponseInError(){
        return error != null;
    }
}
