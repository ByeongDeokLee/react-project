//CSS파일
import "../CssFolder/FirstCtgry.css";

//라이브러리
import { useState, useEffect } from "react";
import { kakaoLogout } from "../js/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FirtstCtgry() {
  const [LoginInfo, setLoginInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //렌더링 감지
  useEffect(() => {
    const LoginInfo = localStorage.getItem("name");
    console.log("\n\n 확인 \n\n", LoginInfo != null);
    if (LoginInfo != null) {
      setLoginInfo(LoginInfo);
      setIsLoggedIn(true);
    }
  }, []);

  const openLoginPopup = (e) => {
    e.preventDefault(); // 기본 링크 막기
    window.open("/Login", "LoginPopup", "width=800,height=800");

    window.addEventListener("message", (event) => {
      if (event.data?.type === "LOGIN_SUCCESS") {
        console.log("로그인 성공! 유저:", event.data.user);

        // 이름/닉네임 표시
        event.data?.user?.name === undefined
          ? setLoginInfo(event.data.user.nickname)
          : setLoginInfo(event.data.user.name);

        // 받은 user 객체를 통째로 로컬스토리지에 저장
        // (user의 각 key를 로컬스토리지에 저장)
        if (event.data.user && typeof event.data.user === "object") {
          Object.entries(event.data.user).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
        }

        toast.success("로그인 되었습니다.");
        setIsLoggedIn(true);
      }
    });
  };

  const openLogoutPopup = async () => {
    const token = localStorage.getItem("kakaoAccessToken"); // 저장된 토큰 불러오기

    if (!token) {
      localStorage.clear();
      setLoginInfo("");
      setIsLoggedIn(false);
      toast.success("로그아웃 되었습니다.");
      console.log("로그아웃 되었습니다.", window.localStorage.length);
    } else {
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
    }
  };

  const userChange = (e) => {
    e.preventDefault();
    const LoginInfo = localStorage.getItem("name");
    console.log("\n\n 확인 \n\n", LoginInfo != null);
    if (LoginInfo == null) {
      alert("로그인이 필요합니다.");
      return;
    }
  };

  const handleMyPage = () => {
    // 로컬스토리지의 모든 데이터를 user 객체로 만들어 마이페이지로 넘김
    const user = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      user[key] = localStorage.getItem(key);
    }
    navigate("/mypage", { state: { user } });
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
        <input
          type="checkbox"
          id="switch"
          onClick={(e) => {
            userChange(e);
          }}
        ></input>
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
          <div className="Login_Info">
            <p>{LoginInfo + "님"}</p>
          </div>
          <button onClick={openLogoutPopup} className="ctgry-btn">
            로그아웃
          </button>
          <button onClick={() => handleMyPage()} className="ctgry-btn">
            마이페이지
          </button>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
