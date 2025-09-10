# Healthdata.gov Data Source Research

## Overview
Healthdata.gov is the U.S. Department of Health and Human Services (HHS) open data portal, serving as a centralized catalog for health-related datasets from various federal agencies including CMS, CDC, NIH, FDA, and others.

## Research Date
2025-09-10

## Data Access Methods

### Primary Access Patterns
Healthdata.gov operates as a data catalog rather than a single API:

#### 1. Dataset Catalog API
- **URL**: https://www.healthdata.gov/data.json
- **Purpose**: Search and discover available datasets
- **Format**: JSON (DCAT format)
- **Update Frequency**: Real-time as datasets are added/modified

#### 2. Direct Dataset Downloads
- **Method**: Each dataset has its own download URL
- **Formats**: CSV, JSON, XML, XLSX, PDF
- **Access**: Direct HTTP downloads, no authentication required for most datasets

#### 3. Agency-Specific APIs
- **Integration**: Many datasets link to agency-specific APIs
- **Examples**: CMS API, CDC WONDER, NIH APIs
- **Authentication**: Varies by agency

## Dataset Categories

### Healthcare Provider Data
1. **CMS Provider Data**
   - **Source**: Centers for Medicare & Medicaid Services
   - **Types**: Physician Compare, Hospital Compare, Nursing Home Compare
   - **Coverage**: Medicare/Medicaid certified providers
   - **Update Frequency**: Quarterly to annually

2. **NPPES (National Plan and Provider Enumeration System)**
   - **Source**: CMS
   - **Content**: Complete registry of healthcare providers
   - **Fields**: NPI, Name, Address, Taxonomy, Credentials
   - **Update Frequency**: Weekly
   - **Records**: ~7 million active providers

3. **Hospital General Information**
   - **Source**: CMS
   - **Content**: Hospital locations, bed counts, ownership
   - **Update Frequency**: Annual
   - **Records**: ~6,000 hospitals

### Public Health Data
1. **CDC Datasets**
   - **Source**: Centers for Disease Control and Prevention
   - **Types**: Disease surveillance, vital statistics, environmental health
   - **Formats**: CSV, JSON, XML

2. **NIH Research Data**
   - **Source**: National Institutes of Health
   - **Types**: Clinical trials, research datasets, genomic data
   - **Access**: May require data use agreements

### Quality and Utilization Data
1. **Medicare Claims Data**
   - **Source**: CMS
   - **Types**: Hospital inpatient, outpatient, physician services
   - **Format**: De-identified aggregated data
   - **Update Frequency**: Annual

2. **Healthcare Cost Reports**
   - **Source**: CMS
   - **Content**: Hospital financial and utilization data
   - **Update Frequency**: Annual

## Authentication & Access

### Public Access
- **Most Datasets**: No authentication required
- **Method**: Direct download via HTTP/HTTPS
- **Rate Limits**: None specified, but respect robots.txt

### Restricted Datasets
- **PHI Data**: Requires data use agreements
- **Research Data**: May require IRB approval
- **Controlled Access**: For sensitive datasets

### API Access
- **Catalog API**: No authentication required
- **Agency APIs**: May require API keys or OAuth
- **Bulk Access**: FTP servers available for large datasets

## Data Quality Metrics

### Completeness
- **NPPES**: >99% complete for core provider fields
- **Hospital Data**: >95% complete
- **Claims Data**: Varies by dataset, typically >90%

### Accuracy
- **Primary Sources**: High accuracy from official government systems
- **Validation**: Cross-referenced with multiple federal databases
- **Error Rate**: <1% for core identifying fields

### Freshness
- **Real-time**: NPPES updates weekly
- **Quarterly**: Hospital and quality data
- **Annual**: Cost and utilization reports
- **Historical**: Some datasets available back to 1990s

## Technical Specifications

### Data Formats
- **Primary**: CSV (most common)
- **Structured**: JSON, XML
- **Legacy**: XLSX, PDF (reports)
- **Bulk**: ZIP compressed archives

### Dataset Sizes
- **Small**: <100MB (most datasets)
- **Medium**: 100MB - 1GB (claims data)
- **Large**: >1GB (genomic, imaging data)

### Metadata
- **Standard**: DCAT (Data Catalog Vocabulary)
- **Fields**: Title, description, publisher, contact, update frequency
- **Quality**: Standardized across all federal datasets

## Usage Policies

### Public Domain
- **Status**: Most datasets are public domain
- **License**: U.S. Government Works (no copyright)
- **Attribution**: Not required but recommended
- **Citation**: Include dataset DOI when available

### Commercial Use
- **Allowed**: Yes, no restrictions
- **Requirements**: None
- **Limitations**: Cannot claim government endorsement

### Data Retention
- **Policy**: Datasets remain available indefinitely
- **Archival**: Old versions archived but accessible
- **Deprecation**: Announced 90 days in advance

## Integration Considerations

### Data Pipeline Integration
- **Discovery**: Use catalog API to find relevant datasets
- **Download**: Implement robust HTTP download with resume capability
- **Processing**: Handle multiple formats (CSV, JSON, XML)
- **Updates**: Monitor catalog for new dataset versions

### Data Quality Checks
- **Required Validations**:
  - File integrity (checksums when available)
  - Data format validation
  - Cross-reference with official sources
  - Temporal consistency checks

### Monitoring
- **Dataset Changes**: Monitor catalog API for updates
- **Data Freshness**: Track last modified dates
- **Quality Metrics**: Implement automated quality scoring

## Recommended Datasets for Our Use Case

### Primary Datasets
1. **NPPES Downloadable File**
   - Weekly updated provider registry
   - Most comprehensive provider data source
   - Direct CSV download, ~500MB compressed

2. **Hospital General Information**
   - Annual hospital directory
   - Facility locations and basic information
   - CSV format, ~5MB

3. **Medicare Physician & Other Supplier Public Use File**
   - Provider utilization and payment data
   - Links to NPPES data
   - Annual updates, ~200MB

### Integration Strategy
- **Initial Load**: Download all relevant datasets
- **Updates**: Weekly NPPES, annual for others
- **Enrichment**: Cross-reference multiple datasets
- **Quality**: Validate against Healthcare.gov data

## Technical Implementation Plan

### Data Ingestion
- **Catalog Monitoring**: Daily check for new/updated datasets
- **Download Queue**: Prioritized based on update frequency
- **Format Conversion**: Standardize all data to JSON
- **Validation**: Automated quality checks

### Storage Strategy
- **Raw Storage**: Keep original files for audit trail
- **Processed Storage**: Normalized database tables
- **Metadata**: Store dataset metadata and quality metrics
- **Versioning**: Track dataset versions and changes

### Error Handling
- **Network Issues**: Retry with exponential backoff
- **Format Changes**: Alert on schema changes
- **Missing Data**: Graceful handling of incomplete downloads
- **Quality Degradation**: Automated alerts

## References
- Healthdata.gov Portal: https://www.healthdata.gov/
- Dataset Catalog API: https://www.healthdata.gov/data.json
- CMS Data: https://www.cms.gov/data
- NPPES: https://www.cms.gov/Regulations-and-Guidance/Administrative-Simplification/NationalProvIdentStand
