package co.rxstack.mlstack.client.service;

import java.io.IOException;

import co.rxstack.mlstack.client.ClientApp;
import co.rxstack.mlstack.client.integrations.impl.BackendService;
import co.rxstack.mlstack.client.utils.ImageHelper;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClientApp.class)
public class BackendServiceTest {

	@Autowired
	public BackendService backendService;

	@Ignore
	@Test
	public void testUploadImage() throws IOException {
		backendService.uploadImage("Foo",
			ImageHelper.loadResourceAsByteArray(BackendServiceTest.class, "images/Avini.jpg"));
	}

}
