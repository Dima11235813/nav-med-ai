import { ProcessedProviderData, ValidationResult } from '../types';
import { BaseValidator } from './BaseValidator';

/**
 * Validator for provider data
 */
export class ProviderValidator extends BaseValidator<ProcessedProviderData> {
  protected async validateData(data: ProcessedProviderData): Promise<ValidationResult> {
    // Implementation for validating provider data
    throw new Error('ProviderValidator not yet implemented');
  }
}
