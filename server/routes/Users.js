const express = require('express');

const router = express.Router();

const bcrypt = require('bcrypt');

const saltRounds = 10;

// client로 부터 받은 정보를 넣기 위해서 사용하는 모듈
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded 을 분석해서 정보를 넣어줌
router.use(express.urlencoded({ extended: true }));

// application/json으로 들어오는 정보들을 넣기 위해서 사용하는 코드
router.use(bodyParser.json());

// const { sign } = require('jsonwebtoken');

const { Users } = require('../models');

const { validateToken } = require('../middlewares/AuthMiddleware');

router.post('/', async (req, res) => {
  const { email, username, nickname, password, checkingPassword } = req.body;

  const exUser = await Users.findOne({
    where: {
      email,
    },
  });
  if (exUser) {
    console.log('중복된 이메일 입니다');
    return res.status(409).json({ message: '중복된이메일입니다' });
  }
  console.log(
    'email: ',
    email,
    'username: ',
    username,
    'nickname: ',
    nickname,
    'password: ',
    password,
    'checkingPassword: ',
    checkingPassword,
  ); // header에 적으면 전부 undefined이 뜨네...

  return bcrypt.hash(password, saltRounds).then(async hash => {
    await Users.create({
      email,
      username,
      nickname,
      password: hash,
      checkingPassword: hash,
    });
    res.json('SUCCESS, NOW YOU GET YOUR ID');
    console.log('Success');
  });
});

router.get('/', (req, res) => {
  // res.json(req.user);
  res.json('hello');
  // res.json(req.body);
});

router.get('/user', validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;

/*
  if (email.match(/adkfjskldl/)) {
    return res.status(400).json({
      err: 'email format ppap',
      msg: '이메일 형식이 유효하지 않습니다.',
    });
  }
*/
