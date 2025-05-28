//css파일
import "../CssPopupFolder/LoginPopup.css";

//라이브러리
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

//이미지
import kakaoLogin from "../../assets/img/kakao_login.png";
import NaverLogin from "../../assets/img/naver_login.png";

const User = {
  email: "abc@naver.com",
  pw: "System2000!!",
};

//카카오 로그인
const clientId = "c2c0630ecffa6b96e8c78ef64478cf57";
const redirectUrl = "http://localhost:3000";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;

//네이버 로그인
const NAVER_CLIENT_ID = "O75rHergSrGWoKHXM8ES"; // 발급받은 클라이언트 아이디
const REDIRECT_URI = "http://localhost:3000"; // Callback URL
const STATE = "flase";
const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const KakaoLoginHandler = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const NaverLoginHandler = () => {
    window.location.href = NAVER_AUTH_URL;
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
      <div className="title_wrap">
        <br />
        로그인
      </div>
      <div className="content_wrap">
        <div className="input_title">이메일 주소</div>
        <div className="input_wrap">
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

        <div style={{ marginTop: "26px" }} className="input_title">
          비밀번호
        </div>
        <div className="input_wrap">
          <input
            type="password"
            className="input"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
          />
        </div>

        <div className="error_message_wrap">
          {!pwValid && pw.length > 0 && (
            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
          )}
        </div>
      </div>

      <div className="button_wrap">
        <button
          onClick={onClickConfirmButton}
          disabled={notAllow}
          className="bottom_button"
        >
          로그인
        </button>
      </div>
      <hr nonshade />
      <div className="register_wrap">
        <div className="register_title">
          계정이 없으신가요? <Link to="/register">가입하기</Link>
        </div>
        <div className="social_login">
          <img
            src={kakaoLogin}
            alt="카카오로그인"
            className="kakao_login_btu"
            onClick={KakaoLoginHandler}
          />
          <img
            src={NaverLogin}
            alt="네이버로그인"
            className="naver_login_btu"
            onClick={NaverLoginHandler}
          />
          {/* <button onClick={NaverLoginHandler}>네이버</button> */}
        </div>
      </div>
    </div>
  );
}
