const express = require('express');

const db = require('./data/database');

// Routes
const todoRoutes = require('./routes/todo.routes');


const enableCorsMiddleware = require('./middlewares/enable-cors');

const app = express();

app.use(enableCorsMiddleware); // 서버 측 리소스를 사용 할 수 있게 만드는 미들 웨어 // 즉 서버 측 로직이 실행되는 서버와 다른 곳에서 실행되는 서버가 서버 측 로직이 실행되는 서버에 접근하기 위해서는 해당 설정이 필요하다.
app.use(express.urlencoded({extended: false})); // For attached Request datas in req.body
app.use(express.json()); // JSON 파싱 미들웨어


app.use('/todos', todoRoutes);

app.use(function(error, req, res, next) {
	res.status(500).json({ // 서버 측 오류
		message: 'Something went wrong!'
	})
})


const PORT = process.env.PORT || 8080; 
  db.connectToDbServer()
  .then(function() {
	  app.listen(PORT);
  })
  .catch(function(error) {
	  console.log('데이터베이스와의 연결에 실패하였습니다!');
	  console.log('error');
  });