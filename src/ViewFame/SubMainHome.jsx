"use client";

import styles from "../CssFolder/SubMainHome.module.css";

//이미지
import favorite from "../assets/img/favorite.png";
import produimg from "../assets/img/produimg.png";

//라이브러리
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import useApi from "../js/useApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SubMainHome() {
  const [projectData, setProjectData] = useState([]);
  const [shoppingData, setShoppingData] = useState([]);
  const [communityData, setCommunitData] = useState([]);
  const [activeTab, setActiveTab] = useState("inquiry");
  const [boardPosts, setBoardPosts] = useState([]); //게시판
  const [noticePosts, setNoticePosts] = useState([]); //공지사항
  const [reviewPosts, setReviewPosts] = useState([]); //공지사항
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { request } = useApi(); // useApi 훅에서 request 받아오기

  // fetchAllData를 SubMainHome에서 정의
  const fetchAllData = useCallback(async () => {
    try {
      const servicesList = await request({
        method: "get",
        url: "http://localhost:4000/api/serviceList",
      });
      console.log("API 응답 데이터", servicesList);

      // 각 타입별로 데이터 분류 (filter 사용)
      const projectServices = servicesList.filter(
        (service) =>
          service.service_type === "디자인" || service.service_type === "개발"
      );

      const shoppingServices = servicesList.filter(
        (service) => service.service_type === "영상"
      );

      const communityServices = servicesList.filter(
        (service) =>
          service.service_type === "컨텐츠" || service.service_type === "번역"
      );

      // 상태 업데이트 (함수 호출로 수정)
      setProjectData(projectServices);
      setShoppingData(shoppingServices);
      setCommunitData(communityServices);

      console.log("projectData", projectServices);
      console.log("shoppingData", shoppingServices);
      console.log("communityData", communityServices);
    } catch (error) {
      console.error("데이터 갱신 에러:", error);
    }
  }, []);

  // useEffect를 fetchAllData 정의 후에 배치
  useEffect(() => {
    console.log("\n\n useEffect진입 \n\n\n");
    // 최초 1회 실행
    fetchAllData();

    // 5분마다 실행
    const interval = setInterval(() => {
      fetchAllData();
    }, 300000); // 5분

    // 언마운트시 인터벌 해제
    return () => clearInterval(interval);
  }, [fetchAllData]); // fetchAllData 제거

  const Sidebar = () => {
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
        });
        console.log("공지사항", response);
        const limitedPosts = response.slice(0, 2);
        setNoticePosts(limitedPosts);
        // navigate("/notice", { state: { notice: response } });
      } catch (error) {
        console.error("Error getting notice:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchReviewPosts = async () => {
      setIsLoading(true);
      try {
        const response = await request({
          method: "GET",
          url: "http://localhost:4000/api/reviewsList",
        });
        console.log("공지사항", response);
        const limitedPosts = response.slice(0, 2);
        setReviewPosts(limitedPosts);
      } catch (error) {
        console.error("Error getting notice:", error);
      } finally {
        setIsLoading(false);
      }
    };

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
                  <span className={styles.inquiryTitle}>
                    홈페이지 제작 문의
                  </span>
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
                <div
                  className={styles.faqItem}
                  onClick={() => navigate("/faq")}
                >
                  <span className={styles.faqIcon}>Q.</span>
                  <span className={styles.faqTitle}>
                    홈페이지 제작 기간은 얼마나 걸리나요?
                  </span>
                </div>
                <div
                  className={styles.faqItem}
                  onClick={() => navigate("/faq")}
                >
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
                        <span className={styles.noticeBadge}>
                          {notice.noticetype}
                        </span>
                        <span className={styles.noticeTitle}>
                          {notice.title}
                        </span>
                      </div>

                      <span className={styles.noticeDate}>{notice.date}</span>
                    </div>
                  ))
                ) : (
                  <div className={styles.noPosts}>게시글이 없습니다.</div>
                )}
              </div>

              <button
                className={styles.writeBtn}
                onClick={(e) => noticePageSubmit(e)}
              >
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
                      <div className={styles.reviewContent}>
                        {review.content}
                      </div>
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

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  // project가 없으면 렌더링하지 않음
  if (!project) {
    return null;
  }

  // 이미지 배열이 있는지 확인
  const images = project.images || [];
  const hasImages = images.length > 0;

  // 카드 클릭 핸들러
  const handleCardClick = () => {
    navigate(`/service-detail`, { state: { service: project } });
  };

  // 슬라이더 관련 클릭 이벤트 방지
  const handleSwiperClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.projectCard} onClick={handleCardClick}>
      <div className={styles.projectImageContainer}>
        {hasImages ? (
          <div className={styles.swiperContainer} onClick={handleSwiperClick}>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              className={styles.projectSwiper}
              allowTouchMove={true}
              grabCursor={true}
              onSlideChange={() => {}} // 슬라이드 변경 시 추가 로직이 필요하면 여기에
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.image_url || image.url || ""}
                    alt={`${project.title || "프로젝트"} 이미지 ${index + 1}`}
                    className={styles.projectImage}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className={styles.noImageContainer}>
            <div className={styles.noImagePlaceholder}>
              <span>이미지 없음</span>
            </div>
          </div>
        )}
        <div className={styles.projectOverlay}>
          <div className={styles.projectCategory}>
            {project.category || "카테고리"}
          </div>
          <div className={styles.projectDuration}>
            {project.duration || "기간"}
          </div>
        </div>
      </div>
      <div className={styles.projectInfo}>
        <h3 className={styles.projectTitle}>{project.title || "제목 없음"}</h3>
        <div className={styles.projectRating}>
          <img src={favorite} alt="좋아요" className={styles.ratingIcon} />
          <span className={styles.ratingScore}>
            {(project.great || 0).toFixed(1)}
          </span>
          <span className={styles.commentCount}>({project.comment || 0})</span>
        </div>
        <div className={styles.projectPrice}>
          {(project.price || 0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원 ~
        </div>
        <div className={styles.projectProducer}>
          <img src={produimg} alt="producer" className={styles.producerIcon} />
          <span className={styles.producerName}>
            {project.user?.name || "제작자"}
          </span>
        </div>
        <div className={styles.projectTags}>
          {(project.tags || []).map((tag, index) => (
            <span key={index} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectSection = ({ title, description, data, bgColor = "white" }) => {
  const navigate = useNavigate();

  const handleViewMoreClick = () => {
    if (data && data.length > 0) {
      // 첫 번째 서비스의 상세 페이지로 이동
      navigate("/service-detail", { state: { service: data[0] } });
    } else {
      // 데이터가 없으면 서비스 선택 페이지로 이동
      navigate("/service-selection");
    }
  };

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
          <button className={styles.viewMoreBtn} onClick={handleViewMoreClick}>
            더 많은 {title.split(" ")[0]} 보기
          </button>
        </div>
      </div>
    </section>
  );
};
