"use client";

//프레임
import FirstCtgry from "../../CtgryFolder/FrameFolder/FirstCtgry";
import SecondCtgrt from "../../CtgryFolder/FrameFolder/SecondCtgrt";
import SubMainHome from "./SubMainHome";
import CompanyIntro from "./CompanyIntro";

//css 파일
import "../CssFolder/MainHome.css";

//이미지 파일
import img1 from "../../assets/img/img1.jpg";
import img2 from "../../assets/img/img2.jpg";
import img3 from "../../assets/img/img3.jpg";
import img4 from "../../assets/img/img4.jpg";

//라이브러리
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MainHome() {
  const navigate = useNavigate();
  const images = [img1, img2, img3, img4];
  const [searchID, setSearchID] = useState("");

  const searchValue = (event) => {
    setSearchID(event.target.value);
  };

  const searchSubmit = () => {
    if (searchID.trim()) {
      // 검색 결과 페이지로 이동하거나 필터링 로직 구현
      console.log("검색어:", searchID);
      // navigate(`/search?q=${encodeURIComponent(searchID)}`)
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchSubmit();
    }
  };

  return (
    <div className="main-home-container">
      <FirstCtgry />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            당신의 비즈니스를 위한
            <br />
            <span className="highlight">완벽한 웹사이트</span>
          </h1>
          <p className="hero-description">
            전문가들이 만드는 맞춤형 홈페이지로 온라인 비즈니스를 시작하세요.
            <br />
            합리적인 가격으로 고품질의 웹사이트를 제공합니다.
          </p>
          <button
            className="hero-cta-button"
            onClick={() => navigate("/service-selection")}
          >
            지금 시작하기
          </button>
        </div>

        <div className="hero-slider">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            className="hero-swiper"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="slide-container">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`슬라이드 ${index + 1}`}
                    className="slide-image"
                  />
                  <div className="slide-overlay">
                    <h3>프로젝트 {index + 1}</h3>
                    <p>고객 만족도 98%의 완성도 높은 웹사이트</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <h2>어떤 서비스가 필요하세요?</h2>
          <div className="search-wrapper">
            <div className="search-input-container">
              <svg
                className="search-icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="홈페이지, 쇼핑몰, 커뮤니티 등..."
                value={searchID}
                onChange={searchValue}
                onKeyPress={handleKeyPress}
              />
              <button className="search-button" onClick={searchSubmit}>
                검색
              </button>
            </div>
          </div>

          {/* Popular Keywords */}
          <div className="popular-keywords">
            <span className="keywords-label">인기 검색어:</span>
            <div className="keywords-list">
              {[
                "반응형 홈페이지",
                "쇼핑몰 제작",
                "회사 소개 사이트",
                "포트폴리오",
              ].map((keyword, index) => (
                <button
                  key={index}
                  className="keyword-tag"
                  onClick={() => setSearchID(keyword)}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Categories */}
      <section className="services-section">
        <div className="section-header">
          <h2>서비스 카테고리</h2>
          <p>다양한 웹사이트 제작 서비스를 제공합니다</p>
        </div>
        <SecondCtgrt />
      </section>

      {/* Featured Projects */}
      <SubMainHome />

      {/* Company Introduction */}
      <CompanyIntro />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>지금 바로 시작하세요!</h2>
          <p>전문가와 상담하고 맞춤형 견적을 받아보세요</p>
          <div className="cta-buttons">
            <button
              className="cta-primary"
              onClick={() => navigate("/service-selection")}
            >
              견적 받기
            </button>
            <button className="cta-secondary">포트폴리오 보기</button>
          </div>
        </div>
      </section>
    </div>
  );
}
