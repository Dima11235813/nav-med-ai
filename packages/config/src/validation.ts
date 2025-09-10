import { EnvValidationResult } from './types';

export function validateConfig(): EnvValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required environment variables
  const requiredVars = [
    'DATABASE_URL',
    'JWT_SECRET',
  ];

  // Check required variables
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      errors.push(`Missing required environment variable: ${varName}`);
    }
  }

  // Check for production-specific requirements
  if (process.env.NODE_ENV === 'production') {
    if (process.env.JWT_SECRET === 'default-secret-change-in-production') {
      errors.push('JWT_SECRET must be changed from default value in production');
    }

    if (!process.env.DATABASE_URL?.startsWith('postgresql://') &&
        !process.env.DATABASE_URL?.startsWith('postgres://')) {
      warnings.push('DATABASE_URL should use postgresql:// or postgres:// protocol in production');
    }
  }

  // Check for AI features
  if (process.env.FEATURE_AI_SEARCH === 'true') {
    if (!process.env.OPENAI_API_KEY) {
      errors.push('OPENAI_API_KEY is required when FEATURE_AI_SEARCH is enabled');
    }
  }

  // Check external API keys
  if (process.env.HEALTHCARE_GOV_API_KEY) {
    warnings.push('HEALTHCARE_GOV_API_KEY is set but may not be required for basic functionality');
  }

  // Check port validity
  if (process.env.PORT) {
    const port = parseInt(process.env.PORT, 10);
    if (isNaN(port) || port < 1 || port > 65535) {
      errors.push('PORT must be a valid port number between 1 and 65535');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
