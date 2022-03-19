/*
import axios from "axios";
require("dotenv").config();

const api = axios.create({
  //baseURL: "/api"
  baseURL: "/",
  headers: {
    "X-Naver-Client-Id": process.env.REACT_APP_NAVER_MAP_ID_KEY,
    "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_MAP_SECRET_KEY,
    "Access-Control-Allow-Origin": "*",
  },
});

export const naverLocalApi = {
  search: (word) =>
    //api.get("/api/v1/search/local.json", {
    api.get("/v1/search/local.json", {
      params: {
        query: word,
        display: 1,
        start: 1,
        sort: "random",
      },
    }),
};


searching.js으로 api 정보를 뿌려주는 페이지

export naverLocalApi를 내보내서 사용하고자 하는 페이지에서 이 변수를 가져다 사용하면 된다
header 내용과 url의 params를 가져다 줌
*/
