const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("proxy");
  app.use(
    createProxyMiddleware("/api", {
      target: "https://openapi.naver.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api/": "/",
      },
    })
    // createProxyMiddleware("/board/**", {
    //   target:
    //     "http://ec2-15-164-100-174.ap-northeast-2.compute.amazonaws.com:3100/",
    //   changeOrigin: true,
    // }),
    // createProxyMiddleware("/search", {
    //   target: "http://localhost:3001/",
    //   changeOrigin: true,
    // })
  );
};

/*
cors를 해결 하는 방법
1. package.json 파일에 "proxy" : "https://openapi.naver.com" 을 작성해준다
-> axios.get(' ') url 변경 해주기 ('https://openapi.naver.com/v1/search/local.json') ->   
  (/v1/search/local.json') 이렇게 바꾸기
- 단점
  1. 서버 배포나 github page 배포시 cors해결 불가능
  2. 개발 환경에서만 가능
  3. 여러개 호출 못하고 1개만 가능

2. proxy server 생성 -> http-proxy-middelware  ( npm install )
-> setupProxy 파일 생성 
-> ('https://openapi.naver.com/v1/search/local.json') ->   
  (/api/v1/search/local.json') 이렇게 바꾸기
- 단점
  1. 서버 배포시 불가능
  2. 여러개 proxy 호출은 가능

  -> 나는 2번째 방법이 돠지 않아 1번째 방법을 일단 사용중 
*/
