# Todo API


## 할 일 추가하기

```js

async function addTodo() {
	try {
		response = await fetch('https://todo-api-ywvy.onrender.com/todos', {
			method: 'POST',
			body: JSON.stringify({
			text: '할 일을 입력하세요',
			}),
			headers: {
			'Content-Type': 'application/json',
			},
		});
		} catch (error) {
		alert('할 일을 전송하는데 실패하였습니다.');
		return;
		};

		if (!response.ok) {
		alert('할 일을 전송하는데 실패하였습니다.');
		return;
		};
}

```

## 할 일 불러오기

```js

async function loadTodos() {
	let response;
	try {
		response = await fetch('https://todo-api-ywvy.onrender.com/todos'); // GET Request
	} catch (error) {
		alert('할 일을 불러오는데 실패하였습니다!');
		return;
	}

	if (!response.ok) {
		alert('할 일을 불러오는데 실패하였습니다!');
		return;
	}

	const responseData = await response.json();
	const todos = responseData.todos;  // [{"text": "...", "id": "..."}, {...}]
}

```

## 할 일 수정하기

Edit 버튼을 누르면 텍스트 입력 창에 원래의 할 일이 로드되고, 해당 할 일을 수정하고, Save 버튼을 누르시면 할 일이 수정됩니다.

Vue.js의 경우,

```js

const TodosApp = {
	data() { 
		return {
			isLoading: true,
			todos: [],
			enteredTodoText: '',
			selectedTodoId: null
		};
	},
};

```

### 원래 할 일 인풋 필드에 로드

```js

async function editTodo(todoId) { // edit 버튼에 해당 함수 적용 및 todo.id 적용 
	this.selectedTodoId = todoId; 
	const todo = this.todos.find((todoElement) => { // id값이 일치하는 todos 내 객체
		return todoElement.id === this.selectedTodoId; // true or false
	});

	this.enteredTodoText = todo.text; // 입력 란 미리 채우기
}

``` 

### 할 일 수정

```js

event.preventDefault(); // 브라우저의 자동 HTTP Request 방지

let response;
	const todoId = this.selectedTodoId;

	let response;
	try {
		response = await fetch('https://todo-api-ywvy.onrender.com/todos' + todoId, {
		method: 'PATCH',
		body: JSON.stringify({
			newText: this.enteredTodoText,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
		});
	} catch (error) {
		alert('업데이트에 실패하였습니다.');
		return;
	}
	
	if (!response.ok) {
		alert('업데이트에 실패하였습니다.');
		return;
	}

```

## 할 일 삭제

```js

async function deleteTodo() {
	let response;

	try {
		response = await fetch('https://todo-api-ywvy.onrender.com/todos' + todoId, {
		method: 'DELETE',
		});
	} catch (error) {
		alert('삭제 중 문제가 발생하였습니다.');
		return;
	}

	if (!response.ok) {
		alert('삭제 중 문제가 발생하였습니다.');
		return;
	}
}

```


/todos 로의 GET, POST, PATCH(:id 포함), DELETE(:id), 요청을 통해, 할 일을 페이지에 보여주고, 작성하고, 수정하고, 삭제할 수 있는 기능을 담당하는 API입니다. 