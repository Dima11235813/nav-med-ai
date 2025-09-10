// Configuration types for the Nav Med AI platform

export interface Config {
  // Environment
  nodeEnv: string;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;

  // Server
  port: number;
  host: string;

  // Database
  database: {
    url: string;
    poolSize: number;
    ssl: boolean;
  };

  // Redis (optional)
  redis: {
    url?: string;
    enabled: boolean;
  };

  // API
  api: {
    baseUrl: string;
    version: string;
    timeout: number;
    rateLimit: {
      windowMs: number;
      max: number;
    };
  };

  // Authentication
  auth: {
    jwtSecret: string;
    jwtExpiresIn: string;
    refreshTokenExpiresIn: string;
    bcryptRounds: number;
  };

  // External APIs
  external: {
    healthcareGov: {
      baseUrl: string;
      apiKey?: string;
    };
    cdcWonder: {
      baseUrl: string;
      apiKey?: string;
    };
    healthdataGov: {
      baseUrl: string;
      apiKey?: string;
    };
  };

  // File upload
  upload: {
    maxFileSize: number;
    allowedTypes: string[];
    uploadPath: string;
  };

  // Logging
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'simple';
  };

  // AI/ML
  ai: {
    openai: {
      apiKey?: string;
      model: string;
      maxTokens: number;
    };
    huggingface: {
      apiKey?: string;
      model: string;
    };
  };

  // Feature flags
  features: {
    aiSearch: boolean;
    telemedicine: boolean;
    multiLanguage: boolean;
  };

  // Security
  security: {
    cors: {
      origin: string[];
      credentials: boolean;
    };
    helmet: {
      contentSecurityPolicy: boolean;
    };
  };
}

// Environment variable validation
export interface EnvValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
