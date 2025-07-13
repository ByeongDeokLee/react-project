"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "../CssFolder/ServiceDetail.module.css";

// 이미지
import favorite from "../assets/img/favorite.png";
import produimg from "../assets/img/produimg.png";

export default function ServiceDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.service) {
      setService(location.state.service);
    }
    setLoading(false);
  }, [location.state]);

  const handlePaymentClick = () => {
    navigate("/payment", { state: { service } });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (!service) {
    return (
      <div className={styles.error}>
        <h2>서비스 정보를 찾을 수 없습니다.</h2>
        <button onClick={handleBackClick}>뒤로 가기</button>
      </div>
    );
  }

  const images = service.images || [];
  const hasImages = images.length > 0;

  return (
    <div className={styles.serviceDetail}>
      <div className={styles.container}>
        {/* 헤더 */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleBackClick}>
            ← 뒤로 가기
          </button>
          <h1 className={styles.serviceTitle}>
            {service.title || "서비스 제목"}
          </h1>
        </div>

        {/* 메인 콘텐츠 */}
        <div className={styles.mainContent}>
          {/* 이미지 섹션 */}
          <div className={styles.imageSection}>
            {hasImages ? (
              <div className={styles.swiperContainer}>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation={true}
                  pagination={{ clickable: true }}
                  className={styles.serviceSwiper}
                  allowTouchMove={true}
                  grabCursor={true}
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image.image_url || image.url || ""}
                        alt={`${service.title || "서비스"} 이미지 ${index + 1}`}
                        className={styles.serviceImage}
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
          </div>

          {/* 정보 섹션 */}
          <div className={styles.infoSection}>
            {/* 기본 정보 */}
            <div className={styles.basicInfo}>
              <div className={styles.serviceHeader}>
                <h2 className={styles.serviceName}>
                  {service.title || "서비스 제목"}
                </h2>
                <div className={styles.serviceRating}>
                  <img
                    src={favorite}
                    alt="좋아요"
                    className={styles.ratingIcon}
                  />
                  <span className={styles.ratingScore}>
                    {(service.great || 0).toFixed(1)}
                  </span>
                  <span className={styles.commentCount}>
                    ({service.comment || 0})
                  </span>
                </div>
              </div>

              <div className={styles.servicePrice}>
                <span className={styles.priceLabel}>가격</span>
                <span className={styles.priceValue}>
                  {(service.price || 0)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원 ~
                </span>
              </div>

              <div className={styles.serviceCategory}>
                <span className={styles.categoryLabel}>카테고리</span>
                <span className={styles.categoryValue}>
                  {service.category || service.service_type || "카테고리"}
                </span>
              </div>

              <div className={styles.serviceDuration}>
                <span className={styles.durationLabel}>제작 기간</span>
                <span className={styles.durationValue}>
                  {service.duration || "기간 미정"}
                </span>
              </div>
            </div>

            {/* 제작자 정보 */}
            <div className={styles.producerInfo}>
              <h3>제작자 정보</h3>
              <div className={styles.producer}>
                <img
                  src={produimg}
                  alt="producer"
                  className={styles.producerIcon}
                />
                <span className={styles.producerName}>
                  {service.user?.name || "제작자"}
                </span>
              </div>
            </div>

            {/* 태그 */}
            {service.tags && service.tags.length > 0 && (
              <div className={styles.tagsSection}>
                <h3>태그</h3>
                <div className={styles.tags}>
                  {service.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 서비스 설명 */}
            <div className={styles.descriptionSection}>
              <h3>서비스 설명</h3>
              <div className={styles.description}>
                {service.description || "서비스 설명이 없습니다."}
              </div>
            </div>

            {/* 결제 버튼 */}
            <div className={styles.paymentSection}>
              <button
                className={styles.paymentButton}
                onClick={handlePaymentClick}
              >
                결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
