import axios from "axios";

export const kakaoLogout = async (accessToken) => {
  try {
    const res = await axios.post(
      "https://kapi.kakao.com/v1/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("카카오 로그아웃 완료:", res.data); // { id: 숫자 }
  } catch (error) {
    console.error(
      "카카오 로그아웃 실패:",
      error.response?.data || error.message
    );
  }
};
