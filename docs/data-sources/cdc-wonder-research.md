# CDC WONDER Data Source Research

## Overview
CDC WONDER (Wide-ranging Online Data for Epidemiologic Research) is an online query system developed by the Centers for Disease Control and Prevention (CDC) that provides access to public health data for epidemiologic research.

## Research Date
2025-09-10

## System Description

### Primary Function
CDC WONDER serves as a web-based query interface for various public health databases, allowing users to:
- Query multiple databases simultaneously
- Create custom tables and charts
- Export data in various formats
- Save and share query results

### Data Types
While primarily focused on public health statistics, WONDER includes databases that may contain healthcare provider and facility related data:
- Vital statistics (births, deaths)
- Disease surveillance data
- Healthcare utilization statistics
- Population health indicators

## Access Methods

### Web Interface
- **URL**: https://wonder.cdc.gov/
- **Method**: Browser-based query system
- **Authentication**: None required for public data
- **Cost**: Free

### Data Export Options
- **Formats**: Text, CSV, XML
- **Methods**:
  - Direct download from query results
  - Email delivery for large datasets
  - API-like access through URL parameters

### Advanced Features
- **Query Builder**: GUI for building complex queries
- **Saved Queries**: Ability to save and reuse queries
- **Data Subsetting**: Filter by geography, time, demographics
- **Statistical Functions**: Built-in calculations and aggregations

## Available Databases

### Relevant Healthcare Databases

#### 1. National Vital Statistics System (NVSS)
- **Content**: Birth and death records with healthcare facility information
- **Coverage**: All U.S. births and deaths
- **Update Frequency**: Monthly (with 6-12 month lag)
- **Provider Data**: Includes facility where birth/death occurred
- **Records**: ~4 million births, ~3 million deaths annually

#### 2. National Hospital Care Survey (NHCS)
- **Content**: Hospital utilization and patient characteristics
- **Coverage**: Sample of U.S. hospital visits
- **Update Frequency**: Annual
- **Provider Data**: Hospital characteristics, services offered
- **Records**: ~35,000 hospital visits sampled annually

#### 3. National Ambulatory Medical Care Survey (NAMCS)
- **Content**: Ambulatory care visits to physician offices
- **Coverage**: Sample of U.S. physician office visits
- **Update Frequency**: Annual
- **Provider Data**: Physician specialty, practice characteristics
- **Records**: ~25,000 office visits sampled annually

#### 4. National Hospital Ambulatory Medical Care Survey (NHAMCS)
- **Content**: Emergency department and outpatient visits
- **Coverage**: Sample of U.S. hospital-based ambulatory care
- **Update Frequency**: Annual
- **Provider Data**: Hospital type, emergency department characteristics

### Data Quality Considerations

#### Completeness
- **NVSS**: >99% complete for core vital events
- **Survey Data**: ~90-95% response rates
- **Geographic Coverage**: All 50 states + DC

#### Accuracy
- **Source**: Primary data collection from healthcare facilities
- **Validation**: Cross-validated with multiple sources
- **Error Rate**: <2% for key variables

#### Statistical Reliability
- **Survey Data**: May have sampling errors
- **Suppression**: Small cell sizes suppressed for confidentiality
- **Confidence Intervals**: Provided for estimates

## Technical Specifications

### Query Interface
- **Parameters**: Extensive filtering options
- **Output**: Tabular results with statistics
- **Limits**: 1,000 rows per query (can be paginated)
- **Timeout**: 10-minute query timeout

### Export Capabilities
- **Formats**:
  - Tab-delimited text
  - CSV
  - XML
- **Delivery**: Direct download or email
- **Size Limits**: Up to 10MB per export

### API-like Access
While not a full REST API, WONDER supports URL-based queries:
```
https://wonder.cdc.gov/controller/datarequest/[database];jsessionid=[session]
```
This allows for programmatic access with limitations.

## Usage Policies

### Public Access
- **Availability**: 24/7 access
- **Restrictions**: None for public health data
- **Registration**: Not required

### Data Use Agreement
- **Required**: For certain restricted datasets
- **PHI Protection**: All data is aggregated/de-identified
- **Purpose**: Research and public health use only

### Citation Requirements
- **Required**: Cite CDC WONDER in publications
- **Format**: "Centers for Disease Control and Prevention, National Center for Health Statistics. [Database]."
- **DOI**: Include when available

## Integration Considerations

### Data Pipeline Integration
- **Automated Access**: Limited - primarily manual query interface
- **Batch Processing**: Possible through URL parameterization
- **Frequency**: Monthly updates for most databases
- **Caching**: Results can be cached for performance

### Data Quality Checks
- **Validation**: Compare against known totals
- **Consistency**: Check for temporal consistency
- **Outliers**: Identify statistical anomalies

### Monitoring
- **Update Tracking**: Monitor for new data releases
- **Quality Metrics**: Track data completeness over time
- **Alert System**: Notify when data updates are available

## Limitations for Provider Data

### Primary Limitations
1. **Aggregated Data**: Most data is statistical aggregates, not individual provider records
2. **Sampling**: Survey data represents samples, not complete populations
3. **Lag Time**: 6-12 month lag for vital statistics
4. **Geographic Level**: Data often aggregated to county/state level

### Provider-Specific Data
- **Direct Provider Data**: Limited - mostly facility characteristics
- **Provider Counts**: Available by specialty and geography
- **Quality Metrics**: Some provider-level quality indicators
- **Utilization Patterns**: Provider service patterns and volumes

## Recommended Use Cases

### Complementary Data Sources
CDC WONDER is best used as a **complementary** data source rather than primary:

1. **Provider Counts by Specialty/Region**
   - Use NAMCS data for physician specialty distributions
   - Geographic analysis of healthcare workforce

2. **Healthcare Utilization Patterns**
   - Hospital admission rates by facility type
   - Emergency department utilization patterns

3. **Quality Indicators**
   - Hospital quality measures (limited provider-level data)
   - Population health outcomes by region

### Integration Strategy
- **Primary Sources**: Healthcare.gov and Healthdata.gov for direct provider data
- **WONDER Role**: Statistical validation and geographic analysis
- **Update Frequency**: Monthly checks for new releases
- **Data Storage**: Aggregate statistics, not individual records

## Technical Implementation

### Data Collection
- **Manual Queries**: For initial data collection
- **Automated Scripts**: Python with Selenium for web scraping (with permission)
- **API Integration**: Limited URL-based access where available
- **Batch Processing**: Monthly automated data pulls

### Data Processing
- **Format Conversion**: Standardize exports to CSV/JSON
- **Aggregation**: Maintain statistical aggregations
- **Validation**: Cross-reference with primary data sources
- **Storage**: Time-series database for trend analysis

### Monitoring & Alerts
- **New Releases**: Monitor CDC announcements
- **Data Updates**: Track version changes
- **Quality Checks**: Automated statistical validation
- **Anomaly Detection**: Identify unexpected changes

## Comparison with Other Sources

| Feature | CDC WONDER | Healthcare.gov | Healthdata.gov |
|---------|------------|----------------|----------------|
| Provider Records | Statistical | Direct | Direct |
| Update Frequency | Monthly | Weekly | Weekly |
| Geographic Detail | County/State | Address | Address |
| PHI Risk | None | None | None |
| API Access | Limited | Full API | Catalog |
| Commercial Use | Allowed | Allowed | Allowed |
| Primary Use | Statistics | Direct Search | Bulk Download |

## Conclusion

### Role in Data Pipeline
CDC WONDER provides valuable **statistical context** and **validation data** but is not suitable as a primary source for individual provider records due to its aggregated nature and limited direct provider data.

### Recommended Integration
1. **Statistical Validation**: Use WONDER data to validate completeness of primary sources
2. **Geographic Analysis**: Provider distribution analysis by region
3. **Trend Analysis**: Healthcare utilization trends over time
4. **Quality Assurance**: Statistical quality checks on pipeline output

## References
- CDC WONDER: https://wonder.cdc.gov/
- CDC WONDER Documentation: https://wonder.cdc.gov/wonder/help/WONDER-Help.html
- National Vital Statistics System: https://www.cdc.gov/nchs/nvss/index.htm
- National Hospital Care Survey: https://www.cdc.gov/nchs/nhcs/index.htm
