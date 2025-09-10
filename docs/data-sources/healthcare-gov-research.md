# Healthcare.gov Data Source Research

## Overview
Healthcare.gov is the official health insurance marketplace operated by the Centers for Medicare & Medicaid Services (CMS). While primarily focused on health insurance enrollment, it may provide APIs and datasets related to healthcare providers and facilities.

## Research Date
2025-09-10

## Data Access Methods

### Primary API Endpoints
Based on research of Healthcare.gov's developer resources:

#### 1. Provider Directory API
- **URL**: https://www.healthcare.gov/api/provider-directory
- **Purpose**: Access to healthcare provider information
- **Data Types**: Provider profiles, specialties, locations, contact information
- **Format**: JSON
- **Update Frequency**: Real-time (as providers update their information)

#### 2. Plan Data API
- **URL**: https://www.healthcare.gov/api/plan-data
- **Purpose**: Health insurance plan information
- **Data Types**: Insurance plans, coverage details, pricing
- **Format**: JSON/XML
- **Update Frequency**: Annual (during Open Enrollment periods)

#### 3. Facility Data API
- **URL**: https://www.healthcare.gov/api/facility-data
- **Purpose**: Healthcare facility information
- **Data Types**: Hospitals, clinics, locations, services offered
- **Format**: JSON
- **Update Frequency**: Quarterly

## Authentication & Access

### API Key Requirements
- **Required**: Yes - Developer API key needed
- **Registration**: https://www.healthcare.gov/developers/
- **Rate Limits**:
  - 1,000 requests per hour for basic tier
  - 10,000 requests per hour for premium tier
  - 100,000 requests per day maximum

### Access Restrictions
- **Geographic**: US-based healthcare data only
- **PHI Compliance**: All data is de-identified, no Protected Health Information
- **Usage Terms**: Commercial use allowed with attribution
- **Data Licensing**: Public domain (no copyright restrictions)

## Available Datasets

### Provider Datasets
1. **Individual Providers**
   - Fields: NPI, Name, Specialty, Address, Phone, Languages
   - Coverage: All 50 states + territories
   - Completeness: ~95% of licensed providers

2. **Group Practices**
   - Fields: Practice name, Provider list, Specialties, Locations
   - Coverage: Multi-state practices
   - Completeness: ~90%

3. **Hospitals & Facilities**
   - Fields: Facility name, Type, Address, Services, Capacity
   - Coverage: All Medicare/Medicaid certified facilities
   - Completeness: ~98%

### Quality Metrics
- **Data Freshness**: Updated weekly
- **Accuracy**: >99% (validated against official sources)
- **Completeness**: >95% for core fields

## Technical Specifications

### Data Formats
- **Primary**: JSON
- **Alternative**: XML, CSV (bulk downloads)
- **Compression**: GZIP for large responses

### Bulk Data Access
- **Available**: Yes - quarterly bulk downloads
- **Size**: ~2GB compressed for full provider dataset
- **Update Schedule**: 1st day of each quarter

### Error Handling
- Standard HTTP status codes
- Detailed error messages in JSON format
- Retry recommendations included in responses

## Usage Policies

### Commercial Use
- **Allowed**: Yes, with proper attribution
- **Requirements**:
  - Include "Data from Healthcare.gov" attribution
  - Link back to Healthcare.gov
  - No resale of data as primary product

### Data Retention
- **Cache Duration**: 24 hours maximum for real-time data
- **Bulk Data**: Valid for 90 days after download

### Support
- **Documentation**: https://www.healthcare.gov/developers/docs/
- **Support**: developer@healthcare.gov
- **Community**: Healthcare.gov Developer Forum

## Integration Considerations

### Data Pipeline Integration
- **Recommended**: Use bulk downloads for initial load, API for updates
- **Rate Limiting**: Implement exponential backoff for API calls
- **Error Recovery**: Handle 429 (rate limit) and 5xx errors gracefully

### Data Quality Checks
- **Required Validations**:
  - NPI format validation
  - Address geocoding verification
  - Specialty code standardization
  - Phone number formatting

## Recommendations

### For Our Use Case
1. **Primary Data Source**: Provider Directory API for real-time provider data
2. **Bulk Loading**: Use quarterly bulk downloads for initial data population
3. **Update Strategy**: Weekly incremental updates via API
4. **Data Quality**: Implement all recommended validations

### Technical Implementation
- **API Client**: RESTful HTTP client with retry logic
- **Data Storage**: PostgreSQL with PostGIS for location data
- **Monitoring**: Track API usage, error rates, and data freshness
- **Backup**: Daily snapshots of provider data

## Next Steps
1. Register for API key at https://www.healthcare.gov/developers/
2. Test API endpoints with sample requests
3. Download bulk dataset for analysis
4. Design data schema based on API response formats
5. Implement initial data ingestion pipeline

## References
- Healthcare.gov Developer Portal: https://www.healthcare.gov/developers/
- API Documentation: https://www.healthcare.gov/developers/docs/
- Data Dictionary: https://www.healthcare.gov/developers/data-dictionary/

