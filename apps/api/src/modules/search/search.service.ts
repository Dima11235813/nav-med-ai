import { Injectable } from '@nestjs/common';
import { SearchFilters, Provider, Specialty, Location, Address, Rating, ContactInfo } from '@nav-med-ai/types';

@Injectable()
export class SearchService {
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
    {
      id: '2',
      name: 'Dr. Michael Chen',
      title: 'MD',
      specialty: {
        id: '2',
        name: 'Dermatologist',
        category: 'Dermatology',
      },
      specialties: [{
        id: '2',
        name: 'Dermatologist',
        category: 'Dermatology',
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
        street1: '456 Oak Ave',
        city: 'Denver',
        state: 'CO',
        stateCode: 'CO',
        zipCode: '80202',
        country: 'US',
      },
      contact: {
        phone: '(303) 555-0456',
        email: 'dr.chen@example.com',
      },
      credentials: [{
        type: 'board_certification',
        name: 'American Board of Dermatology',
        issuer: 'ABD',
        verified: true,
      }],
      rating: {
        overall: 4.6,
        totalReviews: 89,
        distribution: { 5: 70, 4: 15, 3: 3, 2: 1, 1: 0 },
      },
      verified: true,
      acceptingNewPatients: false,
      languages: ['English', 'Mandarin'],
      insuranceAccepted: [{
        id: '2',
        name: 'Aetna',
        planType: 'HMO',
        accepted: true,
      }],
      education: [{
        institution: 'Johns Hopkins School of Medicine',
        degree: 'MD',
        field: 'Medicine',
        graduationYear: 2008,
        verified: true,
      }],
      experience: [{
        organization: 'Rocky Mountain Dermatology',
        role: 'Dermatologist',
        startDate: '2012-01-01',
        current: true,
        description: 'Specializing in medical and cosmetic dermatology',
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

  async searchProviders(filters: SearchFilters): Promise<Provider[]> {
    let results = [...this.mockProviders];

    // Filter by specialty
    if (filters.specialty && filters.specialty.length > 0) {
      results = results.filter(provider =>
        filters.specialty!.some(specialty =>
          provider.specialty.name.toLowerCase().includes(specialty.toLowerCase())
        )
      );
    }

    // Filter by location
    if (filters.location) {
      results = results.filter(provider => {
        if (filters.location!.city &&
            !provider.location.city.toLowerCase().includes(filters.location!.city.toLowerCase())) {
          return false;
        }
        if (filters.location!.state &&
            provider.location.stateCode !== filters.location!.state) {
          return false;
        }
        if (filters.location!.zipCode &&
            provider.location.zipCode !== filters.location!.zipCode) {
          return false;
        }
        return true;
      });
    }

    // Filter by verified status
    if (filters.verified !== undefined) {
      results = results.filter(provider => provider.verified === filters.verified);
    }

    // Filter by rating
    if (filters.rating) {
      results = results.filter(provider =>
        provider.rating.overall >= filters.rating!
      );
    }

    // Sort by relevance (simplified - in production would use more sophisticated algorithm)
    results.sort((a, b) => {
      // Prioritize verified providers
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;

      // Then by rating
      return b.rating.overall - a.rating.overall;
    });

    return results;
  }
}
