package ch.sebooom.neo.neoexplorer.spi.neoclient.response;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class BlockCountResponse {

    private String result;

}
