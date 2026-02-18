package com.nexusguard.repository;

import com.nexusguard.entity.TrafficEvent;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface TrafficEventRepository extends JpaRepository<TrafficEvent, String> {

    List<TrafficEvent> findByOrgIdOrderByTimestampDesc(String orgId, Pageable pageable);

    long countByOrgIdAndTimestampAfter(String orgId, Instant after);

    long countByOrgIdAndStatusAndTimestampAfter(String orgId, TrafficEvent.TrafficStatus status, Instant after);
}
