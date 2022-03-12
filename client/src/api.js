import axios from "axios";

const ID_KEY = "dPmjFL2OZv1Mm2tnscFu";
const SECRET_KEY = "2zs88gHEdE";

const api = axios.create({
  //baseURL: "/api"
  baseURL: "/",
  headers: {
    "X-Naver-Client-Id": ID_KEY,
    "X-Naver-Client-Secret": SECRET_KEY,
    "Access-Control-Allow-Origin": "*",
  },
});

export const naverLocalApi = {
  search: (word) =>
    //api.get("/api/v1/search/local.json", {
    api.get("/v1/search/local.json", {
      params: {
        query: word,
        display: 20,
        start: 1,
        sort: "random",
      },
    }),
};

/*
searching.js으로 api 정보를 뿌려주는 페이지

export naverLocalApi를 내보내서 사용하고자 하는 페이지에서 이 변수를 가져다 사용하면 된다
header 내용과 url의 params를 가져다 줌
*/
