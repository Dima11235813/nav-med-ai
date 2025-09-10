import { StorageResult, StorageOptions } from '../types';
import { BaseStorage } from './BaseStorage';

/**
 * Database storage implementation
 */
export class DatabaseStorage<T = any> extends BaseStorage<T> {
  protected async storeData(data: T[]): Promise<StorageResult> {
    // Implementation for database storage
    throw new Error('DatabaseStorage not yet implemented');
  }
}
