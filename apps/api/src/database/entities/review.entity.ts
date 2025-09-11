import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Check,
} from 'typeorm';
import { Review as ReviewDomain } from '@nav-med-ai/types';
import { ProviderEntity } from './provider.entity';

@Entity('reviews')
@Index(['providerId'])
@Index(['userId'])
@Index(['verified'])
@Index(['createdAt'])
@Check(`"rating" >= 1 AND "rating" <= 5`)
export class ReviewEntity implements Omit<ReviewDomain, 'id'> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  providerId: string;

  @Column({ type: 'integer' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment?: string;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'integer', default: 0 })
  helpful: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;

  // Relationships
  @ManyToOne(() => ProviderEntity, provider => provider.reviews)
  @JoinColumn({ name: 'providerId' })
  provider?: ProviderEntity;
}
