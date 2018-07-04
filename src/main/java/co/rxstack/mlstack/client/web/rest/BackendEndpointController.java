package co.rxstack.mlstack.client.web.rest;

import java.util.Map;

import co.rxstack.mlstack.client.service.PersonService;
import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BackendEndpointController {

	private static final Logger log = LoggerFactory.getLogger(BackendEndpointController.class);

	private final PersonService personService;

	@Autowired
	public BackendEndpointController(PersonService personService) {
		this.personService = personService;
	}

	@PostMapping("/api/v1/person/faceIds")
	@Timed
	public ResponseEntity<Void> saveIndexedFacesIds(
		@RequestBody
			Map<String, String> indexedFacesIds) {
		log.info("REST request received for saving indexed faces ids {}", indexedFacesIds);
		return ResponseEntity.ok().build();
	}

}
