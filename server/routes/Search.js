const express = require('express');

const router = express.Router();
require('dotenv').config();

const axios = require('axios');

router.use(express.urlencoded({ extended: false }));

router.use(express.json());

/*
server 브라우져에서 /search를 기본적 router로 연결해 놓았으므로 밑에 url이 /search라고해서
localhost:30/search 가 아니라 localhost:3003/search/search 로 접근해야하고 
이렇게만 접근하면 무한 루프 걸림 -> /search 뒤에 query문 연결해주기
*/
router.post('/search', async (req, res) => {
  const search = req.body.search;
  console.log('search:', search);

  //const data = naverLocalApi.search(search);

  axios
    .get('https://openapi.naver.com/v1/search/local.json', {
      params: {
        query: search,
        display: 1,
        start: 1,
        sort: 'random',
      },
      headers: {
        'X-Naver-Client-Id': 'dPmjFL2OZv1Mm2tnscFu',
        'X-Naver-Client-Secret': '2zs88gHEdE',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 200) {
        const items = response.data.items;
        items.map(x => {
          x.title = x.title.replace(/<b>/g, '');
          x.title = x.title.replace(/<\/b>/g, '');
          // <b> 없애줌
          // 참고로 replace 메서드는 첫번재 파라미터가 리터럴일 경우 일치하는 첫번째 부분만 변경하기 때문에 전부 찾을 수 있도록 정규표현식으로 g를 포함
        });
        res.json(items);
      }
    })
    .catch(error => {
      console.log('error:', error);
    });

  //res.json('success connect with server');
});

router.get('/', (req, res) => {
  res.json('hello');
});

module.exports = router;
