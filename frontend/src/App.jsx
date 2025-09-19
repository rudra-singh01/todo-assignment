import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <div>
        <AppRoutes/>
      </div>
    </AuthProvider>
  )
}

export default App