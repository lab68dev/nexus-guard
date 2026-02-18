package com.nexusguard;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.context.ActiveProfiles;

/**
 * Smoke test — verifies the Spring application context loads successfully.
 *
 * <p>
 * {@code @MockBean(JwtDecoder.class)} replaces the auto-configured
 * {@link JwtDecoder} (which would attempt to fetch the JWK set / OIDC
 * discovery document at startup) with a Mockito mock, preventing any
 * outbound network calls during CI.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@ActiveProfiles("test")
class GovernanceApiApplicationTests {

    @MockBean
    JwtDecoder jwtDecoder;

    @Test
    void contextLoads() {
    }
}
