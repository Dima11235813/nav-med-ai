import { DataSource, DataRecord } from '../types';
import { BaseHarvester } from './BaseHarvester';

/**
 * Harvester for healthdata.gov API data
 */
export class HealthdataGovHarvester extends BaseHarvester {
  constructor(source: DataSource) {
    super(source);
  }

  protected async fetchData(): Promise<any> {
    // Implementation for healthdata.gov API
    throw new Error('Healthdata.gov Harvester not yet implemented');
  }

  protected async processRawData(rawData: any): Promise<DataRecord[]> {
    // Implementation for processing healthdata.gov data
    throw new Error('Healthdata.gov Harvester not yet implemented');
  }
}
