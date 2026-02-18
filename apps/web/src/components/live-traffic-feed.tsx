"use client";

import { useEffect, useRef, useState } from "react";
import {
  Activity,
  Circle,
  Pause,
  Play,
  Trash2,
} from "lucide-react";
import type { TrafficEvent, TrafficStatus } from "@nexusguard/shared-types";

/* ─────────────────────────────────────────────
   Live Traffic Feed — Client Component
   Connects via WebSocket to stream traffic events.
   ───────────────────────────────────────────── */

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8080/ws/traffic";

function statusColor(status: TrafficStatus): string {
  const map: Record<TrafficStatus, string> = {
    ALLOWED: "text-ng-success",
    BLOCKED: "text-ng-danger",
    FLAGGED: "text-ng-warning",
    MODIFIED: "text-ng-gray-500",
  };
  return map[status];
}

function statusBadgeClass(status: TrafficStatus): string {
  const map: Record<TrafficStatus, string> = {
    ALLOWED: "ng-badge ng-badge-success",
    BLOCKED: "ng-badge ng-badge-danger",
    FLAGGED: "ng-badge ng-badge-warning",
    MODIFIED: "ng-badge",
  };
  return map[status];
}

export function LiveTrafficFeed() {
  const [events, setEvents] = useState<TrafficEvent[]>([]);
  const [connected, setConnected] = useState(false);
  const [paused, setPaused] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    function connect() {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);
      ws.onclose = () => {
        setConnected(false);
        // Reconnect after 3s
        setTimeout(connect, 3000);
      };
      ws.onerror = () => ws.close();

      ws.onmessage = (msg) => {
        if (pausedRef.current) return;
        try {
          const event: TrafficEvent = JSON.parse(msg.data);
          setEvents((prev) => [event, ...prev].slice(0, 200));
        } catch {
          // ignore malformed messages
        }
      };
    }

    connect();
    return () => wsRef.current?.close();
  }, []);

  return (
    <div>
      {/* Controls */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Circle
            className={`w-3 h-3 ${connected ? "fill-ng-success text-ng-success" : "fill-ng-danger text-ng-danger"}`}
            strokeWidth={0}
          />
          <span className="text-xs font-bold uppercase tracking-widest text-ng-gray-500">
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>

        <button
          onClick={() => setPaused(!paused)}
          className="ng-btn text-xs"
        >
          {paused ? (
            <>
              <Play className="w-4 h-4" /> Resume
            </>
          ) : (
            <>
              <Pause className="w-4 h-4" /> Pause
            </>
          )}
        </button>

        <button
          onClick={() => setEvents([])}
          className="ng-btn text-xs"
        >
          <Trash2 className="w-4 h-4" /> Clear
        </button>

        <span className="text-xs text-ng-gray-400 ml-auto">
          {events.length} events buffered
        </span>
      </div>

      {/* Event Stream */}
      <div className="ng-card p-0 overflow-hidden">
        <table className="ng-table border-0">
          <thead>
            <tr>
              <th className="w-8"></th>
              <th>Model</th>
              <th>Provider</th>
              <th>Status</th>
              <th>In Tokens</th>
              <th>Out Tokens</th>
              <th>Latency</th>
              <th>Policies</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-16 text-ng-gray-400">
                  <Activity className="w-8 h-8 mx-auto mb-3 animate-pulse" />
                  <p className="text-sm font-bold uppercase tracking-widest">
                    Waiting for traffic...
                  </p>
                  <p className="text-xs mt-1">
                    Events will appear here in real-time.
                  </p>
                </td>
              </tr>
            ) : (
              events.map((evt) => (
                <tr key={evt.id}>
                  <td>
                    <Circle
                      className={`w-3 h-3 ${statusColor(evt.status)}`}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </td>
                  <td className="font-bold text-xs uppercase">{evt.model}</td>
                  <td className="text-xs text-ng-gray-600">{evt.provider}</td>
                  <td>
                    <span className={statusBadgeClass(evt.status)}>
                      {evt.status}
                    </span>
                  </td>
                  <td className="font-mono text-sm">
                    {evt.inputTokens.toLocaleString()}
                  </td>
                  <td className="font-mono text-sm">
                    {evt.outputTokens.toLocaleString()}
                  </td>
                  <td className="font-mono text-sm">{evt.latencyMs}ms</td>
                  <td className="text-xs text-ng-gray-500">
                    {evt.policiesTriggered.length > 0
                      ? evt.policiesTriggered.join(", ")
                      : "—"}
                  </td>
                  <td className="text-xs text-ng-gray-400 whitespace-nowrap">
                    {new Date(evt.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
