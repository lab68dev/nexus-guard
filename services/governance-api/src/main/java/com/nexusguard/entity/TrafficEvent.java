package com.nexusguard.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.time.Instant;
import java.util.List;

/**
 * TrafficEvent — Recorded AI API call through the proxy.
 */
@Entity
@Table(name = "traffic_events")
public class TrafficEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    @Column(name = "org_id", nullable = false, updatable = false)
    private String orgId;

    @Column(name = "api_key_id")
    private String apiKeyId;

    @NotBlank
    @Column(nullable = false)
    private String model;

    @NotBlank
    @Column(nullable = false)
    private String provider;

    @Column(name = "input_tokens", nullable = false)
    private int inputTokens;

    @Column(name = "output_tokens", nullable = false)
    private int outputTokens;

    @Column(name = "latency_ms", nullable = false)
    private int latencyMs;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrafficStatus status = TrafficStatus.ALLOWED;

    @Column(name = "policies_triggered", columnDefinition = "TEXT[]")
    private List<String> policiesTriggered = List.of();

    @Column(nullable = false)
    private Instant timestamp;

    @PrePersist
    protected void onCreate() {
        if (this.timestamp == null) {
            this.timestamp = Instant.now();
        }
    }

    public enum TrafficStatus {
        ALLOWED, BLOCKED, FLAGGED, MODIFIED
    }

    // ── Getters & Setters ──

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOrgId() { return orgId; }
    public void setOrgId(String orgId) { this.orgId = orgId; }

    public String getApiKeyId() { return apiKeyId; }
    public void setApiKeyId(String apiKeyId) { this.apiKeyId = apiKeyId; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getProvider() { return provider; }
    public void setProvider(String provider) { this.provider = provider; }

    public int getInputTokens() { return inputTokens; }
    public void setInputTokens(int inputTokens) { this.inputTokens = inputTokens; }

    public int getOutputTokens() { return outputTokens; }
    public void setOutputTokens(int outputTokens) { this.outputTokens = outputTokens; }

    public int getLatencyMs() { return latencyMs; }
    public void setLatencyMs(int latencyMs) { this.latencyMs = latencyMs; }

    public TrafficStatus getStatus() { return status; }
    public void setStatus(TrafficStatus status) { this.status = status; }

    public List<String> getPoliciesTriggered() { return policiesTriggered; }
    public void setPoliciesTriggered(List<String> policiesTriggered) { this.policiesTriggered = policiesTriggered; }

    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
