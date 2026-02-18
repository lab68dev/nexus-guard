package com.nexusguard.service;

import com.nexusguard.entity.SafetyPolicy;
import com.nexusguard.repository.SafetyPolicyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Management service for Safety Policies (CRUD).
 */
@Service
@Transactional
public class PolicyService {

    private final SafetyPolicyRepository repo;

    public PolicyService(SafetyPolicyRepository repo) {
        this.repo = repo;
    }

    public List<SafetyPolicy> listByOrg(String orgId) {
        return repo.findByOrgIdOrderByCreatedAtDesc(orgId);
    }

    public List<SafetyPolicy> listActiveByOrg(String orgId) {
        return repo.findByOrgIdAndEnabledTrue(orgId);
    }

    public Optional<SafetyPolicy> findById(String id) {
        return repo.findById(id);
    }

    public SafetyPolicy create(String orgId, SafetyPolicy policy) {
        policy.setOrgId(orgId);
        return repo.save(policy);
    }

    public SafetyPolicy update(SafetyPolicy existing, SafetyPolicy updates) {
        if (updates.getName() != null) existing.setName(updates.getName());
        if (updates.getDescription() != null) existing.setDescription(updates.getDescription());
        if (updates.getType() != null) existing.setType(updates.getType());
        if (updates.getSeverity() != null) existing.setSeverity(updates.getSeverity());
        if (updates.getConfig() != null) existing.setConfig(updates.getConfig());
        existing.setEnabled(updates.isEnabled());
        return repo.save(existing);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
