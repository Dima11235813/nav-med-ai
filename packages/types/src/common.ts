// Common utility types used across the application

export type ID = string;
export type Timestamp = string; // ISO 8601 format

// Generic result type for operations
export interface Result<T, E = Error> {
  success: boolean;
  data?: T;
  error?: E;
}

// Optional wrapper for partial updates
export type PartialUpdate<T> = {
  [P in keyof T]?: T[P];
};

// Deep partial for nested objects
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Utility type for extracting keys of certain type
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Configuration types
export interface Config {
  environment: 'development' | 'staging' | 'production';
  apiUrl: string;
  databaseUrl: string;
  redisUrl?: string;
}

// Logging levels
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

// Event types for pub/sub patterns
export interface BaseEvent {
  id: ID;
  type: string;
  timestamp: Timestamp;
  payload: Record<string, any>;
}
