import React, { useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { todoAPI } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import Navbar from '../../components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'

const TodoPage = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [newTodo, setNewTodo] = useState({ title: '', description: '', dueDate: '' })
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos()
    }
  }, [isAuthenticated])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await todoAPI.getAllTodos()
      setTodos(response.data)
      setError('')
      toast.success('Todos fetched successfully')
    } catch (err) {
      setError('Failed to fetch todos')
      console.error('Error fetching todos:', err)
      toast.error('Failed to fetch todos')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.title.trim()) return

    try {
      const response = await todoAPI.createTodo(newTodo)
      setTodos([...todos, response.data])
      setNewTodo({ title: '', description: '', dueDate: '' })
      toast.success('Todo created successfully')
      setShowCreateModal(false)
    } catch (err) {
      setError('Failed to create todo')
      toast.error('Failed to create todo')
      console.error('Error creating todo:', err)
    }
  }

  const handleEditTodo = (todo) => {
    setEditingTodo(todo)
    setShowEditModal(true)
  }

  const handleUpdateTodo = async (e) => {
    e.preventDefault()
    if (!editingTodo.title.trim()) return

    try {
      const response = await todoAPI.updateTodo(editingTodo._id, {
        title: editingTodo.title,
        description: editingTodo.description,
        dueDate: editingTodo.dueDate
      })
      setTodos(todos.map(todo =>
        todo._id === editingTodo._id ? response.data : todo
      ))
      setEditingTodo(null)
      toast.success('Todo updated successfully')
      setShowEditModal(false)
    } catch (err) {
      setError('Failed to update todo')
      console.error('Error updating todo:', err)
      toast.error('Failed to update todo')
    }
  }

  const handleToggleComplete = async (todo) => {
    try {
      await todoAPI.updateStatus(todo._id, !todo.completed)
      setTodos(todos.map(t => 
        t._id === todo._id ? { ...t, completed: !t.completed } : t
      ))
      toast.success('Todo status updated successfully')
    } catch (err) {
      setError('Failed to update todo status')
      toast.error('Failed to update todo status')
      console.error('Error updating todo status:', err)
    }
  }

  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return

    try {
      await todoAPI.deleteTodo(id)
      setTodos(todos.filter(todo => todo._id !== id))
      toast.success('Todo deleted successfully')
    } catch (err) {
      setError('Failed to delete todo')
      console.error('Error deleting todo:', err)
      toast.error('Failed to delete todo')
    }
  }

  // Professional Loading Component
  const LoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-12 border border-white/40 shadow-2xl w-full max-w-md">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-10 h-10 sm:w-12 sm:h-12 border-3 border-slate-300 border-r-transparent rounded-full animate-spin animation-delay-150" style={{animationDirection: 'reverse'}}></div>
          </div>
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">Loading Tasks</h3>
            <p className="text-slate-600 text-sm sm:text-base">Please wait while we fetch your data</p>
          </div>
        </div>
      </div>
    </div>
  )

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Navbar />
        <div className="max-w-4xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-12 border border-white/40 shadow-2xl w-full max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-3xl font-bold text-slate-800 mb-4">Access Required</h1>
              <p className="text-slate-600 text-sm sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto">
                Please sign in to access your personal task management dashboard
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-sm mx-auto">
                <Link
                  to="/login"
                  className="flex-1 bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/60 text-slate-800 font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex-1 bg-slate-800/90 hover:bg-slate-900 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-4 border border-white/40 shadow-xl w-full">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h5.586a1 1 0 00.707-.293l5.414-5.414a1 1 0 00.293-.707V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800">Task Manager</h1>
                  <p className="text-slate-600 mt-1 text-sm sm:text-base">Organize and track your daily tasks</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-slate-800/90 hover:bg-slate-900 text-white font-medium py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2 text-sm sm:text-base w-full sm:w-54"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Task</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50/80 backdrop-blur-lg border border-red-200/60 rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-800 font-medium text-sm sm:text-base">{error}</p>
              </div>
            </div>
          )}

          {/* Tasks List */}
          <div className="space-y-4">
            {todos.length === 0 ? (
              <div className="text-center py-12 sm:py-20">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 sm:p-12 border border-white/40 shadow-xl w-full max-w-md mx-auto">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 bg-slate-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h5.586a1 1 0 00.707-.293l5.414-5.414a1 1 0 00.293-.707V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">No tasks yet</h3>
                  <p className="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">Get started by creating your first task to stay organized and productive.</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-slate-800/90 hover:bg-slate-900 text-white font-medium py-2 sm:py-3 px-4 sm:px-8 rounded-xl transition-all duration-300 hover:shadow-lg text-sm sm:text-base"
                  >
                    Create First Task
                  </button>
                </div>
              </div>
            ) : (
              todos.map((todo) => {
                const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
                const isDueSoon = todo.dueDate && new Date(todo.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000) && !todo.completed

                return (
                  <div
                    key={todo._id}
                    className={`group backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl p-4 sm:p-6 transition-all duration-300 border ${
                      todo.completed
                        ? 'bg-slate-50/80 border-slate-200/60'
                        : isOverdue
                        ? 'bg-red-50/80 border-red-200/60'
                        : isDueSoon
                        ? 'bg-amber-50/80 border-amber-200/60'
                        : 'bg-white/80 border-white/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                      <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                        <button
                          onClick={() => handleToggleComplete(todo)}
                          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-1 ${
                            todo.completed
                              ? 'bg-slate-600 border-slate-600'
                              : 'border-slate-300 hover:border-slate-500'
                          }`}
                        >
                          {todo.completed && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-base sm:text-lg font-semibold transition-all duration-200 break-words ${
                            todo.completed ? 'text-slate-500 line-through' : 'text-slate-800'
                          }`}>
                            {todo.title}
                          </h3>
                          
                          {todo.description && (
                            <p className={`mt-2 text-xs sm:text-sm break-words ${
                              todo.completed ? 'text-slate-400' : 'text-slate-600'
                            }`}>
                              {todo.description}
                            </p>
                          )}
                          
                          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 text-xs">
                            <span className="bg-slate-100/80 backdrop-blur-sm text-slate-600 px-2 sm:px-3 py-1 rounded-full border border-slate-200/60">
                              Created {new Date(todo.createdAt).toLocaleDateString()}
                            </span>
                            
                            {todo.dueDate && (
                              <span className={`backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border font-medium ${
                                isOverdue
                                  ? 'bg-red-100/80 text-red-700 border-red-200/60'
                                  : isDueSoon
                                  ? 'bg-amber-100/80 text-amber-700 border-amber-200/60'
                                  : 'bg-blue-100/80 text-blue-700 border-blue-200/60'
                              }`}>
                                Due {new Date(todo.dueDate).toLocaleDateString()}
                              </span>
                            )}
                            
                            {todo.completed && (
                              <span className="bg-slate-100/80 backdrop-blur-sm text-slate-600 px-2 sm:px-3 py-1 rounded-full font-medium border border-slate-200/60">
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-2 flex-shrink-0 justify-end">
                        <button
                          onClick={() => handleEditTodo(todo)}
                          className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100/80 backdrop-blur-sm border border-slate-200/60 rounded-lg transition-all duration-200"
                          title="Edit task"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        <button
                          onClick={() => handleDeleteTodo(todo._id)}
                          className="p-1.5 sm:p-2 text-slate-500 hover:text-red-600 hover:bg-red-50/80 backdrop-blur-sm border border-slate-200/60 hover:border-red-200/60 rounded-lg transition-all duration-200"
                          title="Delete task"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Create Todo Modal */}
      <Transition appear show={showCreateModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowCreateModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-base sm:text-lg font-medium leading-6 text-white mb-4">
                    Create New Todo
                  </Dialog.Title>

                  <form onSubmit={handleCreateTodo} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={newTodo.title}
                        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-white placeholder-white/60 text-sm sm:text-base"
                        placeholder="Enter todo title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Description
                      </label>
                      <textarea
                        value={newTodo.description}
                        onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 resize-none text-white placeholder-white/60 text-sm sm:text-base"
                        placeholder="Enter todo description (optional)"
                        rows="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Due Date
                      </label>
                      <input
                        type="date"
                        value={newTodo.dueDate}
                        onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-white text-sm sm:text-base"
                      />
                    </div>

                    <div className="flex gap-2 sm:gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 backdrop-blur-md bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base"
                      >
                        Create Todo
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Edit Todo Modal */}
      <Transition appear show={showEditModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowEditModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-base sm:text-lg font-medium leading-6 text-white mb-4">
                    Edit Todo
                  </Dialog.Title>

                  {editingTodo && (
                    <form onSubmit={handleUpdateTodo} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={editingTodo.title}
                          onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-white placeholder-white/60 text-sm sm:text-base"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Description
                        </label>
                        <textarea
                          value={editingTodo.description}
                          onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 resize-none text-white placeholder-white/60 text-sm sm:text-base"
                          rows="3"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-white mb-2">
                          Due Date
                        </label>
                        <input
                          type="date"
                          value={editingTodo.dueDate ? new Date(editingTodo.dueDate).toISOString().split('T')[0] : ''}
                          onChange={(e) => setEditingTodo({ ...editingTodo, dueDate: e.target.value })}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200 text-white text-sm sm:text-base"
                        />
                      </div>

                      <div className="flex gap-2 sm:gap-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 backdrop-blur-md bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base"
                        >
                          Update Todo
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowEditModal(false)}
                          className="flex-1 backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 text-sm sm:text-base"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} />
    </div>
  )
}

export default TodoPage