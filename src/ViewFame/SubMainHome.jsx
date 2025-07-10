"use client";

import styles from "../CssFolder/SubMainHome.module.css";

//이미지
import favorite from "../assets/img/favorite.png";
import produimg from "../assets/img/produimg.png";

//라이브러리
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useApi from "../js/useApi";
import { useQuery } from '@tanstack/react-query';


const projectData = []
const shoppingData = []
const communityData = []




// const projectData = [
//   {
//     src: dog1,
//     title: "기업 제작용 페이지",
//     great: 4.1,
//     comment: 20,
//     price: 50000,
//     producer: "핑크덕후",
//     category: "homepage",
//     tags: ["반응형", "SEO최적화", "모바일"],
//     duration: "2-3주",
//   },
//   {
//     src: dog2,
//     title: "개쩌는 홈페이지",
//     great: 3.9,
//     comment: 5,
//     price: 500,
//     producer: "길동이",
//     category: "homepage",
//     tags: ["커스텀디자인", "빠른제작"],
//     duration: "1주",
//   },
//   {
//     src: dog3,
//     title: "요즘 많이 사용하는 홈페이지",
//     great: 3.0,
//     comment: 1,
//     price: 5000,
//     producer: "오리쿵덕",
//     category: "homepage",
//     tags: ["트렌디", "심플"],
//     duration: "1-2주",
//   },
//   {
//     src: dog4,
//     title: "간편한 홈페이지 제작",
//     great: 4.5,
//     comment: 100,
//     price: 25000,
//     producer: "피캬츄",
//     category: "homepage",
//     tags: ["간편", "빠른제작", "저렴"],
//     duration: "3-5일",
//   },
// ];

// const shoppingData = [
//   {
//     src: dog1,
//     title: "프리미엄 쇼핑몰",
//     great: 4.8,
//     comment: 45,
//     price: 150000,
//     producer: "쇼핑몰마스터",
//     category: "shopping",
//     tags: ["결제시스템", "재고관리", "모바일"],
//     duration: "4-6주",
//   },
//   {
//     src: dog2,
//     title: "스마트 온라인 스토어",
//     great: 4.3,
//     comment: 32,
//     price: 80000,
//     producer: "이커머스프로",
//     category: "shopping",
//     tags: ["반응형", "관리자페이지"],
//     duration: "3-4주",
//   },
//   {
//     src: dog3,
//     title: "소상공인 맞춤 쇼핑몰",
//     great: 4.0,
//     comment: 18,
//     price: 45000,
//     producer: "소상공인도우미",
//     category: "shopping",
//     tags: ["저렴", "간편관리"],
//     duration: "2-3주",
//   },
//   {
//     src: dog4,
//     title: "럭셔리 브랜드 쇼핑몰",
//     great: 4.9,
//     comment: 67,
//     price: 300000,
//     producer: "럭셔리디자이너",
//     category: "shopping",
//     tags: ["프리미엄", "브랜딩", "커스텀"],
//     duration: "6-8주",
//   },
// ];

// const communityData = [
//   {
//     src: dog1,
//     title: "활발한 커뮤니티 사이트",
//     great: 4.2,
//     comment: 28,
//     price: 75000,
//     producer: "커뮤니티빌더",
//     category: "community",
//     tags: ["게시판", "회원관리", "채팅"],
//     duration: "3-4주",
//   },
//   {
//     src: dog2,
//     title: "전문가 포럼",
//     great: 4.6,
//     comment: 41,
//     price: 120000,
//     producer: "포럼전문가",
//     category: "community",
//     tags: ["전문포럼", "Q&A", "평점시스템"],
//     duration: "4-5주",
//   },
//   {
//     src: dog3,
//     title: "소셜 네트워킹 플랫폼",
//     great: 3.8,
//     comment: 15,
//     price: 200000,
//     producer: "소셜미디어프로",
//     category: "community",
//     tags: ["SNS기능", "실시간채팅"],
//     duration: "6-8주",
//   },
//   {
//     src: dog4,
//     title: "학습 커뮤니티",
//     great: 4.4,
//     comment: 52,
//     price: 90000,
//     producer: "에듀테크마스터",
//     category: "community",
//     tags: ["학습관리", "진도추적"],
//     duration: "4-6주",
//   },
// ];

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("inquiry");
  const [boardPosts, setBoardPosts] = useState([]);//게시판
  const [noticePosts, setNoticePosts] = useState([]);//공지사항
  const [reviewPosts, setReviewPosts] = useState([]);//공지사항
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { request } = useApi(); // useApi 훅에서 request 받아오기

useEffect(() => {
  // 최초 1회 실행
  fetchAllData();

  // 5분마다 실행
  const interval = setInterval(() => {
    fetchAllData();
  }, 300000); // 5분

  // 언마운트시 인터벌 해제
  return () => clearInterval(interval);
}, []);

const fetchAllData = async () => {
  try {
    const servicesList = await request({method  : "get" , url : "http://localhost:4000/api/serviceList"})
    console.log("API 응답 데이터", servicesList)
    for (var i = 0; i < servicesList.length; i++){
      if (servicesList[i].service_type == "디자인" || servicesList[i].service_type == "개발") {

      } else if(servicesList[i].service_type == "디자인" ) {

      } else if (servicesList[i].service_type == "디자인") {

      }
    }
  } catch (error) {
    console.error("데이터 갱신 에러:", error);
  }
}

  const tabs = [
    { id: "inquiry", label: "문의사항", icon: "📝" },
    { id: "board", label: "게시판", icon: "📋" },
    { id: "faq", label: "자주 묻는 질문", icon: "❓" },
    { id: "notice", label: "공지사항", icon: "📢" },
    { id: "review", label: "리뷰", icon: "⭐" },
  ];

  const fetchBoardPosts = async () => {
    setIsLoading(true);
    try {
      const response = await request({
        method: "GET",
        url: "http://localhost:4000/api/posts",
      });
      const limitedPosts = response.slice(0, 2);
      setBoardPosts(limitedPosts);
    } catch (error) {
      console.error("Error getting posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNoticePosts = async () => {
    setIsLoading(true);
    try {
      const response = await request({
        method: "GET",
        url: "http://localhost:4000/api/NoticeList",
      })
      console.log("공지사항", response);
      const limitedPosts = response.slice(0, 2);
      setNoticePosts(limitedPosts);
      // navigate("/notice", { state: { notice: response } });
    } catch (error) {
      console.error("Error getting notice:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const fetchReviewPosts = async () => {
    setIsLoading(true);
    try {
      const response = await request({
        method: "GET",
        url: "http://localhost:4000/api/reviewsList",
      })
      console.log("공지사항", response);
      const limitedPosts = response.slice(0, 2);
      setReviewPosts(limitedPosts);
    } catch (error) {
      console.error("Error getting notice:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "board") {
      fetchBoardPosts();
    } else if (tabId === "notice") {
      fetchNoticePosts();
    } else if (tabId === "review") {
      fetchReviewPosts();
    }
  };

  const boardPageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        method: "GET",
        url: "http://localhost:4000/api/posts",
      });
      navigate("/board", { state: { posts: response } });
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
    }
  };

  const noticePageSubmit = async (e) => {
    console.log("NoticeInfo");
    e.preventDefault();
    try {
      const response = await request({
        method: "GET",
        url: "http://localhost:4000/api/NoticeList",
      });
      console.log("공지사항", response);
      navigate("/notice", { state: { notice: response } });
    } catch (error) {
      console.error("Error getting notice:", error);
    }
  };

  const reviewPageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await request({
        method: "GET",
        url: "http://localhost:4000/api/reviewsList",
      });
      // navigate("/review/write")
      navigate("/review", { state: { reviews: response } });
    } catch (error) {
      console.error("Error getting posts:", error);
      throw error;
    }
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "inquiry":
        return (
          <div className={styles.tabContent}>
            <h3>문의사항</h3>
            <div className={styles.inquiryList}>
              <div
                className={styles.inquiryItem}
                onClick={() => navigate("/inquiry")}
              >
                <span className={styles.inquiryTitle}>홈페이지 제작 문의</span>
                <span className={styles.inquiryDate}>2024.03.15</span>
              </div>
              <div
                className={styles.inquiryItem}
                onClick={() => navigate("/inquiry")}
              >
                <span className={styles.inquiryTitle}>
                  쇼핑몰 제작 비용 문의
                </span>
                <span className={styles.inquiryDate}>2024.03.14</span>
              </div>
            </div>
            <button
              className={styles.writeBtn}
              onClick={() => navigate("/inquiry/write")}
            >
              문의하기
            </button>
          </div>
        );
      case "board":
        return (
          <div className={styles.tabContent}>
            <h3>게시판</h3>
            <div className={styles.subBoardList}>
              {isLoading ? (
                <div className={styles.loading}>로딩 중...</div>
              ) : boardPosts.length > 0 ? (
                boardPosts.map((post) => (
                  <div
                    key={post.id}
                    className={styles.boardItem}
                    onClick={(e) => boardPageSubmit(e)}
                  >
                    <span className={styles.boardTitle}>{post.title}</span>
                    <span className={styles.boardDate}>
                      {new Date(post.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </div>
                ))
              ) : (
                <div className={styles.noPosts}>게시글이 없습니다.</div>
              )}
            </div>
            <button
              className={styles.writeBtn}
              onClick={(e) => boardPageSubmit(e)}
            >
              글쓰기
            </button>
          </div>
        );
      case "faq":
        return (
          <div className={styles.tabContent}>
            <h3>자주 묻는 질문</h3>
            <div className={styles.faqList}>
              <div className={styles.faqItem} onClick={() => navigate("/faq")}>
                <span className={styles.faqIcon}>Q.</span>
                <span className={styles.faqTitle}>
                  홈페이지 제작 기간은 얼마나 걸리나요?
                </span>
              </div>
              <div className={styles.faqItem} onClick={() => navigate("/faq")}>
                <span className={styles.faqIcon}>Q.</span>
                <span className={styles.faqTitle}>
                  제작 비용은 어떻게 산정되나요?
                </span>
              </div>
            </div>
            <button
              className={styles.writeBtn}
              onClick={() => navigate("/faq")}
            >
              더보기
            </button>
          </div>
        );
      case "notice":
        return (
          <div className={styles.tabContent}>
            <h3>공지사항</h3>
            <div className={styles.noticeList}>
		   {isLoading ? (
                <div className={styles.loading}>로딩 중...</div>
              ) : noticePosts.length > 0 ? (
                noticePosts.map((notice) => (
                  <div
                    key={notice.id}
                    className={styles.noticeItem}
                    onClick={(e) => noticePageSubmit(e)}
                  >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                    >
                      <span className={styles.noticeBadge}>{ notice.noticetype}</span>
                      <span className={styles.noticeTitle}>{notice.title}</span>
                </div>

                    <span className={styles.noticeDate}>
                      {notice.date}
                    </span>
                  </div>
                ))
              ) : (
                <div className={styles.noPosts}>게시글이 없습니다.</div>
              )}
            </div>

            <button className={styles.writeBtn} onClick={(e) => noticePageSubmit(e)}>
              더보기
            </button>
          </div>
        );
      case "review":
        return (
          <div className={styles.tabContent}>
            <h3>리뷰</h3>
            <div className={styles.reviewList}>
              {isLoading ? (
                <div className={styles.loading}>로딩 중...</div>
              ) : reviewPosts.length > 0 ? (
                reviewPosts.map((review) => (
                  <div
                    key={review.id}
                    className={styles.reviewItem}
                    onClick={(e) => reviewPageSubmit(e)}
                  >
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewRating}>
                        {Array.from({ length: 5 }, (_, i) =>
                          i < review.rating ? "★" : "☆"
                        ).join("")}
                      </span>
                      <span className={styles.reviewAuthor}>
                        {review.author || "익명"}
                      </span>
                      <span className={styles.reviewDate}>
                        {review.date
                          ? new Date(review.date).toLocaleDateString("ko-KR")
                          : ""}
                      </span>
                    </div>
                    <div className={styles.reviewContent}>{review.content}</div>
                  </div>
                ))
              ) : (
                <div className={styles.noPosts}>리뷰가 없습니다.</div>
              )}
            </div>
            <button
              className={styles.writeBtn}
              onClick={(e) => reviewPageSubmit(e)}
            >
              리뷰 작성하기
            </button>
          </div>
        );
      default:
        return <div className={styles.tabContent}>준비 중입니다.</div>;
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarTabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabBtn} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className={styles.sidebarContent}>{renderTabContent()}</div>
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.projectCard}
      onClick={() => navigate(`/service-selection`)}
    >
      <div className={styles.projectImageContainer}>
        <img
          src={project.src}
          alt={project.title}
          className={styles.projectImage}
        />
        <div className={styles.projectOverlay}>
          <div className={styles.projectCategory}>{project.category}</div>
          <div className={styles.projectDuration}>{project.duration}</div>
        </div>
      </div>
      <div className={styles.projectInfo}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <div className={styles.projectRating}>
          <img src={favorite} alt="좋아요" className={styles.ratingIcon} />
          <span className={styles.ratingScore}>{project.great.toFixed(1)}</span>
          <span className={styles.commentCount}>({project.comment})</span>
        </div>
        <div className={styles.projectPrice}>
          {project.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 ~
        </div>
        <div className={styles.projectProducer}>
          <img src={produimg} alt="producer" className={styles.producerIcon} />
          <span className={styles.producerName}>{project.producer}</span>
        </div>
        <div className={styles.projectTags}>
          {project.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function SubMainHome() {
  return (
    <div className={styles.subMainHome}>
      <div className={styles.mainContent}>
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
    <section
      className={styles.projectSection}
      style={{ backgroundColor: bgColor }}
    >
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div className={styles.projectsGrid}>
          {data.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className={styles.sectionFooter}>
          <button
            className={styles.viewMoreBtn}
            onClick={() => navigate("/service-selection")}
          >
            더 많은 {title.split(" ")[0]} 보기
          </button>
        </div>
      </div>
    </section>
  );
};
