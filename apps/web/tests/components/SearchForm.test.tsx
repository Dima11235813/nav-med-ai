import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import SearchForm from '../../src/components/SearchForm'
import { SearchFilters } from '@nav-med-ai/types'

// Mock the router hooks
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock the shared packages
vi.mock('@nav-med-ai/ui', () => ({
  Button: ({ children, onClick, loading, ...props }: any) => (
    <button onClick={onClick} disabled={loading} {...props}>
      {loading ? 'Loading...' : children}
    </button>
  ),
  Input: (props: any) => <input {...props} />,
  Select: (props: any) => <select {...props} />,
}))

vi.mock('@nav-med-ai/config', () => ({
  PROVIDER_SPECIALTIES: ['Cardiologist', 'Dermatologist', 'Family Medicine'],
  US_STATES: [
    { code: 'CO', name: 'Colorado' },
    { code: 'CA', name: 'California' },
  ],
}))

vi.mock('@nav-med-ai/types', () => ({
  SearchFilters: {},
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('SearchForm', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders the search form correctly', () => {
    renderWithRouter(<SearchForm />)

    expect(screen.getByText('Find Healthcare Providers')).toBeInTheDocument()
    expect(screen.getByLabelText(/specialty/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/state/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search providers/i })).toBeInTheDocument()
  })

  it('shows validation errors when required fields are empty', async () => {
    renderWithRouter(<SearchForm />)

    const submitButton = screen.getByRole('button', { name: /search providers/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please select a specialty')).toBeInTheDocument()
      expect(screen.getByText('Please enter a city')).toBeInTheDocument()
      expect(screen.getByText('Please select a state')).toBeInTheDocument()
    })
  })

  it('navigates to search results when form is valid', async () => {
    renderWithRouter(<SearchForm />)

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/specialty/i), {
      target: { value: 'Cardiologist' },
    })
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: 'Denver' },
    })
    fireEvent.change(screen.getByLabelText(/state/i), {
      target: { value: 'CO' },
    })

    const submitButton = screen.getByRole('button', { name: /search providers/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/search?specialty=Cardiologist&city=Denver&state=CO&zipCode='
      )
    })
  })

  it('calls onSearch prop when provided', async () => {
    const mockOnSearch = vi.fn()
    renderWithRouter(<SearchForm onSearch={mockOnSearch} />)

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/specialty/i), {
      target: { value: 'Cardiologist' },
    })
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: 'Denver' },
    })
    fireEvent.change(screen.getByLabelText(/state/i), {
      target: { value: 'CO' },
    })

    const submitButton = screen.getByRole('button', { name: /search providers/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith({
        specialty: ['Cardiologist'],
        location: {
          city: 'Denver',
          state: 'CO',
          zipCode: undefined,
        },
      })
    })
  })

  it('shows loading state during submission', async () => {
    renderWithRouter(<SearchForm />)

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/specialty/i), {
      target: { value: 'Cardiologist' },
    })
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: 'Denver' },
    })
    fireEvent.change(screen.getByLabelText(/state/i), {
      target: { value: 'CO' },
    })

    const submitButton = screen.getByRole('button', { name: /search providers/i })
    fireEvent.click(submitButton)

    expect(screen.getByRole('button', { name: /searching/i })).toBeDisabled()
  })

  it('includes ZIP code in search when provided', async () => {
    renderWithRouter(<SearchForm />)

    // Fill out the form including ZIP
    fireEvent.change(screen.getByLabelText(/specialty/i), {
      target: { value: 'Cardiologist' },
    })
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: 'Denver' },
    })
    fireEvent.change(screen.getByLabelText(/state/i), {
      target: { value: 'CO' },
    })
    fireEvent.change(screen.getByLabelText(/zip code/i), {
      target: { value: '80202' },
    })

    const submitButton = screen.getByRole('button', { name: /search providers/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        '/search?specialty=Cardiologist&city=Denver&state=CO&zipCode=80202'
      )
    })
  })
})
