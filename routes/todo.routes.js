const express = require('express');

const router = express.Router();

const todoController = require('../controllers/todo.controller');

router.get('/', todoController.getAllTodos); // PATH: /todos
	
router.post('/', todoController.addTodo);

router.patch('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;