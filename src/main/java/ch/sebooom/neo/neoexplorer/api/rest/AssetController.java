package ch.sebooom.neo.neoexplorer.api.rest;

import ch.sebooom.neo.neoexplorer.spi.neoclient.response.AssetResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.TransactionResponse;
import ch.sebooom.neo.neoexplorer.spi.repository.AssetRepository;
import ch.sebooom.neo.neoexplorer.spi.repository.BlockRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class AssetController {

    @Autowired
    AssetRepository assetRepository;

    @GetMapping
    @RequestMapping("/assets/{assetHash}")
    public ResponseEntity<AssetResponse> assetByHash(@PathVariable("assetHash") String assetHash) {

        return ResponseEntity.ok(
                assetRepository.getAssetByHash(assetHash).get()
        );
    }
}
