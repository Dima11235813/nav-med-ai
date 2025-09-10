import { DataSource, DataRecord } from '../types';
import { BaseHarvester } from './BaseHarvester';

/**
 * Harvester for CDC WONDER data
 */
export class CDCHarvester extends BaseHarvester {
  constructor(source: DataSource) {
    super(source);
  }

  protected async fetchData(): Promise<any> {
    // Implementation for CDC WONDER API
    throw new Error('CDC Harvester not yet implemented');
  }

  protected async processRawData(rawData: any): Promise<DataRecord[]> {
    // Implementation for processing CDC data
    throw new Error('CDC Harvester not yet implemented');
  }
}
