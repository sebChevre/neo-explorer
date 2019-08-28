package ch.sebooom.neo.neoexplorer.spi.neoclient.response;

import ch.sebooom.neo.neoexplorer.spi.entity.Block;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BlockResponse {

    private Block result;
    private Integer nbreTransactions;
    private ErrorResponse error;

    public Boolean isResponseInError(){
        return error != null;
    }
}

