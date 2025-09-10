# Nav Med AI - Healthcare Navigation Platform

A modern, AI-powered healthcare navigation platform built with TypeScript, React, and NestJS.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Dima11235813/nav-med-ai.git
cd nav-med-ai

# Install all dependencies (root, web app, and API)
npm run install:all
```

### Development

```bash
# Start the full stack application (frontend + backend + hot reloading)
npm start

# Or start individual services:
npm run dev:web    # Frontend only (http://localhost:3000)
npm run dev:api    # Backend only (http://localhost:3001)
```

### Production Build

```bash
# Build all services
npm run build

# The web app will be built to apps/web/dist/
# The API will be built to apps/api/dist/
```

## 📋 Services

### Frontend (React + TypeScript)
- **URL**: http://localhost:3000
- **Tech**: React 18, TypeScript, Vite, Tailwind CSS
- **Features**: Provider search, responsive design, accessibility

### Backend API (NestJS)
- **URL**: http://localhost:3001
- **API Docs**: http://localhost:3001/api
- **Tech**: NestJS, TypeScript, Swagger/OpenAPI
- **Features**: Provider search API, rate limiting, CORS

## 🏗️ Architecture

```
nav-med-ai/
├── apps/
│   ├── web/           # React frontend application
│   └── api/           # NestJS backend API
├── packages/          # Shared packages
│   ├── types/         # TypeScript type definitions
│   ├── ui/            # React UI components
│   ├── config/        # Shared configuration
│   └── data-pipeline/ # Data processing utilities
└── package.json       # Root package with workspace config
```

## 🔧 Development Workflow

### Adding New Features

1. **Frontend**: Add components to `apps/web/src/components/`
2. **Backend**: Add modules to `apps/api/src/modules/`
3. **Shared**: Update packages in `packages/` directory
4. **Types**: Define interfaces in `@nav-med-ai/types`

### Code Quality

```bash
# Run linting across all services
npm run lint

# Run tests
npm run test

# Build all packages
npm run build
```

## 📚 API Documentation

When the API is running, visit http://localhost:3001/api for interactive Swagger documentation.

### Key Endpoints

- `GET /api/search/providers` - Search for healthcare providers
- `GET /api/providers/:id` - Get detailed provider information

### Example API Usage

```bash
# Search for cardiologists in Denver
curl "http://localhost:3001/api/search/providers?specialty=Cardiologist&city=Denver&state=CO"

# Get provider details
curl "http://localhost:3001/api/providers/1"
```

## 🎨 Frontend Features

- **Provider Search**: Search by specialty, city, and state
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: WCAG 2.1 AA compliant
- **Real-time Search**: Debounced search with loading states
- **Provider Details**: Comprehensive provider information display

## 🔒 Security & Compliance

- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Comprehensive request validation
- **Helmet**: Security headers for production

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 🚀 Deployment

### Environment Variables

Create `.env` files in each service directory:

**apps/api/.env:**
```env
PORT=3001
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/nav_med_ai
JWT_SECRET=your-secret-key
```

**apps/web/.env:**
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

### Production Considerations

- Set `NODE_ENV=production`
- Configure production database
- Set up proper CORS origins
- Enable HTTPS
- Configure rate limiting
- Set up monitoring and logging

## 🤝 Contributing

1. Follow the existing TypeScript/React patterns
2. Add tests for new features
3. Update API documentation for backend changes
4. Ensure accessibility compliance
5. Follow conventional commit format

## 📝 Project Structure Details

### Shared Packages

- **@nav-med-ai/types**: TypeScript interfaces and domain models
- **@nav-med-ai/ui**: Reusable React components and utilities
- **@nav-med-ai/config**: Shared configuration and environment variables
- **@nav-med-ai/data-pipeline**: Data harvesting and processing utilities

### Frontend Architecture

- **Components**: Reusable UI components in `src/components/`
- **Pages**: Page components in `src/pages/`
- **Hooks**: Custom React hooks in `src/hooks/`
- **Utils**: Utility functions in `src/utils/`
- **Types**: Frontend-specific types in `src/types/`

### Backend Architecture

- **Modules**: Feature-based modules in `src/modules/`
- **Controllers**: API endpoints and routing
- **Services**: Business logic and data access
- **DTOs**: Data transfer objects for validation
- **Entities**: Database entity definitions

## ⚠️ Disclaimer

This application is for educational and demonstration purposes only. It should not be used for actual medical decision-making. Always consult with qualified healthcare professionals for medical advice.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using TypeScript, React, and NestJS**
