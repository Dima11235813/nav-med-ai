// Database entities - using Entity suffix to distinguish from DTOs/wire format objects
export { ProviderEntity } from './provider.entity';
export { SpecialtyEntity } from './specialty.entity';
export { CredentialEntity } from './credential.entity';
export { ReviewEntity } from './review.entity';

// Type exports for use in services/repositories
export type { Provider as ProviderDomain } from '@nav-med-ai/types';
export type { Specialty as SpecialtyDomain } from '@nav-med-ai/types';
export type { Credential as CredentialDomain } from '@nav-med-ai/types';
export type { Review as ReviewDomain } from '@nav-med-ai/types';
