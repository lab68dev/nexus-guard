package com.nexusguard.proxy;

import com.nexusguard.entity.SafetyPolicy;
import com.nexusguard.service.PolicyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.List;

/**
 * Governance Proxy — High-speed, non-blocking LLM call interceptor.
 * <p>
 * Uses Spring WebFlux {@link WebClient} to intercept AI API calls,
 * apply safety policies, and forward to upstream LLM providers.
 * This is the core proxy through which all tenant AI traffic flows.
 */
@RestController
@RequestMapping("/api/v1/proxy")
public class GovernanceProxy {

    private static final Logger log = LoggerFactory.getLogger(GovernanceProxy.class);

    private final WebClient webClient;
    private final PolicyService policyService;

    @Value("${nexusguard.proxy.default-timeout-ms:30000}")
    private long defaultTimeoutMs;

    public GovernanceProxy(WebClient.Builder webClientBuilder, PolicyService policyService) {
        this.webClient = webClientBuilder
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
        this.policyService = policyService;
    }

    /**
     * Intercept and proxy an LLM API call.
     *
     * @param orgId         The tenant organization ID (from header).
     * @param provider      The upstream LLM provider (openai, anthropic, google).
     * @param requestBody   The raw request body to forward.
     * @return              The proxied response from the LLM provider.
     */
    @PostMapping("/{provider}/**")
    public Mono<String> proxyRequest(
            @RequestHeader("X-Org-Id") String orgId,
            @PathVariable String provider,
            @RequestBody String requestBody) {

        log.info("Proxying request for org={} provider={}", orgId, provider);

        // 1. Load active policies for this tenant
        List<SafetyPolicy> policies = policyService.listActiveByOrg(orgId);

        // 2. Pre-flight policy checks (content filter, rate limit, etc.)
        PolicyCheckResult preCheck = evaluatePolicies(policies, requestBody);
        if (preCheck.blocked()) {
            log.warn("Request BLOCKED by policy: org={} reason={}", orgId, preCheck.reason());
            return Mono.just(buildBlockedResponse(preCheck));
        }

        // 3. Optionally modify request body (PII redaction, etc.)
        String processedBody = preCheck.modifiedBody() != null
                ? preCheck.modifiedBody()
                : requestBody;

        // 4. Forward to upstream LLM
        String upstreamUrl = resolveUpstreamUrl(provider);

        return webClient.post()
                .uri(upstreamUrl)
                .bodyValue(processedBody)
                .retrieve()
                .bodyToMono(String.class)
                .timeout(Duration.ofMillis(defaultTimeoutMs))
                .doOnSuccess(response -> log.info("Proxy response received for org={}", orgId))
                .doOnError(err -> log.error("Proxy error for org={}: {}", orgId, err.getMessage()));
    }

    // ── Policy Evaluation ──

    private PolicyCheckResult evaluatePolicies(List<SafetyPolicy> policies, String body) {
        // Placeholder: iterate policies and apply checks.
        // In production, each policy type has a dedicated evaluator.
        for (SafetyPolicy policy : policies) {
            if (policy.getType() == SafetyPolicy.PolicyType.CONTENT_FILTER) {
                // Content filter logic here
            }
            if (policy.getType() == SafetyPolicy.PolicyType.PII_REDACTION) {
                // PII redaction logic here
            }
        }
        return new PolicyCheckResult(false, null, null);
    }

    private String resolveUpstreamUrl(String provider) {
        return switch (provider.toLowerCase()) {
            case "openai" -> "https://api.openai.com/v1/chat/completions";
            case "anthropic" -> "https://api.anthropic.com/v1/messages";
            case "google" -> "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent";
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }

    private String buildBlockedResponse(PolicyCheckResult result) {
        return """
                {"error": {"type": "policy_violation", "message": "%s"}}
                """.formatted(result.reason());
    }

    record PolicyCheckResult(boolean blocked, String reason, String modifiedBody) {}
}
