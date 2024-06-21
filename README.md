# Todo API

- Todo App([View Todo App](https://github.com/mrguanjo/todo-app?tab=readme-ov-file))에 독립적으로 적용하기 위해 만든 API입니다.
- 할 일을 추가하고, 읽어오고, 수정하고, 삭제할 수 있는 API입니다.


**주의 사항**: 현재로써는, 모든 유저가 동일한 할 일의 관리를 받습니다. 즉 현재로써는 테스트의 목적인 API입니다.

## 목차
- [기술스택](#기술스택)
- [Usage](#usage)
  - [API 관련 코드](#api-관련-코드)
    - [할 일 추가](#할-일-추가)
    - [할 일 불러오기](#할-일-불러오기)
    - [할 일 수정하기](#할-일-수정하기)
      - [기존 할 일 Input Filed에 로드](#기존-할-일-input-filed에-로드)
      - [수정한 텍스트로 할 일 업데이트](#수정한-텍스트로-할-일-업데이트)
    - [할 일 삭제](#할-일-삭제)

## 기술스택

- **프레임워크**: `Node.js`, `Express.js`
- **데이터베이스**: `MongoDB`

## Usage

해당 API를 적용한 프론트앤드 앱의 로직을 통해 API 통합 방법에 대해 알아보세요 👇  
- [JS 코드](https://github.com/mrguanjo/todo-app/blob/main/scripts/todos-vue.js)
- [HTML 코드](https://github.com/mrguanjo/todo-app/blob/main/index.html)

### API 관련 코드

#### 할 일 추가

- https://todo-api-ywvy.onrender.com/todos 으로의 `POST` 요청을 통해 키가 `text`인 값을 할 일에 추가합니다.

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

#### 할 일 불러오기

- https://todo-api-ywvy.onrender.com/todos 으로의 `GET` 요청을 통해 DB에 저장된 모든 할 일을 불러옵니다.

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

#### 할 일 수정하기

- https://todo-api-ywvy.onrender.com/todos/:${todoId} 으로의 `PATCH` 요청을 통해 키가 `newText`인 값으로 할 일이 수정됩니다.
- `Edit` 버튼을 누르면 텍스트 입력 창에 원래의 할 일이 로드되고, 텍스트 입력값을 수정하고 , Save 버튼을 누르시면 할 일이 수정됩니다.

**Vue.js의 경우,**

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

##### 기존 할 일 Input Filed에 로드

```js

async function editTodo(todoId) { // edit 버튼에 해당 함수 적용 및 todo.id 적용 
	this.selectedTodoId = todoId; 
	const todo = this.todos.find((todoElement) => { // id값이 일치하는 todos 내 객체
		return todoElement.id === this.selectedTodoId; // true or false
	});

	this.enteredTodoText = todo.text; // 입력 란 미리 채우기
}

``` 

##### 수정한 텍스트로 할 일 업데이트

```js

event.preventDefault(); // 브라우저의 자동 HTTP Request 방지

let response;
	const todoId = this.selectedTodoId;

	let response;
	try {
		response = await fetch('https://todo-api-ywvy.onrender.com/todos/' + todoId, {
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

#### 할 일 삭제

- `DELETE` 버튼을 누르면 https://todo-api-ywvy.onrender.com/todos/${todoId} 으로의 `DELETE` 요청을 보내 `todoId`를 가진 **Element**를 삭제합니다.

```js

async function deleteTodo() {
	let response;

	try {
		response = await fetch('https://todo-api-ywvy.onrender.com/todos/' + todoId, {
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