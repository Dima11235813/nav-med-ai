---
id: T-0014
story: S-0012
title: Create TypeORM entities for provider data
type: backend
status: completed
definition_of_done:
  - Provider entity with geospatial location fields
  - Specialty and practice information entities
  - Proper relationships between entities
  - Indexes configured for performance
  - Entity validation rules implemented
  - Shared domain types imported from packages/types
  - Entity naming uses Entity suffix (not DTO)
  - PostGIS geometry types for geospatial data
---

### Implementation Notes
- Import domain types from packages/types for shared contracts
- Use Entity suffix for database entities (not DTO)
- Design entity schema based on healthcare provider data structure
- Use PostGIS geometry types for location data
- Implement entity relationships (one-to-many, many-to-many)
- Add database indexes for common query patterns
- Configure entity validation using class-validator
- Ensure frontend can use same domain types for wire format

### Files to Create/Modify
- `apps/api/src/database/entities/provider.entity.ts` - Main provider entity
- `apps/api/src/database/entities/specialty.entity.ts` - Medical specialty entity
- `apps/api/src/database/entities/practice.entity.ts` - Practice information entity
- `apps/api/src/database/entities/credential.entity.ts` - Provider credentials entity
- `apps/api/src/database/entities/review.entity.ts` - Provider reviews entity
- `apps/api/src/database/entities/index.ts` - Entity exports
