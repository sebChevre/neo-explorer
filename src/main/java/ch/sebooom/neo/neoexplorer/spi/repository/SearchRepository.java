package ch.sebooom.neo.neoexplorer.spi.repository;


import ch.sebooom.neo.neoexplorer.spi.neoclient.response.AddressResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.BlockResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.ObjectType;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.TransactionResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.search.SearchResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

@Repository
public class SearchRepository {

    @Autowired
    BlockRepository blockRepository;

    @Autowired
    TransactionRepository transactionRepository;


    public Optional<SearchResponse> findByblockId(Integer blockId) {

        BlockResponse blockResponse = blockRepository.getBlockById(blockId).get();

        SearchResponse searchResponse = new SearchResponse();
        searchResponse.setObjectType(ObjectType.BLOCK);
        searchResponse.setData(blockResponse);

        return Optional.of(searchResponse);

    }

    public Optional findByHash(String hash) {

        Optional optionnalResponse = Stream.of(
                blockRepository.getBlockByHash(hash),
                transactionRepository.getTransactionByHash(hash)
        )
        .filter(Optional::isPresent)
        .map(Optional::get)
        .findFirst();

        SearchResponse searchResponse = null;

        if(optionnalResponse.isPresent()){

            Object reponse = optionnalResponse.get();

            searchResponse = new SearchResponse();
            searchResponse.setData(reponse);

            if(reponse instanceof BlockResponse){

                searchResponse.setObjectType(ObjectType.BLOCK);

            }else if(reponse instanceof TransactionResponse){

                searchResponse.setObjectType(ObjectType.TRANSACTION);

            }else if(reponse instanceof AddressResponse){

                searchResponse.setObjectType(ObjectType.ADDRESS);

            }else{
                throw new RuntimeException("The type of response is not accepted" + reponse.getClass().getTypeName());
            }
        }

        return Optional.of(searchResponse);
    }
}
