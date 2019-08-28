package ch.sebooom.neo.neoexplorer.spi.neoclient.response;

import ch.sebooom.neo.neoexplorer.spi.entity.Transaction;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class TransactionResponse {

    private Transaction result;
    private ErrorResponse error;
}
