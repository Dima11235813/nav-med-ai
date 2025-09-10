import { ID, Timestamp } from './common';
export interface Provider {
    id: ID;
    name: string;
    title: string;
    specialty: Specialty;
    specialties: Specialty[];
    location: Location;
    address: Address;
    contact: ContactInfo;
    credentials: Credential[];
    rating: Rating;
    verified: boolean;
    acceptingNewPatients: boolean;
    languages: string[];
    insuranceAccepted: Insurance[];
    education: Education[];
    experience: Experience[];
    reviews: Review[];
    metadata: ProviderMetadata;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export interface Specialty {
    id: ID;
    name: string;
    category: string;
    description?: string;
}
export interface Location {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    stateCode: string;
    zipCode: string;
    country: string;
    timezone: string;
}
export interface Address {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    stateCode: string;
    zipCode: string;
    country: string;
}
export interface ContactInfo {
    phone?: string;
    fax?: string;
    email?: string;
    website?: string;
}
export interface Credential {
    type: 'license' | 'certification' | 'board_certification';
    name: string;
    issuer: string;
    number?: string;
    issueDate?: Timestamp;
    expirationDate?: Timestamp;
    verified: boolean;
}
export interface Rating {
    overall: number;
    totalReviews: number;
    distribution: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
}
export interface Insurance {
    id: ID;
    name: string;
    planType: string;
    accepted: boolean;
}
export interface Education {
    institution: string;
    degree: string;
    field: string;
    graduationYear: number;
    verified: boolean;
}
export interface Experience {
    organization: string;
    role: string;
    startDate: Timestamp;
    endDate?: Timestamp;
    current: boolean;
    description?: string;
}
export interface Review {
    id: ID;
    userId: ID;
    providerId: ID;
    rating: number;
    comment?: string;
    verified: boolean;
    createdAt: Timestamp;
    helpful: number;
}
export interface ProviderMetadata {
    source: string;
    lastVerified?: Timestamp;
    dataQuality: 'high' | 'medium' | 'low';
    updateFrequency: 'daily' | 'weekly' | 'monthly';
}
export interface User {
    id: ID;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: Timestamp;
    gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    phone?: string;
    address?: Address;
    preferences: UserPreferences;
    medicalHistory?: MedicalHistory;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export interface UserPreferences {
    language: string;
    notifications: {
        email: boolean;
        sms: boolean;
        push: boolean;
    };
    searchRadius: number;
    specialtyPreferences: string[];
}
export interface MedicalHistory {
    conditions: string[];
    medications: string[];
    allergies: string[];
    lastUpdated: Timestamp;
}
export interface SearchFilters {
    specialty?: string[];
    location?: {
        city?: string;
        state?: string;
        zipCode?: string;
        radius?: number;
    };
    insurance?: string[];
    rating?: {
        min: number;
        max: number;
    };
    availability?: {
        acceptingNewPatients?: boolean;
        nextAvailable?: Timestamp;
    };
    languages?: string[];
    verified?: boolean;
}
export interface SearchQuery {
    query?: string;
    filters: SearchFilters;
    sortBy?: 'relevance' | 'rating' | 'distance' | 'availability';
    sortOrder?: 'asc' | 'desc';
}
export interface SearchResult {
    providers: Provider[];
    total: number;
    query: SearchQuery;
    facets: SearchFacets;
}
export interface SearchFacets {
    specialties: FacetItem[];
    locations: FacetItem[];
    insurance: FacetItem[];
    ratings: FacetItem[];
}
export interface FacetItem {
    value: string;
    label: string;
    count: number;
}
export interface Appointment {
    id: ID;
    providerId: ID;
    userId: ID;
    dateTime: Timestamp;
    duration: number;
    type: 'in_person' | 'telehealth' | 'phone';
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
    reason?: string;
    notes?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export interface AIQuery {
    text?: string;
    symptoms?: string[];
    imageUrl?: string;
    audioUrl?: string;
    context?: {
        userId?: ID;
        location?: Location;
        preferences?: UserPreferences;
    };
}
export interface AIResponse {
    suggestions: AISuggestion[];
    confidence: number;
    reasoning?: string;
    disclaimers: string[];
    sources?: string[];
}
export interface AISuggestion {
    type: 'specialty' | 'provider' | 'symptom_analysis' | 'recommendation';
    title: string;
    description: string;
    confidence: number;
    metadata?: Record<string, any>;
}
//# sourceMappingURL=domain.d.ts.map