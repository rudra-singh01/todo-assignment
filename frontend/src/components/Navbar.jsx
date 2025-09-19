import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-800 hover:text-gray-600 transition-colors duration-300"
              onClick={closeMenu}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-semibold tracking-tight">TaskFlow</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* <Link
                  to="/todos"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-md"
                >
                  My Tasks
                </Link> */}
                <div className="hidden lg:flex items-center px-3 py-2 text-gray-600 text-sm bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {user?.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:text-red-700 font-medium bg-white/20 hover:bg-red-50/50 rounded-lg backdrop-blur-sm border border-white/20 hover:border-red-200 transition-all duration-300 hover:shadow-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:shadow-md"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-white font-medium bg-gray-800/80 hover:bg-gray-900/80 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-gray-900 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className={`h-5 w-5 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-80 opacity-100 visible pb-4'
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="mt-3 p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/20 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="flex items-center px-3 py-2 text-gray-600 text-sm bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Welcome, {user?.name}
                </div>
                {/* <Link
                  to="/todos"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-gray-700 hover:text-gray-900 font-medium bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  My Tasks
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-red-700 font-medium bg-white/10 hover:bg-red-50/30 rounded-lg backdrop-blur-sm border border-white/10 hover:border-red-200 transition-all duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-gray-700 hover:text-gray-900 font-medium bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="block px-4 py-3 text-white font-medium bg-gray-800/80 hover:bg-gray-900/80 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300 text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar