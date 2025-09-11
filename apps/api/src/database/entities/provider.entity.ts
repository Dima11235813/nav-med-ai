import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  Check,
} from 'typeorm';
import { Provider as ProviderDomain } from '@nav-med-ai/types';
import { SpecialtyEntity } from './specialty.entity';
import { CredentialEntity } from './credential.entity';
import { ReviewEntity } from './review.entity';

@Entity('providers')
@Index(['name'])
@Index(['verified'])
@Index(['acceptingNewPatients'])
@Index(['location'], { spatial: true })
@Index(['city', 'state'])
@Check(`"rating_overall" >= 0 AND "rating_overall" <= 5`)
export class ProviderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  // Geospatial location using PostGIS
  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true
  })
  location?: any;

  // Address fields (stored separately for queries)
  @Column({ type: 'varchar', length: 255 })
  street1: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  street2?: string;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  city: string;

  @Column({ type: 'varchar', length: 50 })
  state: string;

  @Column({ type: 'varchar', length: 10 })
  stateCode: string;

  @Column({ type: 'varchar', length: 20 })
  @Index()
  zipCode: string;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column({ type: 'varchar', length: 50 })
  timezone: string;

  // Contact information
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  fax?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Index({ unique: true })
  email?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  website?: string;

  // Provider status
  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'boolean', default: true })
  acceptingNewPatients: boolean;

  // Languages spoken
  @Column({ type: 'jsonb', nullable: true })
  languages?: string[];

  // Rating information
  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  ratingOverall: number;

  @Column({ type: 'integer', default: 0 })
  ratingTotalReviews: number;

  @Column({ type: 'jsonb', nullable: true })
  ratingDistribution?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };

  // Insurance information (stored as JSON for flexibility)
  @Column({ type: 'jsonb', nullable: true })
  insuranceAccepted?: Array<{
    id: string;
    name: string;
    planType: string;
    accepted: boolean;
  }>;

  // Education (stored as JSON)
  @Column({ type: 'jsonb', nullable: true })
  education?: Array<{
    institution: string;
    degree: string;
    field: string;
    graduationYear: number;
    verified: boolean;
  }>;

  // Experience (stored as JSON)
  @Column({ type: 'jsonb', nullable: true })
  experience?: Array<{
    organization: string;
    role: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }>;

  // Metadata
  @Column({ type: 'varchar', length: 100 })
  metadataSource: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  metadataLastVerified?: string;

  @Column({ type: 'varchar', length: 20, default: 'medium' })
  metadataDataQuality: 'high' | 'medium' | 'low';

  @Column({ type: 'varchar', length: 20, default: 'weekly' })
  metadataUpdateFrequency: 'daily' | 'weekly' | 'monthly';

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  // Relationships
  @ManyToOne(() => SpecialtyEntity)
  @JoinColumn({ name: 'primarySpecialtyId' })
  primarySpecialty?: SpecialtyEntity;

  @Column({ type: 'uuid', nullable: true })
  primarySpecialtyId?: string;

  @ManyToMany(() => SpecialtyEntity)
  @JoinTable({
    name: 'provider_specialties',
    joinColumn: { name: 'providerId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'specialtyId', referencedColumnName: 'id' }
  })
  specialties?: SpecialtyEntity[];

  @OneToMany(() => CredentialEntity, credential => credential.provider)
  credentials?: CredentialEntity[];

  @OneToMany(() => ReviewEntity, review => review.provider)
  reviews?: ReviewEntity[];
}
