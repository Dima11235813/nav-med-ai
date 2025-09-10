---
id: S-0023
feature: F-0003
title: Fix Swagger API Documentation Schemas
priority: P1
estimate: 3
status: completed
qa_owner: Backend-QA
links: [S-0014]
---

### User Story
As a developer, I want complete and accurate Swagger API documentation so that API consumers can understand and integrate with the healthcare navigation API without encountering schema resolution errors.

### Acceptance Criteria
- Given the API, when I visit /api → all schemas resolve without errors
- Provider schema and related schemas properly defined
- Search endpoints return properly typed responses
- Config endpoints have complete documentation
- No more "Could not resolve reference" errors
- All response examples include proper data structures

### Negative Cases
- Missing schema references → build should fail with clear error
- Inconsistent schema definitions → validation warnings
- Undocumented properties → schema completeness checks

### Test Cases
- integration: schema validation passes
- e2e: API documentation loads without errors
- validation: all endpoints have complete schemas

### Implementation Notes
- Create Swagger schemas for Provider and related types
- Update main.ts to include custom schema definitions
- Add @ApiExtraModels decorators where needed
- Test schema generation and validation
- Ensure all endpoints have proper response schemas

### Files to Create/Modify
- `apps/api/src/main.ts` - Add custom schema definitions
- `apps/api/src/modules/search/search.controller.ts` - Fix Provider reference
- `apps/api/src/modules/providers/providers.controller.ts` - Add Provider schema
- `apps/api/src/modules/config/config.controller.ts` - Add config schemas
- `apps/api/src/config/swagger-schemas.ts` - New file for schema definitions

### Current Error
```
Resolver error at paths./search/providers.get.responses.200.content.application/json.schema.properties.data.items.$ref
Could not resolve reference: Could not resolve pointer: /components/schemas/Provider does not exist in document
```
