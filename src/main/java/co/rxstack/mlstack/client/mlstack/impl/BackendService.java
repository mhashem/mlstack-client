package co.rxstack.mlstack.client.mlstack.impl;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import co.rxstack.mlstack.client.mlstack.IBackendService;
import co.rxstack.mlstack.client.mlstack.models.JobResponse;
import co.rxstack.mlstack.client.mlstack.models.NotificationResponse;
import com.google.common.base.Preconditions;
import com.google.common.collect.ImmutableMap;
import com.google.common.io.Files;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * This service is dedicated to deal with the machine learning service backend
 *
 * @author mhachem
 */
public class BackendService implements IBackendService {

	private static final Logger log = LoggerFactory.getLogger(BackendService.class);

	private String serviceName;
	private RestTemplate restTemplate;
	private DiscoveryClient discoveryClient;

	public BackendService(RestTemplate restTemplate, String serviceName, DiscoveryClient discoveryClient) {
		Preconditions.checkNotNull(restTemplate);
		Preconditions.checkNotNull(serviceName);
		Preconditions.checkNotNull(discoveryClient);
		this.restTemplate = restTemplate;
		this.serviceName = serviceName;
		this.discoveryClient = discoveryClient;
	}

	@Override
	public void saveImage() {
		log.info("Sending new image notification");
		// notificationType 1001 new image
		discoveryClient.getInstances(serviceName).stream().findFirst().ifPresent(serviceInstance -> {
			String contextPath = serviceInstance.getMetadata().get("contextPath");
			restTemplate.postForEntity(UriComponentsBuilder.fromUri(serviceInstance.getUri()).path(contextPath)
					.path("/api/v1/notification/push")
					.queryParam("notificationType", 1001)
					.build()
					.toUri(),
				ImmutableMap.of(), null);
		});
	}

	@Override
	public void uploadImage(String cloudIndexIdentifier, byte[] imageBytes) {
		log.info("attempting to upload file to machine learning server {} image-length {}", cloudIndexIdentifier,
			imageBytes.length);
		File tempFile = null;
		try {
			Optional<ServiceInstance> serviceInstanceOpt =
				discoveryClient.getInstances(serviceName).stream().findFirst();
			if (!serviceInstanceOpt.isPresent()) {
				// todo queue request for example
				log.error("No service instance of type [{}] found [UP] at cluster!", serviceName);
				return;
			}

			tempFile = File.createTempFile(cloudIndexIdentifier, ".jpg");
			Files.write(imageBytes, tempFile);
			MultiValueMap<String, Object> parts = new LinkedMultiValueMap<>();
			parts.add("imageFile", new FileSystemResource(tempFile));
			parts.add("cloudIndexIdentifier", cloudIndexIdentifier);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.MULTIPART_FORM_DATA);
			headers.setContentLength(imageBytes.length);

			HttpEntity<MultiValueMap<String, Object>> httpEntity = new HttpEntity<>(parts, headers);
			URI uploadImageUri =
				UriComponentsBuilder.fromUri(serviceInstanceOpt.get().getUri()).path("/api/v1/storage/image").build()
					.toUri();
			restTemplate.postForEntity(uploadImageUri, httpEntity, String.class);
			log.info("successfully submitted image to backend!");
		} catch (IOException e) {
			log.error(e.getMessage(), e);
		} finally {
			if (tempFile != null) {
				boolean deleted = tempFile.delete();
				log.debug("temporary file cleared state: {}", deleted);
			}
		}
	}

}
