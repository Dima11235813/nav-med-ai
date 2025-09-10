import { RawProviderData, ProcessedProviderData, TransformContext } from '../types';
import { BaseTransformer } from './BaseTransformer';

/**
 * Transformer for provider data
 */
export class ProviderTransformer extends BaseTransformer<RawProviderData, ProcessedProviderData> {
  protected async process(input: RawProviderData): Promise<ProcessedProviderData> {
    // Implementation for transforming raw provider data
    throw new Error('ProviderTransformer not yet implemented');
  }
}
