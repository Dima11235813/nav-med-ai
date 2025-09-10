export type ID = string;
export type Timestamp = string;
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
}
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
export interface User {
    id: ID;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export { Provider, Specialty, Location, Address, Rating, ContactInfo, Credential, Insurance, Education, Experience, Review, ProviderMetadata } from './domain';
export interface SearchFilters {
    specialty?: string[];
    location?: {
        city?: string;
        state?: string;
        zipCode?: string;
    };
    radius?: number;
    rating?: number;
    verified?: boolean;
}
export interface SearchQuery {
    query: string;
    filters?: SearchFilters;
}
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
export * from './common';
export * from './api';
export * from './domain';
//# sourceMappingURL=index.d.ts.map