import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CssFolder/ReviewWritePage.module.css";
import useApi from "../js/useApi";
import LoadingSpinner from "../components/LoadingSpinner";

const ReviewWritePage = () => {
  const navigate = useNavigate();
  const { loading, request } = useApi();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    rating: 0,
    service: "general",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRating = (rate) => {
    setFormData((prev) => ({
      ...prev,
      rating: rate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }
    try {
      await request({
        method: "POST",
        url: "http://localhost:4000/api/reviews", // 가상의 API 엔드포인트
        data: formData,
      });
      alert("리뷰가 성공적으로 등록되었습니다.");
      navigate("/review");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.reviewWritePage}>
      {loading && <LoadingSpinner />}
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>리뷰 작성</h1>
          <p>서비스 경험을 공유해주셔서 감사합니다.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="리뷰 제목을 입력하세요"
              required
              disabled={loading}
            />
          </div>
          <div className={styles.formGroup}>
            <label>별점</label>
            <div className={styles.rating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`${styles.star} ${
                    formData.rating >= star ? styles.selected : ""
                  }`}
                  onClick={() => !loading && handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="service">서비스</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="general">일반</option>
              <option value="homepage">홈페이지 제작</option>
              <option value="shopping">쇼핑몰 제작</option>
              <option value="community">커뮤니티 제작</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="자세한 리뷰 내용을 작성해주세요"
              required
              disabled={loading}
            />
          </div>
          <div className={styles.buttons}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigate("/review")}
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "제출 중..." : "리뷰 등록"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewWritePage;