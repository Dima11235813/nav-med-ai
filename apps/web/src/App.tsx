import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import ProviderDetailsPage from './pages/ProviderDetailsPage'
import './styles/index.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/provider/:id" element={<ProviderDetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
