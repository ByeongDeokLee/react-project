//CSS파일
import "../CssFolder/FirstCtgry.css";

//라이브러리
import { useState } from "react";

export default function FirtstCtgry() {
  const [LoginInfo, setLoginInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [LoginInfo, setLoginInfo] = useState("");

  const openLoginPopup = (e) => {
    e.preventDefault(); // 기본 링크 막기
    window.open("/LoginPopup", "LoginPopup", "width=800,height=800");

    window.addEventListener("message", (event) => {
      if (event.data?.type === "LOGIN_SUCCESS") {
        console.log("로그인 성공! 유저:", event.data.user);
        setLoginInfo(event.data.user.nickname);
        setIsLoggedIn(true);
      }
    });
  };

  const openLogoutPopup = () => {
    console.log("\n ㅎㅇ \n");
  };

  return (
    <div className="main_first_ctgry">
      <div class="logo_wrap">
        <div className="main_logo">
          <p>
            <a href="http://localhost:3000/">이미지</a>
            {/* <img src={mainLogo} alt="Main Logo" /> */}
          </p>
        </div>
        <div className="main_company">
          <p>기업용</p>
        </div>
        <input type="checkbox" id="switch"></input>
        <label for="switch" className="switch_label">
          <span className="onf_btn"></span>
        </label>
      </div>

      {!isLoggedIn && (
        <div id="LogInID" className="login_wrap">
          <div className="login_join_class">
            <a href="memberJoin">회원가입</a>
          </div>
          <div className="login_class">
            <a href="LoginPopup" onClick={openLoginPopup}>
              로그인
            </a>
          </div>
        </div>
      )}

      {isLoggedIn && (
        <div id="LogOutID" className="logout_wrap">
          <div className="LoginInfo">{LoginInfo + "님"}</div>
          <div>
            <button onClick={openLogoutPopup}>로그아웃</button>
          </div>
        </div>
      )}
    </div>
  );
}
