import { StorageResult, StorageOptions } from '../types';
import { BaseStorage } from './BaseStorage';

/**
 * File storage implementation
 */
export class FileStorage<T = any> extends BaseStorage<T> {
  protected async storeData(data: T[]): Promise<StorageResult> {
    // Implementation for file storage
    throw new Error('FileStorage not yet implemented');
  }
}
