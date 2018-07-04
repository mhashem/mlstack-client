package co.rxstack.mlstack.client;

import co.rxstack.mlstack.client.mlstack.impl.BackendService;
import co.rxstack.mlstack.client.mlstack.impl.StorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ClientAppContext {

	@Value("${mlServiceName}")
	private String mlServiceName;

	@Value("${imageStorageDirectory}")
	private String imageStorageDirectory;

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	@Bean
	public BackendService backendService(RestTemplate restTemplate, DiscoveryClient discoveryClient) {
		return new BackendService(restTemplate, mlServiceName, discoveryClient);
	}

	@Bean
	public StorageService storageService() {
		return new StorageService(imageStorageDirectory);
	}

}
