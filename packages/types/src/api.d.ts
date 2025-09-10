import { ID, Timestamp } from './common';
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
    timestamp: Timestamp;
}
export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}
export interface CreateRequest<T> {
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
}
export interface UpdateRequest<T> {
    id: ID;
    data: Partial<Omit<T, 'id' | 'createdAt'>>;
}
export interface DeleteRequest {
    id: ID;
}
export interface GetByIdRequest {
    id: ID;
}
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: Timestamp;
}
export interface RateLimitInfo {
    limit: number;
    remaining: number;
    resetTime: Timestamp;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
export interface LoginRequest {
    email: string;
    password: string;
}
export interface LoginResponse extends ApiResponse<AuthTokens> {
    user: {
        id: ID;
        email: string;
        firstName: string;
        lastName: string;
    };
}
//# sourceMappingURL=api.d.ts.map