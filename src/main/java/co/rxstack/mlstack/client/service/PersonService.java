package co.rxstack.mlstack.client.service;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import co.rxstack.mlstack.client.domain.Person;
import co.rxstack.mlstack.client.integrations.impl.BackendService;
import co.rxstack.mlstack.client.integrations.impl.StorageService;
import co.rxstack.mlstack.client.repository.PersonRepository;
import co.rxstack.mlstack.client.security.SecurityUtils;
import com.google.common.base.Preconditions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing Person.
 */
@Service
@Transactional
public class PersonService {

	private final Logger log = LoggerFactory.getLogger(PersonService.class);

	private final PersonRepository personRepository;
	private final BackendService backendService;
	private final StorageService storageService;

	public PersonService(PersonRepository personRepository, BackendService backendService,
		StorageService storageService) {
		Preconditions.checkNotNull(personRepository);
		Preconditions.checkNotNull(backendService);
		this.personRepository = personRepository;
		this.backendService = backendService;
		this.storageService = storageService;
	}

    /**
     * Save a person.
     *
     * @param person the entity to save
     * @return the persisted entity
     */
    public Person save(Person person) {
        log.debug("Request to save Person : {}", person);
        person.setOwner(SecurityUtils.getCurrentUserLogin().orElse("Unknown"));
		Person savedPerson = personRepository.save(person);
    	log.info("Person saved successfully {}", person);

		// FIXME
		//backendService.uploadImage(person.getCloudIndexIdentifier(), person.getImage());
		CompletableFuture.runAsync(() -> {
			boolean isSaved = storageService
				.saveToDisk(String.valueOf(person.getId()), person.getImage(), person.getImageContentType());
			if (isSaved) {
				backendService.saveImage();
			}
		});
		return savedPerson;
    }

    /**
     * Get all the people.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Person> findAll(Pageable pageable) {
        log.debug("Request to get all People");
		return personRepository.findAll(pageable).map(person -> {
			person.setFacesCount(backendService.getFaces(person.getId().intValue()).size());
			return person;
		});
    }


    /**
     * Get one person by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Person> findOne(Long id) {
        log.debug("Request to get Person : {}", id);
        return personRepository.findById(id);
    }

    /**
     * Delete the person by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Person : {}", id);
        personRepository.deleteById(id);
        backendService.deleteIdentity(id);
    }
}
