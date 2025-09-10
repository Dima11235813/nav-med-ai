import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProviderList } from '@nav-med-ai/ui'
import { Provider } from '@nav-med-ai/types'

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams()

  // Extract search parameters
  const specialty = searchParams.get('specialty')
  const city = searchParams.get('city')
  const state = searchParams.get('state')
  const zipCode = searchParams.get('zipCode')

  // Mock data - in real app this would come from API
  const mockProviders: Provider[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      title: 'MD',
      specialty: {
        id: '1',
        name: specialty || 'Cardiologist',
        category: 'Cardiology',
      },
      specialties: [{
        id: '1',
        name: specialty || 'Cardiologist',
        category: 'Cardiology',
      }],
      location: {
        latitude: 39.7392,
        longitude: -104.9903,
        city: city || 'Denver',
        state: state || 'CO',
        stateCode: 'CO',
        zipCode: zipCode || '80202',
        country: 'US',
        timezone: 'America/Denver',
      },
      address: {
        street1: '123 Main St',
        city: city || 'Denver',
        state: state || 'CO',
        stateCode: 'CO',
        zipCode: zipCode || '80202',
        country: 'US',
      },
      contact: {},
      credentials: [],
      rating: {
        overall: 4.8,
        totalReviews: 127,
        distribution: { 5: 100, 4: 20, 3: 5, 2: 1, 1: 1 },
      },
      verified: true,
      acceptingNewPatients: true,
      languages: ['English'],
      insuranceAccepted: [],
      education: [],
      experience: [],
      reviews: [],
      metadata: {
        dataQuality: 'high',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Nav Med AI</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Summary */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            {specialty} providers in {city}, {state}
            {zipCode && ` (ZIP: ${zipCode})`}
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option>Relevance</option>
                <option>Rating</option>
                <option>Distance</option>
                <option>Name</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Distance:</label>
              <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option>5 miles</option>
                <option>10 miles</option>
                <option>25 miles</option>
                <option>50 miles</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-8">
          <ProviderList providers={mockProviders} />
        </div>

        {/* No Results State */}
        {mockProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find any {specialty} providers in {city}, {state}.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Try:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Expanding your search radius</li>
                <li>• Checking spelling of the city name</li>
                <li>• Searching for a related specialty</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default SearchResultsPage
