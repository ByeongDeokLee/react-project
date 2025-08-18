//CSS파일
import "../CssFolder/FirstCtgry.css";

//라이브러리
import { useState, useEffect } from "react";
import { kakaoLogout } from "../js/axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// 함수형 프로그래밍 유틸리티 함수들
const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => fn(acc), arg);
const go = (arg, ...fns) => pipe(...fns)(arg);

const curry = (fn) => {
  const arity = fn.length;
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    return function (...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
};

// 커리된 유틸리티 함수들
const getItem = curry((key, storage) => storage.getItem(key));
const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("JSON 파싱 오류:", e);
    return null;
  }
};

// const setItem = curry((key, value, storage) =>
//   storage.setItem(key, JSON.stringify(value))
// );
// const removeItem = curry((key, storage) => storage.removeItem(key));

// 사용자 데이터 처리 함수들
const getUserName = (user) => user?.name || user?.nickname || "사용자";
const setLoginState = curry((setLoginInfo, setIsLoggedIn) => (userName) => {
  setLoginInfo(userName);
  setIsLoggedIn(true);
});

// 로그인 성공 처리 함수들
const extractUserName = (user) =>
  user?.name === undefined ? user.nickname : user.name;

const saveUserData = curry((storage) => (user) => {
  if (user && typeof user === "object") {
    storage.setItem("user", JSON.stringify(user));
  }
  return user;
});

// 로그아웃 처리 함수들
const clearUserData = curry((storage) => () => {
  console.log("clearUserData", storage);
  storage.clear();
  return null;
});

const clearKakaoToken = curry((storage) => () => {
  storage.removeItem("kakaoAccessToken");
  return null;
});

export default function FirtstCtgry() {
  const [LoginInfo, setLoginInfo] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //렌더링 감지 - 함수형으로 개선
  useEffect(() => {
    const initializeUser = () =>
      go(localStorage, getItem("user"), parseJSON, (user) =>
        user
          ? go(user, getUserName, setLoginState(setLoginInfo, setIsLoggedIn))
          : null
      );

    initializeUser();
  }, []);

  const openLoginPopup = (e) => {
    e.preventDefault(); // 기본 링크 막기
    window.open("/Login", "LoginPopup", "width=800,height=800");

    window.addEventListener("message", (event) => {
      if (event.data?.type === "LOGIN_SUCCESS") {
        console.log("로그인 성공! 유저:", event.data.user);

        // 함수형으로 개선된 로그인 성공 처리
        go(
          event.data.user,
          extractUserName,
          (userName) => {
            setLoginInfo(userName);
            return event.data.user;
          },
          saveUserData(localStorage),
          () => {
            toast.success("로그인 되었습니다.");
            setIsLoggedIn(true);
          }
        );
      }
    });
  };

  const openLogoutPopup = async () => {
    const token = localStorage.getItem("kakaoAccessToken");

    if (!token) {
      // 함수형으로 개선된 로그아웃 처리
      go(null, clearUserData(localStorage), () => {
        setLoginInfo("");
        setIsLoggedIn(false);
        toast.success("로그아웃 되었습니다.");
        console.log("로그아웃 되었습니다.", window.localStorage.length);
      });
    } else {
      try {
        const result = await kakaoLogout(token);
        console.log("로그아웃 결과:", result);

        // 함수형으로 개선된 카카오 로그아웃 처리
        go(null, clearKakaoToken(localStorage), () => {
          setIsLoggedIn(false);
          toast.success("로그아웃 되었습니다.");
        });
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
    // 함수형으로 개선된 마이페이지 처리
    go(localStorage, getItem("user"), parseJSON, (user) =>
      navigate("/mypage", { state: { user: user || {} } })
    );
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
