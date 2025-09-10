// Shared TypeScript types and interfaces for Nav Med AI platform

// Base types
export type ID = string;
export type Timestamp = string; // ISO 8601 format

// Common API response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// User types (for future authentication)
export interface User {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Provider types (core domain)
export interface Provider {
  id: ID;
  name: string;
  specialty: string;
  location: Location;
  address: Address;
  phone?: string;
  email?: string;
  website?: string;
  rating?: number;
  verified: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Location {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  zipCode: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Search types
export interface SearchFilters {
  specialty?: string;
  location?: string;
  radius?: number;
  rating?: number;
  verified?: boolean;
}

export interface SearchQuery {
  query: string;
  filters?: SearchFilters;
}

// Data pipeline types (for data ingestion)
export interface DataSource {
  id: ID;
  name: string;
  url: string;
  type: 'api' | 'file' | 'database';
  format: 'json' | 'csv' | 'xml' | 'html';
  lastUpdated?: Timestamp;
}

export interface DataRecord {
  id: ID;
  sourceId: ID;
  data: Record<string, any>;
  processed: boolean;
  createdAt: Timestamp;
}

// AI types (for future AI features)
export interface AIQuery {
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
  metadata?: Record<string, any>;
}

export interface AIResponse {
  suggestions: string[];
  confidence: number;
  sources?: string[];
}

// Export all types for convenience
export * from './common';
export * from './api';
export * from './domain';
