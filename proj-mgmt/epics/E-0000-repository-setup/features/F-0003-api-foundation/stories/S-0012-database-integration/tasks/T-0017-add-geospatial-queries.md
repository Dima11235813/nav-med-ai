---
id: T-0017
story: S-0012
title: Add geospatial query support and testing
type: backend
status: planned
definition_of_done:
  - PostGIS geospatial queries implemented
  - Distance-based provider search functionality
  - Location-based filtering and sorting
  - Performance optimized geospatial indexes
  - Comprehensive test coverage for database operations
---

### Implementation Notes
- Implement PostGIS functions for distance calculations
- Create repository methods for geospatial queries
- Add spatial indexes for query performance
- Implement location-based search services
- Write unit and integration tests for database operations

### Files to Create/Modify
- `apps/api/src/database/repositories/provider.repository.ts` - Geospatial queries
- `apps/api/src/services/provider-search.service.ts` - Search business logic
- `apps/api/test/database/` - Database test files
- `apps/api/src/database/entities/provider.entity.ts` - Add geospatial methods
