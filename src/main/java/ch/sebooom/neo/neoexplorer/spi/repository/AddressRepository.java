package ch.sebooom.neo.neoexplorer.spi.repository;

import ch.sebooom.neo.neoexplorer.spi.neoclient.JsonRpcNeoClient;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.BlockResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Optional;

@Repository
public class AddressRepository {

    @Autowired
    private JsonRpcNeoClient neoClient;

    @Autowired
    ObjectMapper objectMapper;

    public Optional<BlockResponse> getAddressByHash(String hash){

        ResponseEntity response = neoClient.getAddressStateByHash(hash);

        Optional<BlockResponse> blockResponse = null;

        try {
            blockResponse = Optional.of(
                    objectMapper.readValue(response.getBody().toString(),BlockResponse.class)
            );

        } catch (IOException e) {
            e.printStackTrace();
        }

        return (blockResponse.get().getResult() != null) ? blockResponse : Optional.ofNullable(null);

    }
}
