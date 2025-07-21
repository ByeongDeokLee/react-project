import React from "react";
import { useLocation } from "react-router-dom";
import "../CssFolder/TeamMemberDetail.css";

const TeamMemberDetail = () => {
  const location = useLocation();
  const { member } = location.state || {};

  if (!member) {
    return <div className="loading">사용자 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="team-member-detail-container">
      <div className="team-member-detail-card">
        <div className="team-member-detail-header">
          <img
            src={member.image || "/placeholder.svg"}
            alt={member.name || member.username}
            className="team-member-detail-image"
          />
          <div className="team-member-detail-info">
            <h1>{member.name || member.username}</h1>
            <p className="team-member-detail-role">
              {member.role || member.position}
            </p>
          </div>
        </div>
        <div className="team-member-detail-body">
          <h2>소개</h2>
          <p>{member.introduction || "자기소개 정보가 없습니다."}</p>
          <h2>경력</h2>
          <p>{member.experience || "경력 정보가 없습니다."}</p>
          <h2>전문 분야</h2>
          <p>{member.specialty || "전문 분야 정보가 없습니다."}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetail;