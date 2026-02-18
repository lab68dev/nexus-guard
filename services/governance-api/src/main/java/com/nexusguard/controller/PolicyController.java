package com.nexusguard.controller;

import com.nexusguard.entity.SafetyPolicy;
import com.nexusguard.service.PolicyService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * REST controller for Safety Policy management (CRUD).
 * All operations are scoped to the tenant's org_id.
 */
@RestController
@RequestMapping("/api/v1/policies")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @GetMapping
    public List<SafetyPolicy> list(@RequestHeader("X-Org-Id") String orgId) {
        return policyService.listByOrg(orgId);
    }

    @GetMapping("/{id}")
    public SafetyPolicy getById(
            @RequestHeader("X-Org-Id") String orgId,
            @PathVariable String id) {
        return policyService.findById(id)
                .filter(p -> p.getOrgId().equals(orgId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Policy not found"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SafetyPolicy create(
            @RequestHeader("X-Org-Id") String orgId,
            @Valid @RequestBody SafetyPolicy policy) {
        return policyService.create(orgId, policy);
    }

    @PatchMapping("/{id}")
    public SafetyPolicy update(
            @RequestHeader("X-Org-Id") String orgId,
            @PathVariable String id,
            @RequestBody SafetyPolicy updates) {
        var existing = policyService.findById(id)
                .filter(p -> p.getOrgId().equals(orgId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Policy not found"));
        return policyService.update(existing, updates);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @RequestHeader("X-Org-Id") String orgId,
            @PathVariable String id) {
        var existing = policyService.findById(id)
                .filter(p -> p.getOrgId().equals(orgId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Policy not found"));
        policyService.delete(existing.getId());
    }
}
