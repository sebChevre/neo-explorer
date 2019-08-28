package ch.sebooom.neo.neoexplorer.spi.neoclient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class JsonRpcNeoClient {

    private final static String HOST = "http://192.168.1.111";
    private final static String PORT = "10332";

    private final static String BLOCK_BY_ID_URL = HOST + ":" + PORT + "?jsonrpc=2.0&method=getblock&params=[%d,1]&id=0";
    private final static String BLOCK_BY_HASH_URL = HOST + ":" + PORT + "?jsonrpc=2.0&method=getblock&params=['%s',1]&id=0";
    private final static String BLOCK_COUNT_URL = HOST + ":" + PORT + "?jsonrpc=2.0&method=getblockcount&params=[]&id=1";
    private final static String TRANSACTION_BY_HASH = HOST + ":" + PORT + "?jsonrpc=2.0&method=getrawtransaction&params=['%s',1]&id=0";
    private final static String ADDRESS_BY_HASH = HOST + ":" + PORT + "?jsonrpc=2.0&method=getaccountstate&params=['%s']&id=1";
    private final static String ASSET_BY_HASH = HOST + ":" + PORT + "?jsonrpc=2.0&method=getassetstate&params=['%s']&id=1";

    final static String CONTENT_TYPE = "application/json-rpc";

    private HttpHeaders headers;

    @Autowired
    private RestTemplate restTemplate;


     public JsonRpcNeoClient() {
         headers = new HttpHeaders();
         headers.setContentType(MediaType.parseMediaType(CONTENT_TYPE));
     }

     public ResponseEntity getBlockById(Long blockId){
         String url = String.format(BLOCK_BY_ID_URL,blockId);
         return restTemplate.getForEntity(url, String.class,headers);
     }

    public ResponseEntity getBlockByHash(String hash) {
        String url = String.format(BLOCK_BY_HASH_URL,hash);
        return restTemplate.getForEntity(url, String.class,headers);
    }

    public ResponseEntity getNumberOfBlock(){
        return restTemplate.getForEntity(BLOCK_COUNT_URL, String.class,headers);
    }

    public ResponseEntity getTransactionByHash(String hash){
         String url = String.format(TRANSACTION_BY_HASH,hash);
         return restTemplate.getForEntity(url,String.class,headers);
    }

    public ResponseEntity getAddressStateByHash(String hash){
        String url = String.format(ADDRESS_BY_HASH,hash);
        return restTemplate.getForEntity(url,String.class,headers);
    }

    public ResponseEntity getAssetStateByHash(String hash){
        String url = String.format(ASSET_BY_HASH,hash);
        return restTemplate.getForEntity(url,String.class,headers);
    }
}
