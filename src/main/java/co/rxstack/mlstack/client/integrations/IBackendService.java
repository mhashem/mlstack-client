package co.rxstack.mlstack.client.integrations;

import java.util.List;

import co.rxstack.mlstack.client.integrations.models.Face;

public interface IBackendService {

	List<Face> getFaces(int identity);

	void saveImage();

	void uploadImage(String personName, byte[] imageBytes);

	void deleteIdentity(Long id);

}
