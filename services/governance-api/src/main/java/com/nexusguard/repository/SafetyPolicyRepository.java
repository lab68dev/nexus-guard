package com.nexusguard.repository;

import com.nexusguard.entity.SafetyPolicy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SafetyPolicyRepository extends JpaRepository<SafetyPolicy, String> {

    List<SafetyPolicy> findByOrgIdOrderByCreatedAtDesc(String orgId);

    List<SafetyPolicy> findByOrgIdAndEnabledTrue(String orgId);

    List<SafetyPolicy> findByOrgIdAndType(String orgId, SafetyPolicy.PolicyType type);
}
