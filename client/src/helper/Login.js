import "../CSSFILE/Login.css";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert";

//임시 import
// import { KAKAO_AUTH_URL } from "./OAuth";

async function loginUser(data) {
  let emailValue = document.querySelectorAll("#email");
  let passwordValue = document.querySelectorAll("#password");

  axios
    .post("http://localhost:3003/user/login", data)
    .then((res) => {
      console.log(res);

      window.location.href = "http://localhost:3000/home";
      return true;
    })
    .catch((err) => {
      // 아이디,비밀번호 오류일 경우
      console.log("err: ", err);
      if (err.response.status === 401) {
        const data = err.response.data.error;
        console.log(data);
        Swal("Failed", data, "error");
        emailValue.value = null;
        passwordValue.value = null;
      } else {
        console.log("전송시에 문제가 생김");
      }
    });
}

function Login() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required(),
    }),
    onSubmit: (values) => {
      loginUser(values);
    },
  });
  return (
    <div className="App">
      <div className="container">
        <div className="text">LOG IN</div>
        <div className="small-text">여행 스케쥴링 플래너 - MYHERO</div>
        <div className="form-container">
          <form onSubmit={formik.handleSubmit}>
            <div className="data">
              <label>이메일</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="form-input-validation">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="data">
              <label>비밀번호</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                required
              ></input>
            </div>
            <div className="forgot-pass">
              <a href="https://www.myro.co.kr/findPassword">
                비밀번호를 잊으셨나요?
              </a>
            </div>
            <div className="btn">
              <div className="inner"></div>
              <button type="submit">로그인</button>
            </div>
            <div className="signup-link">
              회원이 아니세요?{" "}
              <a href="https://www.myro.co.kr/emailSignUp">회원가입하기</a>
            </div>
          </form>
        </div>

        <div className="divider-container">
          <div className="divider"></div>
          <span>or</span>
        </div>

        <div className="sns-text">SNS 간편 로그인</div>

        <div className="socialBtn-container">
          <div className="socialBtn">
            <div className="socialBtn-image-container">
              {/* <a href={KAKAO_AUTH_URL}> */}
              <img
                src="https://mblogthumb-phinf.pstatic.net/MjAyMDA3MTRfMjI5/MDAxNTk0NzI5NzcyMDMz.X2YVWOeE6fwrOSnUiARthmNM9a4mfRnneetw1hTtyHIg.1Tqwf_4qgAqc1v3jE6xbzobcrV3X6yN8JVUVwjlRGkog.JPEG.xuni1021/%EC%B9%B4%EC%B9%B4%EC%98%A4%ED%86%A1-%EB%A1%9C%EA%B3%A0-ai-3.jpg?type=w800"
                alt="logo"
              />
              {/* </a> */}
            </div>
          </div>
          <div className="socialBtn">
            <div className="socialBtn-image-container">
              <img
                src="https://t1.daumcdn.net/cfile/tistory/236A893A57C3AA6629"
                alt="logo"
              />
            </div>
          </div>
          <div className="socialBtn">
            <div className="socialBtn-image-container">
              <img
                src="https://blog.kakaocdn.net/dn/kNLCY/btq33aFCwIZ/GG5w46bI4JhIP00XdDrun0/img.jpg"
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
