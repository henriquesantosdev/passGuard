import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { ErrorNotFound } from './pages/Error-not-found'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='*' element={<ErrorNotFound/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Signup/>} />
    </Routes>
  )
}

export default App
