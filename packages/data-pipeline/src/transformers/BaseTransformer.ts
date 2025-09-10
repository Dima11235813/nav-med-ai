import { TransformContext, TransformResult } from '../types';

/**
 * Base class for data transformers
 */
export abstract class BaseTransformer<TInput = any, TOutput = any> {
  protected context: TransformContext;

  constructor(context: TransformContext) {
    this.context = context;
  }

  /**
   * Transform input data to output format
   */
  async transform(input: TInput): Promise<TransformResult<TOutput>> {
    try {
      const output = await this.process(input);

      return {
        success: true,
        data: output,
        errors: [],
        skipped: false,
      };
    } catch (error) {
      return {
        success: false,
        errors: [error instanceof Error ? error.message : 'Transformation failed'],
        skipped: false,
      };
    }
  }

  /**
   * Process the input data - must be implemented by concrete transformers
   */
  protected abstract process(input: TInput): Promise<TOutput>;
}
