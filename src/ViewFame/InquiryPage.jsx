import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CssFolder/InquiryPage.module.css";

const InquiryPage = () => {
  const navigate = useNavigate();
  const [inquiries] = useState([
    {
      id: 1,
      title: "홈페이지 제작 문의",
      content: "홈페이지 제작 비용과 기간에 대해 문의드립니다.",
      date: "2024.03.15",
      status: "답변완료",
    },
    {
      id: 2,
      title: "쇼핑몰 제작 비용 문의",
      content: "쇼핑몰 제작 시 필요한 기능과 비용을 알고 싶습니다.",
      date: "2024.03.14",
      status: "답변대기",
    },
  ]);

  return (
    <div className={styles.inquiryPage}>
      <div className={styles.inquiryHeader}>
        <h1>문의사항</h1>
        <button
          className={styles.writeBtn}
          onClick={() => navigate("/inquiry/write")}
        >
          문의하기
        </button>
      </div>

      <div className={styles.inquiryList}>
        {inquiries.map((inquiry) => (
          <div key={inquiry.id} className={styles.inquiryItem}>
            <div className={styles.inquiryInfo}>
              <h3>{inquiry.title}</h3>
              <p>{inquiry.content}</p>
              <div className={styles.inquiryMeta}>
                <span className={styles.date}>{inquiry.date}</span>
                <span
                  className={`${styles.status} ${
                    inquiry.status === "답변완료"
                      ? styles.completed
                      : styles.pending
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InquiryPage;
