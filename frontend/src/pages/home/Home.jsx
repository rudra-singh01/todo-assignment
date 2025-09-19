import React from 'react'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/Navbar'

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="relative mx-auto w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
          </div>
          <div className="text-xl text-gray-700">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Glassmorphism background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <Navbar />
      <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-6xl sm:text-7xl mb-6">📝</div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Welcome to TODO App
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
                Stay organized and boost your productivity with our intuitive task management system
              </p>
            </div>

            {isAuthenticated ? (
              <div className="text-center">
                <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 sm:p-8 mb-8 border border-white/20">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">
                    Hello, {user?.name}! 👋
                  </h2>
                  <p className="text-white/80 mb-2">
                    You are successfully logged in
                  </p>
                  <p className="text-sm text-white/60">
                    {user?.email}
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">
                    Your TODO Dashboard
                  </h3>
                  <p className="text-white/80 text-lg">
                    Manage your tasks and stay organized
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="/todos"
                      className="backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      View My Todos
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 sm:p-8 mb-8 border border-white/20">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                    Get Started Today
                  </h2>
                  <p className="text-white/80 text-lg">
                    Please log in or register to access your personal TODO workspace
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/login"
                    className="backdrop-blur-md bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Sign In
                  </a>
                  <a
                    href="/register"
                    className="backdrop-blur-md bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Create Account
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-lg font-semibold text-white mb-2">Easy Task Management</h3>
              <p className="text-white/80">Create, edit, and organize your tasks with our intuitive interface</p>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-semibold text-white mb-2">Mobile Responsive</h3>
              <p className="text-white/80">Access your todos anywhere, anytime on any device</p>
            </div>

            <div className="backdrop-blur-md bg-white/10 rounded-xl p-6 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-in-up" style={{ animationDelay: '600ms' }}>
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure & Private</h3>
              <p className="text-white/80">Your data is protected with secure authentication</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home