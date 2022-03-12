const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');

const axios = require('axios');

const ID_KEY = 'dPmjFL2OZv1Mm2tnscFu';
const SECRET_KEY = '2zs88gHEdE';

router.use(express.urlencoded({ extended: true }));

router.use(bodyParser.json());

/*
server 브라우져에서 /search를 기본적 router로 연결해 놓았으므로 밑에 url이 /search라고해서
localhost:3003/search 가 아니라 localhost:3003/search/search 로 접근해야하고 
이렇게만 접근하면 무한 루프 걸림 -> /search 뒤에 query문 연결해주기
*/
router.get('/search', (req, res) => {
  const word = req.query.query;
  console.log('word: ', word);
  console.log('req.query: ', req.query);
  axios
    .get('https://openapi.naver.com/v1/search/local.json', {
      params: {
        query: word,
        display: 20,
        start: 1,
        sort: 'random',
      },
      headers: {
        'X-Naver-Client-Id': ID_KEY,
        'X-Naver-Client-Secret': SECRET_KEY,
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(response => {
      console.log(response.data.items[0].title);
      const item = response.data.items;
      res.send(item);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/', (req, res) => {
  res.json('hello');
});

module.exports = router;
