import { Config } from './types';

const config: Config = {
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  // Server
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || 'localhost',

  // Database
  database: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/nav_med_ai',
    poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
    ssl: process.env.DB_SSL === 'true',
  },

  // Redis (optional)
  redis: {
    url: process.env.REDIS_URL,
    enabled: !!process.env.REDIS_URL,
  },

  // API
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
    version: process.env.API_VERSION || 'v1',
    timeout: parseInt(process.env.API_TIMEOUT || '30000', 10),
    rateLimit: {
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
      max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    },
  },

  // Authentication
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '30d',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  },

  // External APIs
  external: {
    healthcareGov: {
      baseUrl: process.env.HEALTHCARE_GOV_API_URL || 'https://www.healthcare.gov/api',
      apiKey: process.env.HEALTHCARE_GOV_API_KEY,
    },
    cdcWonder: {
      baseUrl: process.env.CDC_WONDER_API_URL || 'https://wonder.cdc.gov',
      apiKey: process.env.CDC_WONDER_API_KEY,
    },
    healthdataGov: {
      baseUrl: process.env.HEALTHDATA_GOV_API_URL || 'https://healthdata.gov/api',
      apiKey: process.env.HEALTHDATA_GOV_API_KEY,
    },
  },

  // File upload
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760', 10), // 10MB
    allowedTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(','),
    uploadPath: process.env.UPLOAD_PATH || './uploads',
  },

  // Logging
  logging: {
    level: (process.env.LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error',
    format: (process.env.LOG_FORMAT || 'json') as 'json' | 'simple',
  },

  // AI/ML
  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL || 'gpt-4',
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000', 10),
    },
    huggingface: {
      apiKey: process.env.HUGGINGFACE_API_KEY,
      model: process.env.HUGGINGFACE_MODEL || 'microsoft/DialoGPT-medium',
    },
  },

  // Feature flags
  features: {
    aiSearch: process.env.FEATURE_AI_SEARCH === 'true',
    telemedicine: process.env.FEATURE_TELEMEDICINE === 'true',
    multiLanguage: process.env.FEATURE_MULTI_LANGUAGE === 'true',
  },

  // Security
  security: {
    cors: {
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:3000'],
      credentials: process.env.CORS_CREDENTIALS === 'true',
    },
    helmet: {
      contentSecurityPolicy: process.env.HELMET_CSP === 'true',
    },
  },
};

export default config;
