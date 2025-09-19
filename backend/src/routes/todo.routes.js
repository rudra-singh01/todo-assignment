import express from "express";
import { Routes } from "react-router-dom";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createTodo, deleteTodo, getTodo, updateStatus, updateTodo } from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/create",authMiddleware , createTodo)
router.get("/get-all",authMiddleware , getTodo)
router.post('/update-status/:id',authMiddleware , updateStatus)
router.post('/update-todo/:id',authMiddleware , updateTodo)
router.delete('/delete-todo/:id',authMiddleware , deleteTodo)


export default router;