---
id: T-0013
story: S-0012
title: Configure database connection and PostGIS setup
type: backend
status: completed
definition_of_done:
  - TypeORM installed and configured with PostgreSQL driver
  - PostGIS extension enabled in database
  - Database connection established on API startup
  - Environment-based configuration for database credentials
---

### Implementation Notes
- Install TypeORM and PostgreSQL driver dependencies
- Configure TypeORM module in NestJS app
- Set up database configuration with environment variables
- Enable PostGIS extension for geospatial capabilities
- Implement basic health check for database connectivity

### Files to Create/Modify
- `apps/api/package.json` - Add TypeORM and database dependencies
- `apps/api/src/database/database.config.ts` - Database configuration
- `apps/api/src/database/database.module.ts` - Database module setup
- `apps/api/src/app.module.ts` - Import database module
