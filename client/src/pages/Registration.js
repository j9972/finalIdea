import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

function Registration() {
  const Swal = require("sweetalert2");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkingPassword, setCheckingPassword] = useState("");
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const history = useHistory();

  const initialValues = {
    email: "",
    username: "",
    nickname: "",
    password: "",
    checkingPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string("string").required("이메일란 입력이 필요합니다"),
    username: Yup.string("string").required("needed"),
    nickname: Yup.string("string")
      .min(3, "min")
      .max(20, "max")
      .required("needed"),
    password: Yup.string("string")
      .min(4, "min")
      .max(20, "max")
      .required("needed"),
    checkingPassword: Yup.string("string")
      .min(4, "min")
      .max(20, "max")
      .required("needed"),
  });

  const onEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    console.log(email);
  };

  const registerButton = document.querySelector("#register_btn");

  // 삼항 연산자 쓰자 condition ? exprIfTrue : exprIfFalse
  const btnDisabled = (e) => {
    registerButton.disabled = true;
    console.log("버튼 안눌림");
  };

  const register = (e) => {
    if (password !== checkingPassword) {
      btnDisabled();
      return setPasswordError(true);
    }
    if (!term) {
      btnDisabled();
      return setTermError(true);
    }

    console.log({
      email,
      password,
      checkingPassword,
      term,
    });
    console.log("submit");
  };

  // 에러 수정하고 다시 회원가입 누르면, error가 안나서 undefined뜸. 그래서 typeError
  const overlapEmail = (error) => {
    if (error.message === "Request failed with status code 409") {
      console.log("메일중복 ");
      Swal.fire("중복된 이메일입니다");
      btnDisabled();
    } else {
      console.log("email input : ", error);
    }

    if (error !== false) {
      registerButton.disabled = false;
    }
  };

  const onSubmit = (data) => {
    register();
    axios
      .post("http://localhost:3003/user", data)
      .then((res) => {
        console.log("res: ", res, "data: ", data);
      })
      .catch((error) => {
        //console.log(JSON.stringify(error));
        overlapEmail(error);
      });
    history.push("/home");
  };

  const onChangePassword = (e) => {
    const changePasswordValue = e.target.value;
    setPassword(changePasswordValue);
    console.log("changePasswordValue :", changePasswordValue);
  };

  const onChangePasswordChk = (e) => {
    setPasswordError(e.target.value !== password);
    setCheckingPassword(e.target.value);
    console.log("e.target.value:", e.target.value);
  };
  const onChangeTerm = (e) => {
    setTermError(false);
    setTerm(e.target.checked);
  };

  const goBack = () => {
    console.log("go_back_homepage");
    history.push("#");
  };

  const chkEmail = (str) => {
    console.log("this is str: ", str);
    const regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(str) ? true : false;
  };

  // 이메일 형식 체크
  const email_check = (e) => {
    chkEmail(email);
    // overlapEmail(e) -> SyntheticBaseEvent 가 나옴
    if (chkEmail(email) === true) {
      overlapEmail(email);
      // overlapEmail(e);  // -> 제 역할을 못함.. -> overlapEmail의 else 문의 email input이 email 창이 나온다.
      console.log("true");
      return true;
    } else {
      Swal.fire("이메일 형식이 틀렸습니다."); // swal 말고 빨간 테두리 만들기
      console.log("false");
      //btnDisabled(); -> error 가 나옴
      // return false;
    }
  };

  return (
    <div className="registration_main_content">
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ errors }) => (
          <Form className="form_Registration">
            <label id="main_name">SIGN UP</label>
            <p id="intro_mention">여행의 시작! - 여행가자</p>
            <label>이메일</label>
            <div className="email_content">
              <Field
                autoComplete="off"
                id="input_email"
                name="email"
                onKeyUp={onEmailChange}
                onBlur={() => {
                  email_check(email);
                }}
              />
              <button type="button" id="email_check_btn" onClick={email_check}>
                확인
              </button>
            </div>
            {errors.email && <div>{errors.email}</div>}

            <label>이름</label>
            <Field
              autoComplete="off"
              type="text"
              className="input_register"
              name="username"
            />

            <label>닉네임</label>
            <Field
              autoComplete="off"
              type="text"
              className="input_register"
              name="nickname"
            />

            <label>비밀번호</label>
            <Field
              autoComplete="off"
              type="password"
              className="input_register"
              name="password"
              onKeyUp={onChangePassword}
            />

            <label>비밀번호확인</label>
            <Field
              autoComplete="off"
              type="password"
              className="input_register"
              onKeyUp={onChangePasswordChk}
              name="checkingPassword"
            />
            {passwordError && (
              <div className="termerror">비밀번호가 일치하지 않습니다.</div>
            )}

            <div className="checkbox_info">
              <div id="first_span">
                <span id="info1">
                  <input
                    className="checkContent"
                    type="checkbox"
                    value={term}
                    onChange={onChangeTerm}
                    name="term"
                  />
                  <label id="agree_info1">개인정보수집에 동의합니다</label>
                  <a href="https://www.myro.co.kr/" target="_blank">
                    보기
                  </a>
                </span>
              </div>
              <div id="second_span">
                <span id="info2">
                  <input
                    className="checkContent"
                    type="checkbox"
                    value={term}
                    onChange={onChangeTerm}
                    name="term2"
                  />
                  <label id="agree_info2">이용약관에 동의합니다</label>
                  <a href="https://www.myro.co.kr/" target="_blank">
                    보기
                  </a>
                </span>
              </div>
            </div>
            {termError && (
              <div className="termerror">약관에 동의하셔야 합니다.</div>
            )}

            {/* 이렇게하면 converting circular structure to JSON  에러남*/}
            <button type="submit" id="register_btn">
              {/* <button type="button" id="register_btn" onClick={onSubmit}> */}
              회원가입
            </button>
            <button type="button" id="back_btn" onClick={goBack}>
              뒤로가기
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;
