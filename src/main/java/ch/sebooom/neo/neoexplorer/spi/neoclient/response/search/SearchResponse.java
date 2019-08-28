package ch.sebooom.neo.neoexplorer.spi.neoclient.response.search;

import ch.sebooom.neo.neoexplorer.spi.neoclient.response.ObjectType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchResponse {

    private ObjectType objectType;

    private Object data;
}


