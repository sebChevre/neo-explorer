package ch.sebooom.neo.neoexplorer.spi.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
public class Scripts {

    private String invocation;
    private String verification;
}
