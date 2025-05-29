import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const REST_API_KEY = "c2c0630ecffa6b96e8c78ef64478cf57";
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

export default function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("\n\n\n dsadsadasdasdsa \n\n\n", code);
    if (code) {
      // Step 1: access token 발급
      fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
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
          console.log("카카오 로그인 성공:", userData);
          localStorage.setItem("kakao_user", JSON.stringify(userData));
          navigate("/"); // 홈으로 이동
        })
        .catch((err) => {
          console.error("카카오 로그인 에러:", err);
        });
    }
  });

  return <div>로그인 중입니다...</div>;
}
