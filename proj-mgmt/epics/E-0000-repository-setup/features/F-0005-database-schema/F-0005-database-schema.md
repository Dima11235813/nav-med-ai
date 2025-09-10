---
id: F-0005
epic: E-0000
title: Database Schema & Initial Seeding
status: planned
owners: [Backend, Data]
acceptance_criteria:
  - "PostgreSQL/PostGIS database schema designed and implemented"
  - "Initial data seeding pipeline operational for test zip codes"
  - "Geospatial queries optimized for location-based search"
  - "Database performance benchmarks meeting requirements"
links: []
---

## Feature Overview

This feature designs and implements the database schema for storing healthcare provider and facility data, with initial data seeding capabilities for testing and development. It establishes the data foundation that will support the entire platform's search and navigation functionality.

## User Stories

### Story 1: Database Schema Design
**Priority:** P0
**Estimate:** 4 days
**Description:** Design PostgreSQL/PostGIS schema for provider and facility data with proper indexing.

### Story 2: Database Migration System
**Priority:** P0
**Estimate:** 2 days
**Description:** Implement database migration scripts and version control for schema changes.

### Story 3: Initial Data Seeding Pipeline
**Priority:** P0
**Estimate:** 3 days
**Description:** Create data seeding pipeline for initial zip code data (starting with 60613).

### Story 4: Performance Optimization
**Priority:** P0
**Estimate:** 2 days
**Description:** Optimize database queries and indexes for search performance.

## Technical Requirements

### Database Schema Design

#### Core Tables
```sql
-- Healthcare Providers
CREATE TABLE providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    npi VARCHAR(10) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(255) GENERATED ALWAYS AS (
        CASE
            WHEN first_name IS NOT NULL AND last_name IS NOT NULL
            THEN first_name || ' ' || last_name
            ELSE COALESCE(first_name, last_name, '')
        END
    ) STORED,
    credentials TEXT[],
    specialties TEXT[],
    languages TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Healthcare Facilities
CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    facility_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    facility_type VARCHAR(100),
    ownership_type VARCHAR(100),
    beds INTEGER,
    phone VARCHAR(20),
    website VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Addresses with Geospatial Support
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    geolocation GEOGRAPHY(POINT, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Provider-Address Relationships
CREATE TABLE provider_addresses (
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    address_id UUID REFERENCES addresses(id) ON DELETE CASCADE,
    address_type VARCHAR(50) DEFAULT 'primary',
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (provider_id, address_id)
);

-- Facility-Address Relationships
CREATE TABLE facility_addresses (
    facility_id UUID REFERENCES facilities(id) ON DELETE CASCADE,
    address_id UUID REFERENCES addresses(id) ON DELETE CASCADE,
    address_type VARCHAR(50) DEFAULT 'primary',
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (facility_id, address_id)
);
```

### Geospatial Features
- **PostGIS extension** for geographic data support
- **Spatial indexes** for location-based queries
- **Geocoding integration** for address-to-coordinates conversion
- **Distance calculations** for proximity searches

### Indexing Strategy
- **GIN indexes** for array fields (specialties, languages)
- **GiST indexes** for geospatial queries
- **Partial indexes** for active records
- **Composite indexes** for common query patterns

### Initial Data Seeding

#### Target Zip Codes
- **Primary:** 60613 (Chicago, IL - diverse urban area)
- **Future expansion:** Additional zip codes based on population density and healthcare access

#### Seeding Process
1. **Data Source Selection:** Use Healthdata.gov NPPES data as primary source
2. **Geographic Filtering:** Extract providers within target zip code boundaries
3. **Data Validation:** Ensure data quality meets >95% completeness threshold
4. **Relationship Building:** Link providers to facilities and addresses
5. **Geocoding:** Convert addresses to latitude/longitude coordinates

### Performance Requirements
- **Search Response Time:** <500ms for basic provider searches
- **Geospatial Queries:** <200ms for location-based filtering
- **Data Loading:** Support for 100k+ records in initial seeding
- **Concurrent Users:** Handle 100+ simultaneous search requests

## Dependencies

- **F-0000:** Monorepo infrastructure must be established
- **F-0004:** Data pipeline package structure should be available
- **S-0002:** Data source research must be completed (already done)

## Success Criteria

- [ ] PostgreSQL/PostGIS database schema implemented
- [ ] Database migration scripts operational
- [ ] Initial data seeding working for zip code 60613
- [ ] Geospatial queries returning accurate results
- [ ] Search performance meeting <500ms requirement
- [ ] Data integrity constraints properly implemented
- [ ] Database backup and restore procedures documented

## Data Volume Estimates

- **Zip Code 60613:** ~500-1,000 healthcare providers
- **Facility Coverage:** ~50-100 healthcare facilities
- **Data Freshness:** Updated weekly via automated pipeline
- **Growth Projection:** Scale to support 10,000+ zip codes

## Monitoring & Maintenance

- **Query Performance:** Monitor slow queries and optimize
- **Data Quality:** Regular validation of seeded data
- **Index Maintenance:** Automated reindexing for performance
- **Backup Strategy:** Daily backups with point-in-time recovery
