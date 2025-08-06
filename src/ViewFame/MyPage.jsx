import React from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/MyPage.css";

import male from "../assets/img/male.png";
import female from "../assets/img/female.png";

const MyPage = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="mypage-container">
      <div className="mypage-title">마이페이지</div>
      <div className="mypage-info">
        <div className="mypage-label">사용자 정보</div>
        <div className="team-member-detail-header">
          {/* <img
            src={member.image || (member.sex === "male" ? male : female)}
            alt={member.name || member.username}
            className="team-member-detail-image"
          /> */}
        </div>
        <div>
          {user ? (user.nickname || user.name) + "님" : "로그인 정보 없음"}
        </div>
        {/* 휴대폰 번호 등 추가 정보 필요시 여기에 */}
      </div>
      <div className="mypage-btn-group">
        <button className="mypage-btn">비밀번호 변경</button>
        <button className="mypage-btn">이름 변경</button>
        <button className="mypage-btn">휴대폰번호 변경</button>
      </div>
      <button className="mypage-main-btn" onClick={() => navigate("/")}>
        메인으로
      </button>
    </div>
  );
};

export default MyPage;
