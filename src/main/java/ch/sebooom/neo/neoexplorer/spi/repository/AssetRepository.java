package ch.sebooom.neo.neoexplorer.spi.repository;

import ch.sebooom.neo.neoexplorer.spi.entity.AssetName;
import ch.sebooom.neo.neoexplorer.spi.neoclient.JsonRpcNeoClient;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.AssetResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.BlockResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@Repository
public class AssetRepository {

    @Autowired
    private JsonRpcNeoClient neoClient;

    @Autowired
    ObjectMapper objectMapper;

    public Optional<AssetResponse> getAssetByHash(String hash){

        ResponseEntity response = neoClient.getAssetStateByHash(hash);

        Optional<AssetResponse> assetResponse = null;

        try {
            assetResponse = Optional.of(
                    objectMapper.readValue(response.getBody().toString(),AssetResponse.class)
            );

            AssetResponse asset = assetResponse.get();
            asset.setNom(resolveAssetNom(asset));
            asset.setNomCourt(resolveAssetNomCourt(asset));


        } catch (IOException e) {
            e.printStackTrace();
        }

        return (assetResponse.get().getResult() != null) ? assetResponse : Optional.ofNullable(null);

    }

    private String resolveAssetNomCourt(AssetResponse asset) {

        if(asset.getResult().getType().equals("GoverningToken")){
            return "NEO";
        }else if(asset.getResult().getType().equals("UtilityToken")){
            return "GAS";
        }else{
            return "NON NATIVE";
        }
    }

    private String resolveAssetNom(AssetResponse asset) {

        log.info("Asset hahs: {}",asset);

        AssetName enName = asset.getResult().getName().stream().filter(assetName -> {
            return assetName.getLang().equals("en");
        }).findFirst().get();

        //log.info(asset.getError().getMessage());

        return asset.getResult().getType() + " - " + enName.getName();

    }
}
