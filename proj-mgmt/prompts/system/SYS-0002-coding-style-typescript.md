---
id: SYS-0002
type: system
purpose: "TypeScript coding standards and best practices"
version: 1.1.0
input_schema: text
output_schema: code
related: [ADR-0001]
changelog:
  - 1.1.0: Updated for React 18 and TypeScript 5.0
  - 1.0.0: Initial coding standards
---

# TypeScript Coding Standards

## Core Principles

Write type-safe, maintainable, and scalable TypeScript code that follows modern best practices and integrates well with our healthcare compliance requirements.

## Type Safety

### Strict Mode Always
```typescript
// ✅ DO: Use strict TypeScript settings
interface Provider {
  readonly id: string
  name: string
  specialty: Specialty
  verified: boolean
}

// ❌ DON'T: Use any or skip types
function processData(data: any) { ... }
```

### Explicit Types Over Inference
```typescript
// ✅ DO: Explicit return types
function searchProviders(query: SearchQuery): Promise<Provider[]> {
  // implementation
}

// ❌ DON'T: Rely on inference for complex types
function searchProviders(query) { ... }
```

## Architecture Patterns

### Shared Types First
```typescript
// Use types from packages/types
import type { Provider, SearchResult } from '@nav-med-ai/types'

// ✅ DO: Import and extend shared types
interface ProviderCardProps extends Provider {
  onSelect: (provider: Provider) => void
}
```

### Service Layer Pattern
```typescript
// ✅ DO: Clean service abstraction
export class ProviderService {
  constructor(private readonly api: ProviderAPI) {}

  async search(query: SearchQuery): Promise<SearchResult> {
    return this.api.search(query)
  }
}
```

## Error Handling

### Result Types for Business Logic
```typescript
// ✅ DO: Use Result types for domain operations
type SearchResult<T> =
  | { success: true; data: T }
  | { success: false; error: SearchError }

function searchProviders(query: SearchQuery): Promise<SearchResult<Provider[]>> {
  // implementation
}
```

### Proper Error Types
```typescript
// ✅ DO: Typed errors
export class ValidationError extends Error {
  constructor(
    message: string,
    public readonly field: string,
    public readonly code: string
  ) {
    super(message)
  }
}
```

## React Best Practices

### Custom Hooks for Logic
```typescript
// ✅ DO: Extract business logic to hooks
export function useProviderSearch() {
  const [results, setResults] = useState<Provider[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(async (query: SearchQuery) => {
    setLoading(true)
    try {
      const result = await providerService.search(query)
      setResults(result.data)
    } finally {
      setLoading(false)
    }
  }, [])

  return { results, loading, search }
}
```

### Component Props Typing
```typescript
// ✅ DO: Strict component props
interface SearchFormProps {
  onSearch: (query: SearchQuery) => void
  loading?: boolean
  className?: string
}

export function SearchForm({ onSearch, loading, className }: SearchFormProps) {
  // implementation
}
```

## Testing Standards

### Test Structure
```typescript
// ✅ DO: Comprehensive test coverage
describe('ProviderService', () => {
  describe('search', () => {
    it('returns providers matching specialty', async () => {
      // test implementation
    })

    it('handles network errors gracefully', async () => {
      // test implementation
    })
  })
})
```

## Compliance Considerations

### No PHI in Code
```typescript
// ❌ DON'T: Hardcode sensitive data
const exampleProviders = [
  { id: '1', name: 'Dr. Smith', ssn: '123-45-6789' } // NEVER DO THIS
]

// ✅ DO: Use test data generators
const mockProvider = createMockProvider()
```

### Secure Defaults
```typescript
// ✅ DO: Secure by default
export function createAPIClient(config: APIConfig) {
  return new APIClient({
    ...config,
    timeout: config.timeout ?? 5000, // Reasonable default
    retryAttempts: config.retryAttempts ?? 3,
    headers: {
      'X-API-Key': config.apiKey,
      // Add security headers
    }
  })
}
```

## Performance Guidelines

### Memoization When Appropriate
```typescript
// ✅ DO: Memoize expensive computations
export const getProviderDisplayName = memoize((provider: Provider): string => {
  return `${provider.title} ${provider.firstName} ${provider.lastName}`
})
```

### Lazy Loading
```typescript
// ✅ DO: Lazy load components
const ProviderDetails = lazy(() => import('./ProviderDetails'))
```
