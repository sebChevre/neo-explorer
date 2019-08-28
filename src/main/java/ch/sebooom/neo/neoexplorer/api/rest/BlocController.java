package ch.sebooom.neo.neoexplorer.api.rest;

import ch.sebooom.neo.neoexplorer.spi.repository.BlockRepository;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.BlockResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BlocController {

    @Autowired
    BlockRepository blockRepository;

    @GetMapping
    @RequestMapping("/blocks/total")
    public ResponseEntity<Integer> numberOfBlocks() {
        return ResponseEntity.ok(
                blockRepository.getNumbersOfBlock()
        );
    }

    @GetMapping
    @RequestMapping("/blocks/last")
    public ResponseEntity<List<BlockResponse>>last10Blocks() {
        return ResponseEntity.ok(
                blockRepository.getLast10Blocks()
        );
    }

    @GetMapping
    @RequestMapping("/blocks/id/{blockId}")
    public ResponseEntity<BlockResponse>blockById(@PathVariable("blockId") Long blockId) {

        return ResponseEntity.ok(
                blockRepository.getBlockById(blockId).get()
        );
    }

    @GetMapping
    @RequestMapping("/blocks/hash/{blockHash}")
    public ResponseEntity<BlockResponse>blockByHash(@PathVariable("blockHash") String hash) {
        return ResponseEntity.ok(
                blockRepository.getBlockByHash(hash).get()
        );
    }



}
