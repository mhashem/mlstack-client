package co.rxstack.mlstack.client.mlstack;

import co.rxstack.mlstack.client.mlstack.models.JobResponse;
import co.rxstack.mlstack.client.mlstack.models.NotificationResponse;

public interface IBackendService {

	void saveImage();

	void uploadImage(String personName, byte[] imageBytes);

}
