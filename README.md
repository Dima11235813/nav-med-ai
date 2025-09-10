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

# Build shared packages first (required for workspace dependencies)
npm run build:packages
```

### Workspace Setup

This is a **npm workspace monorepo** with the following structure:

- **Root package**: Manages overall dependencies and scripts
- **Shared packages**: `@nav-med-ai/*` packages in `/packages/`
- **Applications**: Frontend and backend apps in `/apps/`

**Important**: Always build shared packages before running applications:
```bash
npm run build:packages
```

### Development

#### Full Stack Development (Recommended)
```bash
# Start the complete application with hot reloading
npm start
# This runs: frontend (port 3000) + backend (port 3001) + future data services
```

#### Individual Service Development
```bash
# Frontend only (with hot module reloading)
npm run dev:web
# Access: http://localhost:3000

# Backend API only (with auto-restart)
npm run dev:api
# Access: http://localhost:3001
# API Docs: http://localhost:3001/api

# Future: Data pipeline service
npm run dev:data
```

#### Development Workflow

1. **Start services**: `npm start` (all services)
2. **Frontend development**:
   - Hot reloading enabled
   - TypeScript checking
   - ESLint integration
   - Access at http://localhost:3000

3. **Backend development**:
   - Auto-restart on changes
   - Swagger docs at http://localhost:3001/api
   - TypeScript compilation
   - Integrated testing

4. **Shared package development**:
   - Modify packages in `/packages/`
   - Rebuild: `npm run build:packages`
   - Restart dependent services

### Production Build

```bash
# Build all services
npm run build

# Build outputs:
# - Frontend: apps/web/dist/ (static files for web server)
# - Backend: apps/api/dist/ (compiled TypeScript for Node.js)
# - Shared packages: packages/*/dist/ (compiled libraries)
```

### Build Process Details

The build process follows this sequence:

1. **Shared Packages**: Build `@nav-med-ai/*` packages first
   ```bash
   npm run build:packages
   ```

2. **Applications**: Build frontend and backend
   ```bash
   cd apps/web && npm run build      # Vite production build
   cd apps/api && npm run build      # NestJS production build
   ```

3. **Optimization Features**:
   - **Frontend**: Code splitting, minification, asset optimization
   - **Backend**: TypeScript compilation, source maps
   - **Shared**: Tree shaking, dead code elimination

### Monorepo Tooling

This project uses **npm workspaces** for monorepo management:

- **Shared Dependencies**: Packages in `/packages/` are automatically linked
- **Workspace Protocol**: `workspace:*` dependencies resolve to local packages
- **Build Dependencies**: Shared packages must be built before applications
- **Development**: Hot reloading works across all services simultaneously

## 📋 Available Scripts

The root `package.json` provides these development scripts:

| Script | Description |
|--------|-------------|
| `npm start` | Start full stack (frontend + backend + hot reloading) |
| `npm run dev:full` | Same as `npm start` |
| `npm run dev:web` | Frontend only development server |
| `npm run dev:api` | Backend only development server |
| `npm run dev:data` | Data pipeline service (future) |
| `npm run build` | Build all services for production |
| `npm run build:packages` | Build shared packages |
| `npm run test` | Run tests across all services |
| `npm run lint` | Run linting across all services |
| `npm run clean` | Clean all build artifacts |
| `npm run install:all` | Install dependencies for all services |
| `npm run setup` | Complete setup (install + build packages) |

## 📋 Services

### Frontend (React + TypeScript)
- **URL**: http://localhost:3000
- **Tech**: React 18, TypeScript, Vite, Tailwind CSS
- **Features**:
  - Provider search form with validation
  - Responsive mobile-first design
  - Accessibility (WCAG 2.1 AA compliant)
  - Hot module reloading during development
  - TypeScript for type safety
  - Tailwind CSS for styling
  - React Router for navigation
  - Axios for API communication

### Backend API (NestJS)
- **URL**: http://localhost:3001
- **API Docs**: http://localhost:3001/api (Swagger UI)
- **Tech**: NestJS, TypeScript, Swagger/OpenAPI
- **Features**:
  - RESTful API endpoints
  - Automatic API documentation
  - Rate limiting and CORS protection
  - Input validation with class-validator
  - TypeScript compilation
  - Auto-restart during development
  - Modular architecture with dependency injection
  - Helmet security middleware

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

#### Development Commands
```bash
# Build shared packages (run after modifying packages/*)
npm run build:packages

# Run linting across all services
npm run lint

# Run tests across all services
npm run test

# Clean all build artifacts
npm run clean

# Install dependencies for all services
npm run install:all
```

#### Service-Specific Development
```bash
# Frontend development commands
cd apps/web
npm run dev          # Start with hot reloading
npm run build        # Production build
npm run lint         # Lint frontend code
npm run test         # Run frontend tests
npm run test:ui      # Run tests with UI

# Backend development commands
cd apps/api
npm run start:dev    # Start with auto-restart
npm run build        # Production build
npm run test         # Run backend tests
npm run lint         # Lint backend code
```

#### Troubleshooting

**Common Issues:**

1. **Workspace dependency errors**:
   ```bash
   # Rebuild shared packages
   npm run build:packages

   # Reinstall all dependencies
   npm run install:all
   ```

2. **Port conflicts**:
   - Frontend: http://localhost:3000 (configurable in `apps/web/vite.config.ts`)
   - Backend: http://localhost:3001 (configurable via `PORT` environment variable)

3. **TypeScript compilation errors**:
   ```bash
   # Check specific package compilation
   cd packages/types && npm run build
   cd packages/ui && npm run build
   cd packages/config && npm run build
   ```

4. **Hot reloading not working**:
   - Ensure you're running `npm run dev:web` from the web app directory
   - Check browser console for errors
   - Verify Vite dev server is running on port 3000

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

## ⚙️ Development Environment Setup

### Environment Variables

Create `.env` files in each service directory:

**Root `.env` (optional):**
```env
NODE_ENV=development
```

**apps/api/.env:**
```env
PORT=3001
CORS_ORIGIN=http://localhost:3000
DATABASE_URL=postgresql://localhost:5432/nav_med_ai
JWT_SECRET=your-secret-key-here-change-in-production
NODE_ENV=development
```

**apps/web/.env:**
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE="Nav Med AI - Development"
VITE_NODE_ENV=development
```

### IDE Configuration

#### VS Code Recommended Extensions
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Bracket Pair Colorizer

#### VS Code Settings (`.vscode/settings.json`)
```json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.vscode-eslint",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "HTML"
  }
}
```

## 🚀 Deployment

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

## 📊 Current Implementation Status

### ✅ Completed Features

**Task T-0009**: Shared Packages Structure
- ✅ TypeScript monorepo packages created
- ✅ Build artifacts properly ignored
- ✅ Cross-package type sharing

**Task T-0001**: Frontend Search Form Component
- ✅ React search form with validation
- ✅ Specialty, city, state, ZIP input fields
- ✅ Form validation and error handling
- ✅ Responsive design implementation
- ✅ Accessibility features (WCAG 2.1 AA)
- ✅ TypeScript integration

**Full Stack Application**
- ✅ NestJS API backend with Swagger docs
- ✅ React frontend with Vite hot reloading
- ✅ Provider search API endpoints
- ✅ Mock data services
- ✅ CORS and security configuration
- ✅ Rate limiting implementation

### 🔄 In Progress / Future Features

**Story S-0001**: Search by Specialty and City
- ✅ Basic search form completed
- 🔄 Real database integration (planned)
- 🔄 Advanced filtering options (planned)
- 🔄 Search result pagination (planned)

**Epic E-0002**: Core Provider Search
- ✅ Search functionality implemented
- 🔄 User authentication (planned)
- 🔄 Provider favorites/bookmarks (planned)
- 🔄 Advanced search filters (planned)

**Epic E-0001**: Public Data Pipeline
- 🔄 Data source integration (planned)
- 🔄 Healthcare.gov API integration (planned)
- 🔄 CDC WONDER data processing (planned)
- 🔄 Data quality monitoring (planned)

### 🧪 Testing Status

- ✅ Frontend: Vitest setup with React Testing Library
- ✅ Backend: Jest setup with Supertest
- ✅ Type safety: Full TypeScript coverage
- ✅ Linting: ESLint configuration for both services

### 🚀 Ready for Development

The application is **fully functional** for development and testing:

1. **Run**: `npm start`
2. **Frontend**: http://localhost:3000 (with hot reloading)
3. **Backend**: http://localhost:3001 (with auto-restart)
4. **API Docs**: http://localhost:3001/api (Swagger UI)

**Built with ❤️ using TypeScript, React, and NestJS**
