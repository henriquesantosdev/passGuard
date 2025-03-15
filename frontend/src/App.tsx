import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { ErrorNotFound } from './pages/Error-not-found'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='*' element={<ErrorNotFound/>} />
    </Routes>
  )
}

export default App
