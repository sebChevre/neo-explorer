package ch.sebooom.neo.neoexplorer.api.rest;

import ch.sebooom.neo.neoexplorer.spi.neoclient.response.BlockResponse;
import ch.sebooom.neo.neoexplorer.spi.neoclient.response.TransactionResponse;
import ch.sebooom.neo.neoexplorer.spi.repository.BlockRepository;
import ch.sebooom.neo.neoexplorer.spi.entity.Transaction;
import ch.sebooom.neo.neoexplorer.spi.repository.TransactionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
public class TransactionController {

    @Autowired
    BlockRepository blockRepository;
    @Autowired
    TransactionRepository transactionRepository;

    @GetMapping
    @RequestMapping("/transactions/last")
    public ResponseEntity last10Generic(@RequestParam(required = false) Boolean filterMiner) {

        log.info("With request miner: {}",filterMiner);


            log.info("Iterate 100 first transactions");

            Integer totalBlocks = blockRepository.getNumbersOfBlock();

            List<Transaction> transactions = new ArrayList<>();
            int count = 1;

            int start = totalBlocks - (10 * count);

            while(transactions.size() < 10 && start >= 0){

                log.info("ts"+transactions.size());


                start = totalBlocks - (10 * count);
                int stop = start+10;

                log.info("load 100 block, iterations n° {}, startValue: {}",count,start);
                blockRepository.getBlockFromIdToId(start,stop).forEach(block -> {

                    block.getResult().getTx().forEach(tx -> {
                        Transaction t = transactionRepository.getTransactionByHash(tx.getTxid()).get().getResult();

                        if((filterMiner!= null && filterMiner)){
                            if(!tx.getType().equals("MinerTransaction")){
                                //t.setBlocktime(block.getResult().getTime());
                                transactions.add(t);
                            }
                        }else{
                            //t.setBlocktime(block.getResult().getTime());
                            transactions.add(t);


                        }

                    });
                });

                count ++;
            }

            return ResponseEntity.ok(transactions);

        }


    @GetMapping
    @RequestMapping("/transactions/{transactionHash}")
    public ResponseEntity<TransactionResponse>blockById(@PathVariable("transactionHash") String transactionHash) {

        return ResponseEntity.ok(
                transactionRepository.getTransactionByHash(transactionHash).get()
        );
    }


}
