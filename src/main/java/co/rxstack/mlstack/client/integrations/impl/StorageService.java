package co.rxstack.mlstack.client.integrations.impl;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

import com.google.common.collect.ImmutableList;
import com.google.common.io.Files;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StorageService {

	private static final Logger log = LoggerFactory.getLogger(StorageService.class);

	private String imageStorageDirectory;

	@Autowired
	public StorageService(String imageStorageDirectory) {
		this.imageStorageDirectory = imageStorageDirectory;
	}

	public boolean saveToDisk(String folderName, byte[] fileBytes, String type) {
		log.info("Saving image to disk {} with bytes [{}] and type [{}]", folderName, fileBytes.length, type);
		try {
			File directory = new File(imageStorageDirectory + File.separator + folderName);
			if (!directory.exists()) {
				if (!directory.mkdir()) {
					log.error("Couldn't create saving directory! {}", directory.getAbsolutePath());
					return false;
				}
			}

			String builder = directory.getAbsolutePath() + File.separator +
					System.currentTimeMillis() + "." + type.split("/")[1];

			Files.write(fileBytes, new File(builder));
			return true;
		} catch (IOException e) {
			log.error(e.getMessage(), e);
		}
		return false;
	}

	public List<BufferedImage> listImages(Path path) {
		return ImmutableList.of();
	}

}
