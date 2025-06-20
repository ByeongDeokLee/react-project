"use client";

import "../CssFolder/SubMainHome.css";

//이미지
import dog1 from "../assets/img/dog1.jpg";
import dog2 from "../assets/img/dog2.jpg";
import dog3 from "../assets/img/dog3.jpg";
import dog4 from "../assets/img/dog4.jpg";
import favorite from "../assets/img/favorite.png";
import produimg from "../assets/img/produimg.png";

//라이브러리
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useApi from "../js/useApi";


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





const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('inquiry');
  const navigate = useNavigate();
  const { request } = useApi(); // useApi 훅에서 request 받아오기

  const tabs = [
    { id: 'inquiry', label: '문의사항', icon: '📝' },
    { id: 'board', label: '게시판', icon: '📋' },
    { id: 'faq', label: '자주 묻는 질문', icon: '❓' },
    { id: 'notice', label: '공지사항', icon: '📢' },
    { id: 'review', label: '리뷰', icon: '⭐' }
  ];

  const boardPageSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await request({
        method: 'GET',
        url: 'http://localhost:3001/api/posts',
      });

      // console.log(response);
      navigate('/board', { state: { posts: response } })

    } catch (error) {
      console.error('Error getting posts:', error);
      throw error;
    }
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'inquiry':
        return (
          <div className="tab-content">
            <h3>문의사항</h3>
            <div className="inquiry-list">
              <div className="inquiry-item">
                <span className="inquiry-title">홈페이지 제작 문의</span>
                <span className="inquiry-date">2024.03.15</span>
              </div>
              <div className="inquiry-item">
                <span className="inquiry-title">쇼핑몰 제작 비용 문의</span>
                <span className="inquiry-date">2024.03.14</span>
              </div>
            </div>
            <button className="write-btn" onClick={() => navigate('/inquiry')}>
              문의하기
            </button>
          </div>
        );
      case 'board':
        return (
          <div className="tab-content">
            <h3>게시판</h3>
            <div className="board-list">
              <div className="board-item">
                <span className="board-title">홈페이지 제작 후기</span>
                <span className="board-date">2024.03.15</span>
              </div>
              <div className="board-item">
                <span className="board-title">쇼핑몰 제작 팁</span>
                <span className="board-date">2024.03.14</span>
              </div>
            </div>
            <button className="write-btn" onClick={(e) => boardPageSubmit(e)}>
              글쓰기
            </button>
          </div>
        );
      case 'faq':
        return (
          <div className="tab-content">
            <h3>자주 묻는 질문</h3>
            <div className="faq-list">
              <div className="faq-item">
                <div className="faq-question">
                  <span className="faq-icon">Q.</span>
                  <span className="faq-title">홈페이지 제작 기간은 얼마나 걸리나요?</span>
                </div>
                <div className="faq-answer">
                  <span className="faq-icon">A.</span>
                  <span className="faq-content">기본적인 홈페이지는 2-3주 정도 소요되며, 복잡한 기능이 포함된 경우 4-6주 정도 소요될 수 있습니다.</span>
                </div>
              </div>
              <div className="faq-item">
                <div className="faq-question">
                  <span className="faq-icon">Q.</span>
                  <span className="faq-title">제작 비용은 어떻게 산정되나요?</span>
                </div>
                <div className="faq-answer">
                  <span className="faq-icon">A.</span>
                  <span className="faq-content">요구사항과 기능의 복잡도에 따라 비용이 산정됩니다. 정확한 견적은 상담을 통해 안내해 드립니다.</span>
                </div>
              </div>
            </div>
            <button className="write-btn" onClick={() => navigate('/faq')}>
              문의하기
            </button>
          </div>
        );
      case 'notice':
        return (
          <div className="tab-content">
            <h3>공지사항</h3>
            <div className="notice-list">
              <div className="notice-item">
                <span className="notice-badge">공지</span>
                <span className="notice-title">2024년 3월 시스템 점검 안내</span>
                <span className="notice-date">2024.03.15</span>
              </div>
              <div className="notice-item">
                <span className="notice-badge">이벤트</span>
                <span className="notice-title">신규 고객 프로모션 안내</span>
                <span className="notice-date">2024.03.14</span>
              </div>
              <div className="notice-item">
                <span className="notice-badge">업데이트</span>
                <span className="notice-title">새로운 기능 업데이트 안내</span>
                <span className="notice-date">2024.03.13</span>
              </div>
            </div>
          </div>
        );
      case 'review':
        return (
          <div className="tab-content">
            <h3>리뷰</h3>
            <div className="review-list">
              <div className="review-item">
                <div className="review-header">
                  <span className="review-rating">★★★★★</span>
                  <span className="review-author">김철수</span>
                  <span className="review-date">2024.03.15</span>
                </div>
                <div className="review-content">
                  <p>홈페이지 제작이 생각보다 훨씬 빨리 완료되어 만족스럽습니다. 디자인도 마음에 들고 기능도 잘 작동합니다.</p>
                </div>
              </div>
              <div className="review-item">
                <div className="review-header">
                  <span className="review-rating">★★★★☆</span>
                  <span className="review-author">이영희</span>
                  <span className="review-date">2024.03.14</span>
                </div>
                <div className="review-content">
                  <p>쇼핑몰 제작이 잘 완료되었습니다. 다만 일부 기능에서 개선이 필요해 보입니다.</p>
                </div>
              </div>
            </div>
            <button className="write-btn" onClick={() => navigate('/review')}>
              리뷰 작성하기
            </button>
          </div>
        );
      default:
        return <div className="tab-content">준비 중입니다.</div>;
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="sidebar-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div className="project-card" onClick={() => navigate(`/service-selection`)}>
          {/* <div className="project-card" onClick={() => navigate(`/project/${project.title}`)}> */}
      <div className="project-image-container">
        <img src={project.src} alt={project.title} className="project-image" />
        <div className="project-overlay">
          <div className="project-category">{project.category}</div>
          <div className="project-duration">{project.duration}</div>
        </div>
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <div className="project-rating">
          <img src={favorite} alt="좋아요" className="rating-icon" />
          <span className="rating-score">{project.great.toFixed(1)}</span>
          <span className="comment-count">({project.comment})</span>
        </div>
        <div className="project-price">
          {project.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 ~
        </div>
        <div className="project-producer">
          <img src={produimg} alt="producer" className="producer-icon" />
          <span className="producer-name">{project.producer}</span>
        </div>
        <div className="project-tags">
          {project.tags.map((tag, index) => (
            <span key={index} className="tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};


export default function SubMainHome() {
  // const navigate = useNavigate();

  return (
    <div className="sub-main-home">
      <div className="main-content">
        <ProjectSection
          title="홈페이지 제작"
          description="전문적이고 세련된 홈페이지로 브랜드 가치를 높이세요"
          data={projectData}
          bgColor="white"
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
          bgColor="white"
        />
      </div>
      <Sidebar />
    </div>
  );
}

const ProjectSection = ({ title, description, data, bgColor = "white" }) => {
  const navigate = useNavigate();

  return (
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
};

