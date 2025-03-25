import { Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import AuthProvider from './contexts/auth/AuthProvider'
import PrivateRoutes from './pages/Private-routes'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='*' element={<Signin />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
