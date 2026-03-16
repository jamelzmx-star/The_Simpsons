import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/store/AuthContext'
import ProtectedRoute from '@/components/ui/ProtectedRoute'
import Layout from '@/components/layout/Layout'

// Pages
import AuthPage       from '@/features/auth/AuthPage'
import Dashboard      from '@/features/simpsons/components/Dashboard'
import CharactersPage from '@/features/simpsons/components/CharactersPage'
import EpisodesPage   from '@/features/simpsons/components/EpisodesPage'
import LocationsPage  from '@/features/simpsons/components/LocationsPage'
import StatsPage      from '@/features/simpsons/components/StatsPage'

const PROTECTED = [
  { path: '/dashboard',  element: <Dashboard /> },
  { path: '/characters', element: <CharactersPage /> },
  { path: '/episodes',   element: <EpisodesPage /> },
  { path: '/locations',  element: <LocationsPage /> },
  { path: '/stats',      element: <StatsPage /> },
]

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      {PROTECTED.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <Layout>{element}</Layout>
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#FED90F',
              color: '#1A1A1A',
              border: '3px solid #1A1A1A',
              borderRadius: '12px',
              boxShadow: '4px 4px 0 #1A1A1A',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
            },
            success: { iconTheme: { primary: '#1A1A1A', secondary: '#FED90F' } },
            error: {
              style: {
                background: '#E63946',
                color: 'white',
                border: '3px solid #1A1A1A',
                boxShadow: '4px 4px 0 #1A1A1A',
              },
            },
          }}
        />
      </HashRouter>
    </AuthProvider>
  )
}
