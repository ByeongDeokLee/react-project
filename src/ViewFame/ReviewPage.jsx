import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/ReviewPage.css";

const ReviewPage = () => {
  const navigate = useNavigate();
  const [reviews] = useState([
    {
      id: 1,
      title: "홈페이지 제작 후기",
      content:
        "정말 만족스러운 결과물을 받았습니다. 특히 디자인 부분에서 많은 도움을 주셔서 감사합니다.",
      author: "김서연",
      date: "2024.03.15",
      rating: 5,
      service: "홈페이지 제작",
    },
    {
      id: 2,
      title: "쇼핑몰 제작 리뷰",
      content:
        "처음 쇼핑몰을 만들었는데, 친절한 설명과 빠른 대응으로 좋은 결과물을 얻을 수 있었습니다.",
      author: "이지훈",
      date: "2024.03.14",
      rating: 4,
      service: "쇼핑몰 제작",
    },
  ]);

  return (
    <div className="review-page">
      <div className="review-header">
        <h1>고객 리뷰</h1>
        <button className="write-btn" onClick={() => navigate("/review/write")}>
          리뷰 작성하기
        </button>
      </div>

      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header-info">
              <div className="review-title-section">
                <h3>{review.title}</h3>
                <span className="service-badge">{review.service}</span>
              </div>
              <div className="review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>

            <p className="review-content">{review.content}</p>

            <div className="review-footer">
              <span className="review-author">{review.author}</span>
              <span className="review-date">{review.date}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="page-btn">이전</button>
        <button className="page-btn active">1</button>
        <button className="page-btn">2</button>
        <button className="page-btn">3</button>
        <button className="page-btn">다음</button>
      </div>
    </div>
  );
};

export default ReviewPage;
