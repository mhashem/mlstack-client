package co.rxstack.mlstack.client.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.vault.authentication.ClientAuthentication;
import org.springframework.vault.authentication.TokenAuthentication;
import org.springframework.vault.client.VaultEndpoint;
import org.springframework.vault.config.AbstractVaultConfiguration;
import org.springframework.vault.core.VaultTemplate;

@Configuration
public class VaultConfiguration extends AbstractVaultConfiguration {

	@Override
	public VaultEndpoint vaultEndpoint() {
		return VaultEndpoint.create("http://127.0.0.1", 8200);
	}

	@Override
	public ClientAuthentication clientAuthentication() {
		return new TokenAuthentication("my-secret-token-to-change-in-production");
	}

	@Bean
	public VaultTemplate vaultTemplate() {
		return new VaultTemplate(vaultEndpoint(), clientAuthentication());
	}

}
