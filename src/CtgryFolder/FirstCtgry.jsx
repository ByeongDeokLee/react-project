//CSS파일
import "../CssFolder/FirstCtgry.css";

//라이브러리
import { useState } from "react";
import { kakaoLogout } from "../js/axios";
import { ToastContainer, toast } from "react-toastify";

export default function FirtstCtgry() {
  const [LoginInfo, setLoginInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [LoginInfo, setLoginInfo] = useState("");

  const openLoginPopup = (e) => {
    e.preventDefault(); // 기본 링크 막기
    window.open("/Login", "LoginPopup", "width=800,height=800");

    window.addEventListener("message", (event) => {
      if (event.data?.type === "LOGIN_SUCCESS") {
        console.log("로그인 성공! 유저:", event.data.user);
        // if (event.data.user.nickname == null) {
        //   setLoginInfo(event.data.user.name);
        // } else {
        //   setLoginInfo(event.data.user.nickname);
        // }
         (event.data.user.name[0] == undefined) ? setLoginInfo(event.data.user.nickname) : setLoginInfo(event.data.user.name);
        toast.success("로그인 되었습니다.");
        setIsLoggedIn(true);
      }
    });
  };

  const openLogoutPopup = async () => {
    const token = localStorage.getItem("kakaoAccessToken"); // 저장된 토큰 불러오기

    if (!token) {
      console.log("카카오 access token이 없습니다.");
      return;
    }

    try {
      const result = await kakaoLogout(token);
      console.log("로그아웃 결과:", result);

      // 프론트 상태 초기화
      localStorage.removeItem("kakaoAccessToken");
      setIsLoggedIn(false);
      toast.success("로그아웃 되었습니다.");
      // alert("로그아웃 되었습니다.");
    } catch (e) {
      alert("로그아웃 실패!");
    }
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
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
