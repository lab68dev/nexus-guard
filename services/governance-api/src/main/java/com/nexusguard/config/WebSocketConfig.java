package com.nexusguard.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * WebSocket configuration for live traffic streaming.
 */
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final TrafficWebSocketHandler trafficHandler;

    public WebSocketConfig(TrafficWebSocketHandler trafficHandler) {
        this.trafficHandler = trafficHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry
            .addHandler(trafficHandler, "/ws/traffic")
            .setAllowedOrigins("*");
    }
}
