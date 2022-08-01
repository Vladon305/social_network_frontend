import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Login from './components/Login/Login'
import HomeContainer from './components/Home/HomeContainer'
import { fetchUser } from './utils/fetchUser'

const App: React.FC = () => {
  const navigate = useNavigate()

  const user = fetchUser()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [user, navigate])

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<HomeContainer />} />
    </Routes>
  )
}

export default App
