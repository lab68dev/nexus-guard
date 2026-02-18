package com.nexusguard.config;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;

import java.time.Instant;
import java.util.Map;

/**
 * Test-only security configuration.
 * <p>
 * Provides a no-op {@link JwtDecoder} bean so that {@link SecurityConfig}
 * can wire {@code .oauth2ResourceServer(oauth2 -> oauth2.jwt(...))} without
 * attempting to fetch the OIDC discovery document from the issuer URI at
 * application context startup (which would fail in CI with no network access).
 */
@TestConfiguration
public class TestSecurityConfig {

    @Bean
    @Primary
    public JwtDecoder jwtDecoder() {
        // Returns a stub JWT — never called during contextLoads(), but
        // satisfies the JwtDecoder dependency required by SecurityConfig.
        return token -> Jwt.withTokenValue(token)
                .header("alg", "none")
                .claim("sub", "test-user")
                .issuedAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(3600))
                .claims(claims -> claims.putAll(Map.of("iss", "https://auth.nexusguard.io")))
                .build();
    }
}
