package ch.sebooom.neo.neoexplorer.api.rest.reponse;

import ch.sebooom.neo.neoexplorer.spi.neoclient.response.ErrorResponse;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiErrorResponse {

    private Integer jsonRpcCode;
    private String message;

    public ApiErrorResponse(ErrorResponse error) {
        this.jsonRpcCode = error.getCode();
        this.message = error.getMessage();
    }
}
