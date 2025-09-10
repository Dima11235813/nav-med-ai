import { Injectable, NotFoundException } from '@nestjs/common';
import { Provider } from '@nav-med-ai/types';

@Injectable()
export class ProvidersService {
  // Mock data - in production this would come from a database
  private mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'MD',
      specialty: {
        id: '1',
        name: 'Cardiologist',
        category: 'Cardiology',
      },
      specialties: [{
        id: '1',
        name: 'Cardiologist',
        category: 'Cardiology',
      }],
      location: {
        latitude: 39.7392,
        longitude: -104.9903,
        city: 'Denver',
        state: 'CO',
        stateCode: 'CO',
        zipCode: '80202',
        country: 'US',
        timezone: 'America/Denver',
      },
      address: {
        street1: '123 Main St',
        city: 'Denver',
        state: 'CO',
        stateCode: 'CO',
        zipCode: '80202',
        country: 'US',
      },
      contact: {
        phone: '(303) 555-0123',
        email: 'dr.johnson@example.com',
        website: 'https://drjohnsoncardiology.com',
      },
      credentials: [{
        type: 'board_certification',
        name: 'American Board of Internal Medicine',
        issuer: 'ABIM',
        verified: true,
      }],
      rating: {
        overall: 4.8,
        totalReviews: 127,
        distribution: { 5: 100, 4: 20, 3: 5, 2: 1, 1: 1 },
      },
      verified: true,
      acceptingNewPatients: true,
      languages: ['English', 'Spanish'],
      insuranceAccepted: [{
        id: '1',
        name: 'Blue Cross Blue Shield',
        planType: 'PPO',
        accepted: true,
      }],
      education: [{
        institution: 'University of Colorado School of Medicine',
        degree: 'MD',
        field: 'Medicine',
        graduationYear: 2010,
        verified: true,
      }],
      experience: [{
        organization: 'Denver Heart Institute',
        role: 'Cardiologist',
        startDate: '2015-01-01',
        current: true,
        description: 'Specializing in interventional cardiology and heart disease prevention',
      }],
      reviews: [],
      metadata: {
        dataQuality: 'high',
        lastVerified: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  async getProviderById(id: string): Promise<Provider | null> {
    const provider = this.mockProviders.find(p => p.id === id);
    return provider || null;
  }

  async getAllProviders(): Promise<Provider[]> {
    return this.mockProviders;
  }
}
