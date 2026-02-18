package com.nexusguard.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/**
 * Service-to-service token filter.
 * <p>
 * Authenticates requests from the Next.js frontend using the
 * X-Service-Token header. This is used for internal communication
 * over Render's private network.
 */
public class ServiceTokenFilter extends OncePerRequestFilter {

    private static final String HEADER = "X-Service-Token";
    private final String expectedToken;

    public ServiceTokenFilter(String expectedToken) {
        this.expectedToken = expectedToken;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String token = request.getHeader(HEADER);

        if (token != null && token.equals(expectedToken)) {
            var auth = new UsernamePasswordAuthenticationToken(
                    "service-client",
                    null,
                    List.of(new SimpleGrantedAuthority("ROLE_SERVICE"))
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        filterChain.doFilter(request, response);
    }
}
