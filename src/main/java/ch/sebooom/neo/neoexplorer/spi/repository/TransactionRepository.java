package ch.sebooom.neo.neoexplorer.spi.repository;

import ch.sebooom.neo.neoexplorer.spi.neoclient.response.TransactionResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.JsonRpcNeoClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Optional;

@Repository
public class TransactionRepository {

    @Autowired
    JsonRpcNeoClient neoClient;
    @Autowired
    ObjectMapper objectMapper;

    public Optional<TransactionResponse> getTransactionByHash(String hash){

        ResponseEntity response = getTransactionByHashNeoClient(hash);

        Optional<TransactionResponse> transactionResponse = null;

        try {
            transactionResponse = Optional.of(
                    objectMapper.readValue(response.getBody().toString(),TransactionResponse.class)
            );


        } catch (IOException e) {
            e.printStackTrace();
        }

        return transactionResponse;

    }

    private ResponseEntity getTransactionByHashNeoClient(String hash) {

        return neoClient.getTransactionByHash(hash);
    }
}
