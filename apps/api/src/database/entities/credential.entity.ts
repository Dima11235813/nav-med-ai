import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Credential as CredentialDomain } from '@nav-med-ai/types';
import { ProviderEntity } from './provider.entity';

@Entity('credentials')
@Index(['type'])
@Index(['verified'])
@Index(['providerId'])
export class CredentialEntity implements Omit<CredentialDomain, 'id'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  type: 'license' | 'certification' | 'board_certification';

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  issuer: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  number?: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  issueDate?: string;

  @Column({ type: 'timestamp with time zone', nullable: true })
  expirationDate?: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  // Relationships
  @ManyToOne(() => ProviderEntity, provider => provider.credentials)
  @JoinColumn({ name: 'providerId' })
  provider?: ProviderEntity;

  @Column({ type: 'uuid' })
  providerId: string;
}
