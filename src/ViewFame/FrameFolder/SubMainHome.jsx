"use client";

import "../CssFolder/SubMainHome.css";

//이미지
import dog1 from "../../assets/img/dog1.jpg";
import dog2 from "../../assets/img/dog2.jpg";
import dog3 from "../../assets/img/dog3.jpg";
import dog4 from "../../assets/img/dog4.jpg";
import favorite from "../../assets/img/favorite.png";
import produimg from "../../assets/img/produimg.png";

//라이브러리
import { useNavigate } from "react-router-dom";

const projectData = [
  {
    src: dog1,
    title: "기업 제작용 페이지",
    great: 4.1,
    comment: 20,
    price: 50000,
    producer: "핑크덕후",
    category: "homepage",
    tags: ["반응형", "SEO최적화", "모바일"],
    duration: "2-3주",
  },
  {
    src: dog2,
    title: "개쩌는 홈페이지",
    great: 3.9,
    comment: 5,
    price: 500,
    producer: "길동이",
    category: "homepage",
    tags: ["커스텀디자인", "빠른제작"],
    duration: "1주",
  },
  {
    src: dog3,
    title: "요즘 많이 사용하는 홈페이지",
    great: 3.0,
    comment: 1,
    price: 5000,
    producer: "오리쿵덕",
    category: "homepage",
    tags: ["트렌디", "심플"],
    duration: "1-2주",
  },
  {
    src: dog4,
    title: "간편한 홈페이지 제작",
    great: 4.5,
    comment: 100,
    price: 25000,
    producer: "피캬츄",
    category: "homepage",
    tags: ["간편", "빠른제작", "저렴"],
    duration: "3-5일",
  },
];

const shoppingData = [
  {
    src: dog1,
    title: "프리미엄 쇼핑몰",
    great: 4.8,
    comment: 45,
    price: 150000,
    producer: "쇼핑몰마스터",
    category: "shopping",
    tags: ["결제시스템", "재고관리", "모바일"],
    duration: "4-6주",
  },
  {
    src: dog2,
    title: "스마트 온라인 스토어",
    great: 4.3,
    comment: 32,
    price: 80000,
    producer: "이커머스프로",
    category: "shopping",
    tags: ["반응형", "관리자페이지"],
    duration: "3-4주",
  },
  {
    src: dog3,
    title: "소상공인 맞춤 쇼핑몰",
    great: 4.0,
    comment: 18,
    price: 45000,
    producer: "소상공인도우미",
    category: "shopping",
    tags: ["저렴", "간편관리"],
    duration: "2-3주",
  },
  {
    src: dog4,
    title: "럭셔리 브랜드 쇼핑몰",
    great: 4.9,
    comment: 67,
    price: 300000,
    producer: "럭셔리디자이너",
    category: "shopping",
    tags: ["프리미엄", "브랜딩", "커스텀"],
    duration: "6-8주",
  },
];

const communityData = [
  {
    src: dog1,
    title: "활발한 커뮤니티 사이트",
    great: 4.2,
    comment: 28,
    price: 75000,
    producer: "커뮤니티빌더",
    category: "community",
    tags: ["게시판", "회원관리", "채팅"],
    duration: "3-4주",
  },
  {
    src: dog2,
    title: "전문가 포럼",
    great: 4.6,
    comment: 41,
    price: 120000,
    producer: "포럼전문가",
    category: "community",
    tags: ["전문포럼", "Q&A", "평점시스템"],
    duration: "4-5주",
  },
  {
    src: dog3,
    title: "소셜 네트워킹 플랫폼",
    great: 3.8,
    comment: 15,
    price: 200000,
    producer: "소셜미디어프로",
    category: "community",
    tags: ["SNS기능", "실시간채팅"],
    duration: "6-8주",
  },
  {
    src: dog4,
    title: "학습 커뮤니티",
    great: 4.4,
    comment: 52,
    price: 90000,
    producer: "에듀테크마스터",
    category: "community",
    tags: ["학습관리", "진도추적"],
    duration: "4-6주",
  },
];

export default function SubMainHome() {
  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    // 프로젝트 상세 페이지로 이동하거나 서비스 선택 페이지로 이동
    navigate("/service-selection");
  };

  const ProjectCard = ({ project }) => (
    <div className="project-card" onClick={() => handleProjectClick(project)}>
      <div className="project-image-container">
        <img
          src={project.src || "/placeholder.svg"}
          alt={project.title}
          className="project-image"
        />
        <div className="project-overlay">
          <button className="view-details-btn">자세히 보기</button>
        </div>
      </div>

      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>

        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="project-stats">
          <div className="project-rating">
            <img
              src={favorite || "/placeholder.svg"}
              alt="평점"
              className="rating-icon"
            />
            <span className="rating-score">{project.great.toFixed(1)}</span>
            <span className="rating-count">({project.comment})</span>
          </div>
          <div className="project-duration">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polyline
                points="12,6 12,12 16,14"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <span>{project.duration}</span>
          </div>
        </div>

        <div className="project-footer">
          <div className="project-price">
            {project.price.toLocaleString()}원 ~
          </div>
          <div className="project-producer">
            <img
              src={produimg || "/placeholder.svg"}
              alt="제작자"
              className="producer-icon"
            />
            <span>{project.producer}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ProjectSection = ({ title, description, data, bgColor = "white" }) => (
    <section className="project-section" style={{ backgroundColor: bgColor }}>
      <div className="section-container">
        <div className="section-header">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className="projects-grid">
          {data.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="section-footer">
          <button
            className="view-more-btn"
            onClick={() => navigate("/service-selection")}
          >
            더 많은 {title.split(" ")[0]} 보기
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <div className="sub-main-home">
      <ProjectSection
        title="홈페이지 제작"
        description="전문적이고 세련된 홈페이지로 브랜드 가치를 높이세요"
        data={projectData}
        bgColor="#f8f9fa"
      />

      <ProjectSection
        title="쇼핑몰 제작"
        description="매출 증대를 위한 최적화된 온라인 쇼핑몰을 구축하세요"
        data={shoppingData}
        bgColor="white"
      />

      <ProjectSection
        title="커뮤니티 제작"
        description="사용자들이 소통할 수 있는 활발한 커뮤니티를 만들어보세요"
        data={communityData}
        bgColor="#f8f9fa"
      />
    </div>
  );
}
