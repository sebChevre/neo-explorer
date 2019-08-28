package ch.sebooom.neo.neoexplorer.spi.neoclient.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {

    private Integer code;
    private String message;
}
