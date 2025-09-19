import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import TodoPage from '../pages/todo/TodoPage';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<TodoPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </Router>
  )
}

export default AppRoutes