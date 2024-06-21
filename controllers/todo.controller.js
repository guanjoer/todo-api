const Todo = require('../models/todo.model');

	
async function getAllTodos(req, res, next) { // 모든 Todo 리스트 가져오기
	let todos;
	try {
		todos = await Todo.getAllTodos();
	} catch (error) {
		error.code = 500;
		next(error);	
	};

	res.json({
		todos: todos // JSON 형태로 반환
	});

};

async function addTodo(req, res, next) {
	const todoText = req.body.text; // 사용자가 데이터를 보내는 곳에서, JSON의 key가 "text"여야 한다.
	const todo = new Todo(todoText);

	let insertedId;
	try {
		const result = await todo.save();
		insertedId = result.insertedId; // 할 일을 추가하고 결과로 프로미스를 반환하니, 해당 프로미스에는 mongodb 패키지에 의해 생성된 insertedId라는 property가 존재한다. 해당 property에는 mongodb document의 고유 id를 가지고 있다.
	} catch (error) {
		error.code = 500;
		next(error);		
	};

	todo.id = insertedId.toString(); // 문자열로 변환

	res.json({message: '성공적으로 할 일을 추가하였습니다!', createdTodo: todo}); // id가 포함된 인스턴스 반환
}

async function updateTodo(req, res, next) {
	const todoId = req.params.id; // url:port/path에 :id 존재
	const newTodoText = req.body.newText;

	const todo = new Todo(newTodoText, todoId);
	try {
		await todo.save();
	} catch (error) {
		error.code = 500;
		next(error);		
	};


	res.json({message: '성공적으로 할 일을 업데이트 하였습니다!', updatedTodo: todo});
}

async function deleteTodo(req, res, next) {
	const todoId = req.params.id;

	const todo = new Todo(null, todoId);

	try {
		await todo.delete();
	} catch (error) {
		error.code=500;
		next(error);
	}

	res.json({message: '성공적으로 할 일을 삭제하였습니다!'})
}

module.exports = {
	getAllTodos: getAllTodos,
	addTodo: addTodo,
	updateTodo: updateTodo,
	deleteTodo: deleteTodo,
};