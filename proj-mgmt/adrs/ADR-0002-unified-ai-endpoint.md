---
id: ADR-0002
title: Unified AI Service Endpoint
status: accepted
decided: 2025-09-10
---

## Context

The application requires AI-powered search ranking and provider matching capabilities. We need to decide how to integrate AI services while maintaining performance, cost control, and compliance.

## Decision

Implement a unified AI service endpoint that:
- Centralizes all AI interactions through a single service
- Uses prompt versioning and evaluation frameworks
- Includes comprehensive logging and monitoring
- Supports A/B testing of different models and prompts

## Considered Options

### Option 1: Direct API Calls from Frontend
- **Pros**: Simple implementation
- **Cons**: API key exposure, hard to monitor usage, difficult to A/B test

### Option 2: Backend AI Service (Chosen)
- **Pros**: Secure, monitorable, testable
- **Cons**: Additional service complexity

### Option 3: Third-party AI Platform
- **Pros**: Managed service, scalability
- **Cons**: Vendor lock-in, cost unpredictability

## Consequences

- **Positive**: Better security, comprehensive monitoring, easier testing
- **Negative**: Additional infrastructure complexity
- **Risk**: Service becomes bottleneck if not designed for scale

## Implementation

```typescript
// AI Service Interface
interface AIService {
  rankProviders(query: SearchQuery, candidates: Provider[]): RankedResult[]
  evaluateRelevance(query: string, result: Provider): RelevanceScore
}
```

## Metrics

- Response time < 200ms for ranking requests
- 99.9% uptime for AI service
- Cost per request < $0.01
