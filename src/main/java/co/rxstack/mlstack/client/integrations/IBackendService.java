package co.rxstack.mlstack.client.integrations;

public interface IBackendService {

	void saveImage();

	void uploadImage(String personName, byte[] imageBytes);

}
