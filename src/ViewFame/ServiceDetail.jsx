"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const swiperRef = useRef(null);

  // 결제 옵션 데이터
  const paymentOptions = [
    {
      id: "basic",
      name: "일반형",
      desc: "페이지 3개 이하, 기간 한달, 이상 유지보수 한달",
      price: 150000,
    },
    {
      id: "business",
      name: "비지니스",
      desc: "페이지 5개 이하 및 UI 수정요청 가능, 기간 두달, 이상 유지보수 3달",
      price: 500000,
    },
    {
      id: "premium",
      name: "프리미엄형",
      desc: "페이지 10개 이하 개발 중 UI 수정 가능, 개발기간 3개월 이상, 유지보수 1년",
      price: 1000000,
    },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  // 옵션 체크박스 핸들러
  const handleOptionChange = (id) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((opt) => opt !== id) : [...prev, id]
    );
  };

  // 옵션 추가 가격 계산
  const selectedOptionsData = paymentOptions.filter((opt) => selectedOptions.includes(opt.id));
  const optionsTotal = selectedOptionsData.reduce((sum, opt) => sum + opt.price, 0);
  const totalPrice = (service?.price || 0) + optionsTotal;

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

  // Swiper 슬라이드 변경 시 대표 이미지 인덱스 동기화
  const handleSlideChange = (swiper) => {
    setSelectedImageIndex(swiper.activeIndex);
  };

  // 썸네일 클릭 시 Swiper 슬라이드 이동
  const handleThumbnailClick = (idx) => {
    setSelectedImageIndex(idx);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(idx);
    }
  };

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
              <>
                {/* 대표 이미지 */}
                <div className={styles.mainImageWrapper}>
                  <img
                    src={images[selectedImageIndex].image_url || images[selectedImageIndex].url || ""}
                    alt={`${service.title || "서비스"} 대표 이미지`}
                    className={styles.mainImage}
                  />
                </div>
                {/* 썸네일 리스트 */}
                <div className={styles.thumbnailList}>
                  {images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image.image_url || image.url || ""}
                      alt={`썸네일 ${idx + 1}`}
                      className={
                        idx === selectedImageIndex
                          ? `${styles.thumbnail} ${styles.selectedThumbnail}`
                          : styles.thumbnail
                      }
                      onClick={() => handleThumbnailClick(idx)}
                    />
                  ))}
                </div>
                {/* Swiper (숨김 처리, 접근성/스와이프용) */}
                <div style={{ display: "none" }}>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={true}
                    pagination={{ clickable: true }}
                    className={styles.serviceSwiper}
                    allowTouchMove={true}
                    grabCursor={true}
                    onSlideChange={handleSlideChange}
                    ref={swiperRef}
                    initialSlide={selectedImageIndex}
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
              </>
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

            {/* 결제 옵션 선택 (정보 섹션 내부로 이동) */}
            <div className={styles.paymentExtraOptions}>
              <h2 className={styles.optionsTitle}>추가 결제 옵션</h2>
              <div className={styles.optionList}>
                {paymentOptions.map((opt) => (
                  <label key={opt.id} className={`${styles.optionBox}${selectedOptions.includes(opt.id) ? ' ' + styles.selectedOptionBox : ''}`}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(opt.id)}
                      onChange={() => handleOptionChange(opt.id)}
                    />
                    <div className={styles.optionInfo}>
                      <span className={styles.optionName}>{opt.name}</span>
                      <span className={styles.optionDesc}>{opt.desc}</span>
                    </div>
                    <span className={styles.optionPrice}>+{opt.price.toLocaleString()}원</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 결제 버튼 (정보 섹션 내부) */}
            <div className={styles.paymentSection}>
              <button
                className={styles.paymentButton}
                onClick={handlePaymentClick}
              >
                {totalPrice.toLocaleString()}원 결제하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
