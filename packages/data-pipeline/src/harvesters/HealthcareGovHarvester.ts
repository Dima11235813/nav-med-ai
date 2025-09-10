import { DataSource, DataRecord } from '../types';
import { BaseHarvester } from './BaseHarvester';

/**
 * Harvester for healthcare.gov API data
 */
export class HealthcareGovHarvester extends BaseHarvester {
  constructor(source: DataSource) {
    super(source);
  }

  protected async fetchData(): Promise<any> {
    if (!this.source.url) {
      throw new Error('Healthcare.gov API URL is required');
    }

    // Apply rate limiting
    await this.applyRateLimit();

    const headers = {
      ...this.getAuthHeaders(),
      'Accept': 'application/json',
      'User-Agent': 'Nav-Med-AI-Data-Pipeline/1.0',
    };

    try {
      const response = await fetch(this.source.url, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch from healthcare.gov: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  protected async processRawData(rawData: any): Promise<DataRecord[]> {
    const records: DataRecord[] = [];

    try {
      // Healthcare.gov typically returns data in various formats
      // This is a simplified example - real implementation would handle specific API responses
      const items = Array.isArray(rawData) ? rawData : rawData.data || rawData.results || [rawData];

      for (const item of items) {
        const record: DataRecord = {
          id: this.generateRecordId(),
          sourceId: this.source.id,
          rawData: item,
          metadata: {
            fetchedAt: this.getCurrentTimestamp(),
            contentType: 'application/json',
            size: JSON.stringify(item).length,
            checksum: this.generateChecksum(item),
          },
          processed: false,
          processingAttempts: 0,
          createdAt: this.getCurrentTimestamp(),
          updatedAt: this.getCurrentTimestamp(),
        };

        records.push(record);
      }

      return records;
    } catch (error) {
      throw new Error(`Failed to process healthcare.gov data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private generateRecordId(): string {
    // Generate a unique ID for the record
    return `healthcare_gov_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateChecksum(data: any): string {
    // Simple checksum generation - in production, use a proper hashing algorithm
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }
}
