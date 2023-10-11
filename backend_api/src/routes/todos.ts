import express from "express";
import controller from '../controllers/todos';

const router = express.Router();

// Get All Todos
// GET /api/todos
router.get('/', controller.getAllTodos);

// Get Single Todo by ID
// GET /api/todos/:id
router.get('/:id', controller.getTodoById);

// Create a Todo
// POST /api/todos
router.post('/', controller.createTodo);

// Update a Todo
// PATCH /api/todos/:id
router.patch('/:id', controller.updateTodo);

// Delete a Todo
// DELETE /api/todos/:id
router.delete('/:id', controller.deleteTodo);

export default router;