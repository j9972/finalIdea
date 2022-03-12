const express = require('express');
require('express-async-errors');
// express module 호출

const app = express();
const PORT = 3003;
const cors = require('cors');
// cors 를 부르기 위한 모듈 호출

const cookieParser = require('cookie-parser');
// cookie-parser 호출 : cookie를 사용하기 위한 모듈 : cookie는 f12창 application에서 key & value 값을 보기 위한 작은 데이터 정보라고 생각하기

const db = require('./models');
// model ( db column 생성을 위한 폴더 ) 연결

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// npm cors module를 선언 해주지 않으면 cors() 문제가 발생. 이는, 포트넘버, 도메인,서브도메인 등 하나라도 다르면 발생

app.use(cookieParser());

// Routers -> 변수명을 지정하고 서버에서 연결을 할때 ' '뒤의 url을 나중에 localhost 포트넘버 뒤에 연결을 해줘야 함.
// 변수 지정시 require로 route폴더 안에 있는 파일을 연결을 해줘야 한다.
const usersRouter = require('./routes/Users');

app.use('/user', usersRouter);

const SearchRouter = require('./routes/Search');

app.use('/search', SearchRouter);

// sequelize를 실행하고 이를 위해서 app.listen을 묶어줘야 한다.
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`running on ${PORT}`);
  });
});
