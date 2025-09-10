import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select } from '@nav-med-ai/ui'
import { configService } from '../services/config.service'
import { SearchFilters } from '@nav-med-ai/types'

interface SearchFormProps {
  onSearch?: (filters: SearchFilters) => void
  className?: string
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, className = '' }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    specialty: '',
    city: '',
    state: '',
    zipCode: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [constants, setConstants] = useState<{
    providerSpecialties: string[]
    usStates: Array<{ code: string; name: string }>
  } | null>(null)
  const [constantsLoading, setConstantsLoading] = useState(true)

  // Load constants on component mount
  useEffect(() => {
    const loadConstants = async () => {
      try {
        const loadedConstants = await configService.getConstants()
        setConstants(loadedConstants)
      } catch (error) {
        console.error('Failed to load constants:', error)
        // The config service has fallbacks, so it should still work
      } finally {
        setConstantsLoading(false)
      }
    }

    loadConstants()
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.specialty.trim()) {
      newErrors.specialty = 'Please select a specialty'
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter a city'
    }

    if (!formData.state) {
      newErrors.state = 'Please select a state'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const searchFilters: SearchFilters = {
        specialty: [formData.specialty],
        location: {
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode || undefined,
        },
      }

      if (onSearch) {
        onSearch(searchFilters)
      } else {
        // Navigate to search results page with query parameters
        const params = new URLSearchParams({
          specialty: formData.specialty,
          city: formData.city,
          state: formData.state,
          ...(formData.zipCode && { zipCode: formData.zipCode }),
        })
        navigate(`/search?${params.toString()}`)
      }
    } catch (error) {
      console.error('Search error:', error)
      setErrors({ general: 'An error occurred while searching. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const specialtyOptions = constants?.providerSpecialties.map(specialty => ({
    value: specialty,
    label: specialty,
  })) || []

  const stateOptions = constants?.usStates.map(state => ({
    value: state.code,
    label: `${state.name} (${state.code})`,
  })) || []

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Healthcare Providers
          </h1>
          <p className="text-gray-600">
            Search by specialty and location to find the right healthcare provider for you
          </p>
        </div>

        {constantsLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading...</p>
          </div>
        )}

        {!constantsLoading && (
          <>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800 text-sm">{errors.general}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
              Specialty *
            </label>
            <Select
              id="specialty"
              value={formData.specialty}
              onChange={(e) => handleInputChange('specialty', e.target.value)}
              className={errors.specialty ? 'border-red-500' : ''}
              required
            >
              <option value="">Select a specialty</option>
              {specialtyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.specialty && (
              <p className="text-red-600 text-sm mt-1">{errors.specialty}</p>
            )}
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <Select
              id="state"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              className={errors.state ? 'border-red-500' : ''}
              required
            >
              <option value="">Select a state</option>
              {stateOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            {errors.state && (
              <p className="text-red-600 text-sm mt-1">{errors.state}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <Input
              id="city"
              type="text"
              placeholder="Enter city name"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={errors.city ? 'border-red-500' : ''}
              required
            />
            {errors.city && (
              <p className="text-red-600 text-sm mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code (Optional)
            </label>
            <Input
              id="zipCode"
              type="text"
              placeholder="Enter ZIP code"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              pattern="[0-9]{5}"
              title="Please enter a valid 5-digit ZIP code"
            />
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            size="lg"
            loading={isLoading}
            className="px-8 py-3 text-lg"
          >
            {isLoading ? 'Searching...' : 'Search Providers'}
          </Button>
        </div>

            <div className="text-center text-sm text-gray-500 mt-4">
              <p>
                Looking for a specific provider?{' '}
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Browse all providers
                </a>
              </p>
            </div>
          </>
        )}
      </form>
    </div>
  )
}

export default SearchForm
