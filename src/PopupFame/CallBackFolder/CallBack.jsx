import { useEffect, useRef } from "react";
import axios from "axios";

//카카오
const KAKAO_REST_API_KEY = "c2c0630ecffa6b96e8c78ef64478cf57";
const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback";

export default function KakaoCallback() {
  const didRun = useRef(false);

  useEffect(() => {
    const LoginCallBacksuccess = (user, provider) => {
      // c;
      if (window.opener) {
        window.opener.postMessage({ type: "LOGIN_SUCCESS", user }, "*");
        window.close(); // 팝업 닫기
      }
    };

    if (didRun.current) return;
    didRun.current = true;

    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state") || "";
    const pathname = url.pathname;

    if (pathname.includes("kakao") || state === "" || state === "kakao") {
      axios
        .post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: KAKAO_REST_API_KEY,
            redirect_uri: KAKAO_REDIRECT_URI,
            code: code,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        )
        .then((res) => {
          const accessToken = res.data.access_token;
          localStorage.setItem("kakaoAccessToken", accessToken);
          // Step 2: 사용자 정보 요청
          return axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          });
        })
        .then((res) => {
          const userData = res.data;

          LoginCallBacksuccess(
            {
              id: userData.id,
              nickname: userData.kakao_account.profile.nickname,
            },
            "kakao"
          );

          // 3. 메인 창으로 메시지 보내기 등 추가 작업
        })
        .catch((err) => {
          console.error(
            "카카오 로그인 에러:",
            err.response?.data || err.message
          );
        });
    }

    if (state === "naver") {
      debugger
      axios
        .post(
          "http://localhost:4000/api/naver/login",
          { code, state }
        )
        .then((res) => {
          console.log("\n\n\n 네이버 \n\n\n", res.data);
          const userData = res.data.response;
          LoginCallBacksuccess(
            {
              id: userData.id,
              nickname: userData.nickname,
              email: userData.email,
            },
            "naver"
          );
        })
        .catch((err) => {
          console.error(
            "네이버 로그인 실패:",
            err.response?.data || err.message
          );
        });
    }
  });
  return <div>로그인 중입니다...</div>;
}
