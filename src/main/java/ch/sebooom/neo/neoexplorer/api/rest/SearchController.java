package ch.sebooom.neo.neoexplorer.api.rest;

import ch.sebooom.neo.neoexplorer.api.rest.reponse.ApiErrorResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.BlockResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.ErrorResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.search.SearchResponse;
import ch.sebooom.neo.neoexplorer.spi.repository.SearchRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class SearchController {

    @Autowired
    SearchRepository searchRepository;

    @GetMapping("search")
    public ResponseEntity search(@RequestParam String terme){

        ResponseEntity response;

        if(isNumeric(terme)){
            log.info("Numeric term for block id: {}",terme);
            Integer blockId = Integer.valueOf(terme);

            SearchResponse searchResponse = searchRepository.findByblockId(blockId).orElseThrow(() ->
                new RuntimeException("Block retrieve failed")
            );

            BlockResponse blockResponse = (BlockResponse) searchResponse.getData();

            response = (blockResponse.isResponseInError()) ?
                    ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            new ApiErrorResponse(blockResponse.getError())) :
                    ResponseEntity.ok().body(searchResponse);

        }else{
            log.info("Hash term for block,tx or adress: {}",terme);
            response = ResponseEntity.ok(searchRepository.findByHash(terme));
        }

        return response;

    }

    public static boolean isNumeric(String str) {
        return str.matches("-?\\d+(\\.\\d+)?");  //match a number with optional '-' and decimal.
    }
}
