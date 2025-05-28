//css파일
import "../CssPopupFolder/LoginPopup.css";

//라이브러리
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

//이미지
import kakaoLogin from "../../assets/img/kakao_login.png";

const User = {
  email: "abc@naver.com",
  pw: "System2000!!",
};

const clientId = "c2c0630ecffa6b96e8c78ef64478cf57";
const redirectUrl = "http://localhost:3000";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      alert("로그인에 성공했습니다.");
    } else {
      alert("등록되지 않은 회원이거나 입력한 값이 일치하지 않습니다.");
    }
  };

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  return (
    <div className="page">
      <div className="titleWrap">
        <br />
        로그인
      </div>
      <div className="contentWrap">
        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input
            type="text"
            className="input"
            placeholder="you@example.com"
            value={email}
            onChange={handleEmail}
          />
        </div>

        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일을 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
          />
        </div>

        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
      </div>

      <div className="buttonWrap">
        <button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          className="bottomButton"
        >
          로그인
        </button>
      </div>
      <hr nonshade />
      <div className="registerWrap">
        <div className="registerTitle">
          계정이 없으신가요? <Link to="/register">가입하기</Link>
        </div>
      </div>
      <div>
        <img
          src={kakaoLogin}
          alt="카카오로그인"
          className="kakao_login_btu"
          onClick={loginHandler}
        />
      </div>
    </div>
  );
}
