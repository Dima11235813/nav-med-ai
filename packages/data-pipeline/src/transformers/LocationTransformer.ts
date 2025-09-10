import { TransformContext } from '../types';
import { BaseTransformer } from './BaseTransformer';

/**
 * Transformer for location/geocoding data
 */
export class LocationTransformer extends BaseTransformer<any, any> {
  protected async process(input: any): Promise<any> {
    // Implementation for transforming location data
    throw new Error('LocationTransformer not yet implemented');
  }
}
