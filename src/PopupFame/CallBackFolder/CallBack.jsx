import { useEffect, useRef } from "react";

//카카오
const KAKAO_REST_API_KEY = "c2c0630ecffa6b96e8c78ef64478cf57";
const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback";
//네이버
const NAVER_CLIENT_KEY = "O75rHergSrGWoKHXM8ES";
const NAVER_REDIRECT_URI = "http://localhost:3000/oauth/callback";
const NAVER_SECRET_KEY = "n5I_4vQB1N";

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

    console.log("\n\n\n\n URL \n\n\n", url);

    if (pathname.includes("kakao") || state === "" || state === "kakao") {
      // Step 1: access token 발급
      fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: KAKAO_REST_API_KEY,
          redirect_uri: KAKAO_REDIRECT_URI,
          code: code,
        }),
      })
        .then((res) => res.json())
        .then((tokenData) => {
          const accessToken = tokenData.access_token;

          // Step 2: 사용자 정보 요청
          return fetch("https://kapi.kakao.com/v2/user/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          });
        })
        .then((res) => res.json())
        .then((userData) => {
          LoginCallBacksuccess(
            {
              id: userData.id,
              nickname: userData.kakao_account.profile.nickname,
            },
            "naver"
          );
          // 3. 메인 창으로 메시지 보내기
        })
        .catch((err) => console.error("카카오 로그인 에러", err));
    }

    if (state === "naver") {
      fetch("/oauth2.0/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: NAVER_CLIENT_KEY,
          client_secret: NAVER_SECRET_KEY,
          redirect_uri: NAVER_REDIRECT_URI,
          code: code,
          state: state,
        }),
      })
        .then((res) => res.json())
        .then((tokenData) =>
          fetch("/v1/nid/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          })
        )
        .then((res) => res.json())
        .then((userData) => {
          console.log("\n\n\n 네이버  \n\n\n", userData);
          LoginCallBacksuccess(
            {
              id: userData.response.id,
              nickname: userData.response.nickname,
              email: userData.response.email,
            },
            "naver"
          );
        });
    }
  });
  return <div>로그인 중입니다...</div>;
}
