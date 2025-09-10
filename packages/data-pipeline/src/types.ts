// Data pipeline types and interfaces

import { ID, Timestamp } from '@nav-med-ai/types';

// Data source types
export interface DataSource {
  id: ID;
  name: string;
  type: 'api' | 'file' | 'database' | 'stream';
  format: 'json' | 'csv' | 'xml' | 'html' | 'pdf';
  url?: string;
  headers?: Record<string, string>;
  auth?: {
    type: 'bearer' | 'basic' | 'api_key';
    token?: string;
    username?: string;
    password?: string;
  };
  rateLimit?: {
    requests: number;
    period: number; // in milliseconds
  };
  lastFetched?: Timestamp;
  isActive: boolean;
}

export interface DataRecord {
  id: ID;
  sourceId: ID;
  rawData: any;
  metadata: {
    fetchedAt: Timestamp;
    contentType?: string;
    size?: number;
    checksum?: string;
  };
  processed: boolean;
  processingAttempts: number;
  lastError?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Processing pipeline types
export interface ProcessingResult<T = any> {
  success: boolean;
  data?: T;
  errors: string[];
  warnings: string[];
  metadata: {
    processingTime: number;
    recordsProcessed: number;
    recordsFailed: number;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  field: string;
  code: string;
  message: string;
  value?: any;
}

export interface ValidationWarning {
  field: string;
  code: string;
  message: string;
  value?: any;
}

// Transformer types
export interface TransformContext {
  sourceId: ID;
  batchId: ID;
  options?: Record<string, any>;
}

export interface TransformResult<T = any> {
  success: boolean;
  data?: T;
  errors: string[];
  skipped: boolean;
}

// Storage types
export interface StorageOptions {
  batchSize?: number;
  upsert?: boolean;
  validateBeforeSave?: boolean;
}

export interface StorageResult {
  success: boolean;
  inserted: number;
  updated: number;
  failed: number;
  errors: string[];
}

// Pipeline configuration
export interface PipelineStep {
  name: string;
  type: 'harvest' | 'transform' | 'validate' | 'store';
  config: Record<string, any>;
  enabled: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}

export interface PipelineConfig {
  name: string;
  description?: string;
  steps: PipelineStep[];
  schedule?: {
    cron: string;
    timezone?: string;
  };
  notifications?: {
    onSuccess?: boolean;
    onFailure?: boolean;
    emailRecipients?: string[];
  };
}

// Healthcare-specific data types
export interface RawProviderData {
  source: string;
  externalId: string;
  name: string;
  specialty?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  credentials?: string[];
  insurance?: string[];
  languages?: string[];
  rawData: any;
}

export interface ProcessedProviderData {
  id: ID;
  sourceId: ID;
  externalId: string;
  name: string;
  title?: string;
  specialty: string;
  location: {
    latitude?: number;
    longitude?: number;
    city: string;
    state: string;
    zipCode: string;
  };
  address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipCode: string;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  credentials: Array<{
    type: string;
    name: string;
    issuer?: string;
    verified: boolean;
  }>;
  insurance: Array<{
    name: string;
    accepted: boolean;
  }>;
  languages: string[];
  verified: boolean;
  metadata: {
    dataQuality: 'high' | 'medium' | 'low';
    lastVerified?: Timestamp;
    sourceUrl?: string;
  };
}

// Batch processing types
export interface BatchJob {
  id: ID;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  config: Record<string, any>;
  progress: {
    total: number;
    processed: number;
    failed: number;
  };
  startedAt?: Timestamp;
  completedAt?: Timestamp;
  error?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Monitoring and metrics
export interface PipelineMetrics {
  jobsProcessed: number;
  recordsProcessed: number;
  processingTime: number;
  errorRate: number;
  dataQuality: {
    completeness: number;
    accuracy: number;
    consistency: number;
  };
}

export interface DataQualityMetrics {
  sourceId: ID;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
  completenessScore: number;
  accuracyScore: number;
  lastAssessed: Timestamp;
}
