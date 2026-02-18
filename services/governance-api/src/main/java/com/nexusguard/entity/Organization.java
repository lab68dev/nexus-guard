package com.nexusguard.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

/**
 * Organization — Multi-tenant root entity.
 */
@Entity
@Table(name = "organizations")
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Column(nullable = false, unique = true)
    private String slug;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrgPlan plan = OrgPlan.FREE;

    @Column(name = "token_budget", nullable = false)
    private long tokenBudget = 1_000_000;

    @Column(name = "tokens_used", nullable = false)
    private long tokensUsed = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

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

    public enum OrgPlan {
        FREE, PRO, ENTERPRISE
    }

    // ── Getters & Setters ──

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public OrgPlan getPlan() { return plan; }
    public void setPlan(OrgPlan plan) { this.plan = plan; }

    public long getTokenBudget() { return tokenBudget; }
    public void setTokenBudget(long tokenBudget) { this.tokenBudget = tokenBudget; }

    public long getTokensUsed() { return tokensUsed; }
    public void setTokensUsed(long tokensUsed) { this.tokensUsed = tokensUsed; }

    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }
}
