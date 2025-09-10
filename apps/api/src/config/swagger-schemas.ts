import { ApiExtraModels } from '@nestjs/swagger';

// Define Swagger schemas for our domain models
export class SpecialtySchema {
  id: string;
  name: string;
  category: string;
  description?: string;
}

export class LocationSchema {
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
  country: string;
  timezone: string;
}

export class AddressSchema {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  stateCode: string;
  zipCode: string;
  country: string;
}

export class ContactInfoSchema {
  phone?: string;
  fax?: string;
  email?: string;
  website?: string;
}

export class CredentialSchema {
  type: 'license' | 'certification' | 'board_certification';
  name: string;
  issuer: string;
  number?: string;
  issueDate?: string;
  expirationDate?: string;
  verified: boolean;
}

export class RatingSchema {
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

export class InsuranceSchema {
  id: string;
  name: string;
  planType: string;
  accepted: boolean;
}

export class EducationSchema {
  institution: string;
  degree: string;
  field: string;
  graduationYear: number;
  verified: boolean;
}

export class ExperienceSchema {
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export class ReviewSchema {
  id: string;
  userId: string;
  providerId: string;
  rating: number;
  comment?: string;
  verified: boolean;
  createdAt: string;
  helpful: number;
}

export class ProviderMetadataSchema {
  source: string;
  lastVerified?: string;
  dataQuality: 'high' | 'medium' | 'low';
  updateFrequency: 'daily' | 'weekly' | 'monthly';
}

@ApiExtraModels(
  SpecialtySchema,
  LocationSchema,
  AddressSchema,
  ContactInfoSchema,
  CredentialSchema,
  RatingSchema,
  InsuranceSchema,
  EducationSchema,
  ExperienceSchema,
  ReviewSchema,
  ProviderMetadataSchema
)
export class ProviderSchema {
  id: string;
  name: string;
  title: string;
  specialty: SpecialtySchema;
  specialties: SpecialtySchema[];
  location: LocationSchema;
  address: AddressSchema;
  contact: ContactInfoSchema;
  credentials: CredentialSchema[];
  rating: RatingSchema;
  verified: boolean;
  acceptingNewPatients: boolean;
  languages: string[];
  insuranceAccepted: InsuranceSchema[];
  education: EducationSchema[];
  experience: ExperienceSchema[];
  reviews: ReviewSchema[];
  metadata: ProviderMetadataSchema;
  createdAt: string;
  updatedAt: string;
}

// Search-related schemas
export class SearchFiltersSchema {
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
    nextAvailable?: string;
  };
  languages?: string[];
  verified?: boolean;
}

export class FacetItemSchema {
  value: string;
  label: string;
  count: number;
}

export class SearchFacetsSchema {
  specialties: FacetItemSchema[];
  locations: FacetItemSchema[];
  insurance: FacetItemSchema[];
  ratings: FacetItemSchema[];
}

export class SearchQuerySchema {
  query?: string;
  filters: SearchFiltersSchema;
  sortBy?: 'relevance' | 'rating' | 'distance' | 'availability';
  sortOrder?: 'asc' | 'desc';
}

export class SearchResultSchema {
  providers: ProviderSchema[];
  total: number;
  query: SearchQuerySchema;
  facets: SearchFacetsSchema;
}

// Response schemas
export class ApiResponseSchema<T = any> {
  data: T;
  success: boolean;
  message: string;
}

// Config schemas
export class PublicConfigSchema {
  apiVersion: string;
  features: {
    aiSearch: boolean;
    telemedicine: boolean;
    multiLanguage: boolean;
  };
  providerSpecialties: string[];
  usStates: Array<{
    code: string;
    name: string;
  }>;
}

export class AppConstantsSchema {
  providerSpecialties: string[];
  usStates: Array<{
    code: string;
    name: string;
  }>;
}

// Export all schemas for easy import
export const swaggerSchemas = [
  SpecialtySchema,
  LocationSchema,
  AddressSchema,
  ContactInfoSchema,
  CredentialSchema,
  RatingSchema,
  InsuranceSchema,
  EducationSchema,
  ExperienceSchema,
  ReviewSchema,
  ProviderMetadataSchema,
  ProviderSchema,
  SearchFiltersSchema,
  FacetItemSchema,
  SearchFacetsSchema,
  SearchQuerySchema,
  SearchResultSchema,
  PublicConfigSchema,
  AppConstantsSchema,
];
