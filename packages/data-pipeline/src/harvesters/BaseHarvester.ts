import { DataSource, DataRecord, ProcessingResult } from '../types';

/**
 * Base class for data harvesters
 * Provides common functionality for fetching data from various sources
 */
export abstract class BaseHarvester {
  protected source: DataSource;

  constructor(source: DataSource) {
    this.source = source;
  }

  /**
   * Harvest data from the configured source
   */
  async harvest(): Promise<ProcessingResult<DataRecord[]>> {
    const startTime = Date.now();

    try {
      // Validate source configuration
      await this.validateSource();

      // Fetch data
      const rawData = await this.fetchData();

      // Process raw data into records
      const records = await this.processRawData(rawData);

      const processingTime = Date.now() - startTime;

      return {
        success: true,
        data: records,
        errors: [],
        warnings: [],
        metadata: {
          processingTime,
          recordsProcessed: records.length,
          recordsFailed: 0,
        },
      };
    } catch (error) {
      const processingTime = Date.now() - startTime;

      return {
        success: false,
        errors: [error instanceof Error ? error.message : 'Unknown error occurred'],
        warnings: [],
        metadata: {
          processingTime,
          recordsProcessed: 0,
          recordsFailed: 1,
        },
      };
    }
  }

  /**
   * Validate that the data source is properly configured
   */
  protected async validateSource(): Promise<void> {
    if (!this.source.url && this.source.type !== 'file') {
      throw new Error('Data source URL is required for non-file sources');
    }

    if (!this.source.isActive) {
      throw new Error('Data source is not active');
    }
  }

  /**
   * Fetch raw data from the source
   * Must be implemented by concrete harvesters
   */
  protected abstract fetchData(): Promise<any>;

  /**
   * Process raw data into standardized DataRecord objects
   * Must be implemented by concrete harvesters
   */
  protected abstract processRawData(rawData: any): Promise<DataRecord[]>;

  /**
   * Apply rate limiting if configured
   */
  protected async applyRateLimit(): Promise<void> {
    if (this.source.rateLimit) {
      const { requests, period } = this.source.rateLimit;
      const delay = period / requests;

      // Simple rate limiting - in production, use a more sophisticated approach
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  /**
   * Handle authentication for the data source
   */
  protected getAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {};

    if (this.source.auth) {
      switch (this.source.auth.type) {
        case 'bearer':
          if (this.source.auth.token) {
            headers['Authorization'] = `Bearer ${this.source.auth.token}`;
          }
          break;
        case 'basic':
          if (this.source.auth.username && this.source.auth.password) {
            const credentials = btoa(`${this.source.auth.username}:${this.source.auth.password}`);
            headers['Authorization'] = `Basic ${credentials}`;
          }
          break;
        case 'api_key':
          if (this.source.auth.token) {
            headers['X-API-Key'] = this.source.auth.token;
          }
          break;
      }
    }

    return headers;
  }

  /**
   * Get the current timestamp in ISO format
   */
  protected getCurrentTimestamp(): string {
    return new Date().toISOString();
  }
}
