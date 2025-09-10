import { StorageResult, StorageOptions } from '../types';

/**
 * Base class for data storage
 */
export abstract class BaseStorage<T = any> {
  protected options: StorageOptions;

  constructor(options: StorageOptions = {}) {
    this.options = options;
  }

  async store(data: T[]): Promise<StorageResult> {
    try {
      const result = await this.storeData(data);
      return result;
    } catch (error) {
      return {
        success: false,
        inserted: 0,
        updated: 0,
        failed: data.length,
        errors: [error instanceof Error ? error.message : 'Storage failed'],
      };
    }
  }

  protected abstract storeData(data: T[]): Promise<StorageResult>;
}
