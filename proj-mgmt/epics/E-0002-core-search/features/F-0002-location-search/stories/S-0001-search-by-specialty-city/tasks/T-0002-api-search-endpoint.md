---
id: T-0002
story: S-0001
title: API: /api/search/providers endpoint
type: backend
status: ready
definition_of_done:
  - AC satisfied; unit tests + integration tests pass
  - Rate-limited (429) with Retry-After header
  - OpenAPI spec updated and validated
  - Structured logging with correlation IDs
---

### Implementation Notes
- Express.js route with input validation
- Database query optimization
- Geocoding service integration (stub for MVP)
- Response caching strategy

### Technical Details
- Query params: specialty, city, limit, offset
- Response format: JSON with provider array
- Error handling: 400, 404, 429, 500 status codes
