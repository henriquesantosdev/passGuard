import { Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'
import AuthProvider from './contexts/auth/AuthProvider'
import PrivateRoutes from './pages/Private-routes'
import { Profile } from './pages/Profile'
import LayoutMain from './pages/layout-main'

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<LayoutMain />}>

          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Signin />} />
          
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App
