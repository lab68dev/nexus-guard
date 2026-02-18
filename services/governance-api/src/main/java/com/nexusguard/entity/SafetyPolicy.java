package com.nexusguard.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Map;

/**
 * SafetyPolicy — Core governance entity.
 * <p>
 * Represents a configurable rule applied to AI API traffic.
 * Every policy is scoped to an organization via {@code orgId}
 * for multi-tenant isolation.
 */
@Entity
@Table(
    name = "safety_policies",
    indexes = {
        @Index(name = "idx_safety_policies_org", columnList = "orgId"),
        @Index(name = "idx_safety_policies_type", columnList = "orgId, type")
    }
)
public class SafetyPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    @Column(name = "org_id", nullable = false, updatable = false)
    private String orgId;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description = "";

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PolicyType type;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PolicySeverity severity = PolicySeverity.MEDIUM;

    @Column(nullable = false)
    private boolean enabled = true;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(columnDefinition = "jsonb", nullable = false)
    private Map<String, Object> config = Map.of();

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    // ── Lifecycle ──

    @PrePersist
    protected void onCreate() {
        var now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = Instant.now();
    }

    // ── Enums ──

    public enum PolicyType {
        CONTENT_FILTER,
        RATE_LIMIT,
        TOKEN_BUDGET,
        PII_REDACTION,
        MODEL_ALLOWLIST
    }

    public enum PolicySeverity {
        LOW, MEDIUM, HIGH, CRITICAL
    }

    // ── Getters & Setters ──

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getOrgId() { return orgId; }
    public void setOrgId(String orgId) { this.orgId = orgId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public PolicyType getType() { return type; }
    public void setType(PolicyType type) { this.type = type; }

    public PolicySeverity getSeverity() { return severity; }
    public void setSeverity(PolicySeverity severity) { this.severity = severity; }

    public boolean isEnabled() { return enabled; }
    public void setEnabled(boolean enabled) { this.enabled = enabled; }

    public Map<String, Object> getConfig() { return config; }
    public void setConfig(Map<String, Object> config) { this.config = config; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
