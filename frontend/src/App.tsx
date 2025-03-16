import { Route, Routes } from 'react-router-dom'
import { ErrorNotFound } from './pages/Error-not-found'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Dashboard } from './pages/Dashboard'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='*' element={<ErrorNotFound/>} />
    </Routes>
  )
}

export default App
