# Nav Med AI Web Application

The frontend web application for the Nav Med AI healthcare navigation platform.

## 🚀 Features

- **Provider Search**: Search healthcare providers by specialty and location
- **Responsive Design**: Mobile-first design that works on all devices
- **Accessibility**: WCAG 2.1 AA compliant interface
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Built with Tailwind CSS and React components

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router** - Client-side routing
- **Vitest** - Testing framework
- **ESLint** - Code linting

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏃‍♂️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI

### Development Server

The development server runs on `http://localhost:3000` by default. It includes:

- Hot module replacement
- TypeScript checking
- ESLint integration
- Automatic browser refresh

### Project Structure

```
apps/web/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── styles/        # CSS and styling files
├── public/            # Static assets
├── tests/             # Test files
└── package.json       # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_TITLE=Nav Med AI
```

### Tailwind CSS

The application uses Tailwind CSS for styling. Custom styles are defined in `src/styles/index.css`.

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test -- --coverage
```

## 📱 Pages

### HomePage (`/`)
- Hero section with search form
- Feature highlights
- Statistics
- Footer with links

### SearchResultsPage (`/search`)
- Search results display
- Filtering and sorting options
- Provider cards with key information
- Pagination support

### ProviderDetailsPage (`/provider/:id`)
- Detailed provider information
- Contact details
- Reviews and ratings
- Booking integration

## 🎨 Components

### Core Components
- `SearchForm` - Main search interface
- `ProviderCard` - Provider information display
- `ProviderList` - List of provider cards

### Layout Components
- `Header` - Navigation header
- `Footer` - Site footer
- `Layout` - Page layout wrapper

### UI Components
- `Button` - Customizable button component
- `Input` - Form input fields
- `Select` - Dropdown selection
- `Loading` - Loading state indicator

## 🔒 Security

- All user inputs are validated
- No sensitive data stored in local storage
- HTTPS required in production
- Content Security Policy headers

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## 📊 Performance

- Code splitting with React.lazy
- Image optimization
- Bundle analysis with `npm run build`
- Lighthouse performance monitoring

## 🤝 Contributing

1. Follow the existing code style
2. Write tests for new features
3. Update documentation as needed
4. Ensure accessibility compliance
5. Test on multiple devices and browsers

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**⚠️ Disclaimer**: This application is for educational purposes only and should not be used for actual medical decision-making. Always consult with qualified healthcare professionals for medical advice.
