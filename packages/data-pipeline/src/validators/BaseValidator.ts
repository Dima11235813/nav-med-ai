import { ValidationResult } from '../types';

/**
 * Base class for data validators
 */
export abstract class BaseValidator<T = any> {
  async validate(data: T): Promise<ValidationResult> {
    try {
      const result = await this.validateData(data);
      return result;
    } catch (error) {
      return {
        isValid: false,
        errors: [{
          field: 'general',
          code: 'VALIDATION_ERROR',
          message: error instanceof Error ? error.message : 'Validation failed',
        }],
        warnings: [],
      };
    }
  }

  protected abstract validateData(data: T): Promise<ValidationResult>;
}
