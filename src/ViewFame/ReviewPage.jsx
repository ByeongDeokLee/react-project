import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CssFolder/ReviewPage.module.css";

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
    <div className={styles.reviewPage}>
      <div className={styles.reviewHeader}>
        <h1>고객 리뷰</h1>
        <button
          className={styles.writeBtn}
          onClick={() => navigate("/review/write")}
        >
          리뷰 작성하기
        </button>
      </div>

      <div className={styles.reviewList}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewHeaderInfo}>
              <div className={styles.reviewTitleSection}>
                <h3>{review.title}</h3>
                <span className={styles.serviceBadge}>{review.service}</span>
              </div>
              <div className={styles.reviewRating}>
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
            </div>

            <p className={styles.reviewContent}>{review.content}</p>

            <div className={styles.reviewFooter}>
              <span className={styles.reviewAuthor}>{review.author}</span>
              <span className={styles.reviewDate}>{review.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button className={styles.pageBtn}>이전</button>
        <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
        <button className={styles.pageBtn}>2</button>
        <button className={styles.pageBtn}>3</button>
        <button className={styles.pageBtn}>다음</button>
      </div>
    </div>
  );
};

export default ReviewPage;
