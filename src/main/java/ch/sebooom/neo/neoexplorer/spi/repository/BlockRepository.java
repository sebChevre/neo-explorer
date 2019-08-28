package ch.sebooom.neo.neoexplorer.spi.repository;

import ch.sebooom.neo.neoexplorer.spi.neoclient.response.BlockCountResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.BlockResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.JsonRpcNeoClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@Repository
public class BlockRepository {

    @Autowired
    JsonRpcNeoClient neoClient;
    @Autowired
    ObjectMapper objectMapper;

    public List<BlockResponse> getBlockFromIdToId(Integer startId, Integer stopId){

        //startid doit etre >= 0
        if(startId < 0){
            startId = 0;
        }

        //appel des blocs par id
        List<BlockResponse> blocks = IntStream.range(startId,stopId).asLongStream().mapToObj(blockId -> {

            ResponseEntity resp = getBlockByIdResponseEntity(blockId);

            BlockResponse blockResponse = null;

            try {
                blockResponse = objectMapper.readValue(resp.getBody().toString(),BlockResponse.class);
                blockResponse.setNbreTransactions(blockResponse.getResult().getTx().size());
            } catch (IOException e) {
                e.printStackTrace();
            }

            return blockResponse;

        }).collect(Collectors.toList());

        Collections.reverse(blocks);

        return blocks;

    }

    public Optional<BlockResponse> getBlockById(long bloclId){

        ResponseEntity response = getBlockByIdResponseEntity(bloclId);

        Optional<BlockResponse> blockResponse = null;

        try {
            blockResponse = Optional.of(
                objectMapper.readValue(response.getBody().toString(),BlockResponse.class)
            );

            BlockResponse block = blockResponse.get();

            block.setNbreTransactions(
                    block.getResult().getTx().size());

        } catch (IOException e) {
            e.printStackTrace();
            blockResponse = Optional.ofNullable(null);
        }

        return blockResponse;

    }

    public Optional<BlockResponse> getBlockByHash(String hash){

        ResponseEntity response = getBlockByHashResponseEntity(hash);

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

    private ResponseEntity getBlockByIdResponseEntity(Long blockId) {

        return neoClient.getBlockById(blockId);
    }

    private ResponseEntity getBlockByHashResponseEntity(String hash) {

        return neoClient.getBlockByHash(hash);
    }

    public List<BlockResponse> getLast10Blocks () {

        int numberOfBlock = getNumbersOfBlock();

        return this.getBlockFromIdToId(numberOfBlock-10,numberOfBlock);

    }

    public Integer getNumbersOfBlock()  {

        ResponseEntity responseEntity = neoClient.getNumberOfBlock();

        BlockCountResponse count = null;

        try {
            count = objectMapper.readValue(responseEntity.getBody().toString(),BlockCountResponse.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        log.info(responseEntity.getBody().toString());

       return Integer.valueOf(count.getResult());

    }
}
