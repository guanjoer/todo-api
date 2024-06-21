const db = require('../data/database');
const mongodb = require('mongodb');


class Todo {
	constructor(text, id) {
		this.text = text;
		this.id = id;
	};

	static async getAllTodos() {
		const todoDocumnets =  await db.getDb().collection('todos').find().toArray();
		
		return todoDocumnets.map(function(todoDocument) {
			return new Todo(todoDocument.text, todoDocument._id); // DB의 값을 인스턴스화
		})
	};

	// static async getSingleTodo() {
	// 	if(!this.id) {
	// 		throw new Error('존재하지 않는 id로 읽어오려고 합니다!')
	// 	};

	// 	const todoId = new mongodb.ObjectId(this.id);
	// 	const todoDocument = await db.getDb().collection('todos').findOne({_id: todoId});

	// 	return new Todo(todoDocument.text, todoDocument._id); // DB의 값을 인스턴스화
	// }

	async save() {
		if(this.id) {
			const todoId = new mongodb.ObjectId(this.id);
			return await db.getDb().collection('todos').updateOne({_id: todoId}, {$set: {text: this.text}}) // Update
		} else {
			return await db.getDb().collection('todos').insertOne({text: this.text}); // Create
		}
	}

	async delete() {
		if(!this.id) {
			throw new Error('존재하지 않는 id로 삭제를 시도 중입니다!')
		}
		const todoId = new mongodb.ObjectId(this.id);
		return await db.getDb().collection('todos').deleteOne({_id: todoId});
	}
}


module.exports = Todo;