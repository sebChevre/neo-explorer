package ch.sebooom.neo.neoexplorer.spi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class NeoJsonRpcClientConfig {

    @Bean
    public RestTemplate restTemplate () {
        return new RestTemplate();
    }
}
