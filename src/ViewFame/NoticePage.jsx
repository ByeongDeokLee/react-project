import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../CssFolder/NoticePage.module.css";

const NoticePage = () => {
  const navigate = useNavigate();
  const [notices] = useState([
    {
      id: 1,
      title: "시스템 점검 안내",
      content: "2024년 3월 20일 02:00 ~ 04:00 동안 시스템 점검이 진행됩니다.",
      date: "2024.03.15",
      isImportant: true,
    },
    {
      id: 2,
      title: "신규 서비스 출시 안내",
      content: "더 나은 서비스 제공을 위해 새로운 기능이 추가되었습니다.",
      date: "2024.03.14",
      isImportant: false,
    },
  ]);

  return (
    <div className={styles.noticePage}>
      <div className="notice-header">
        <h1>공지사항</h1>
      </div>

      <div className={styles.noticeList}>
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`${styles.noticeItem} ${
              notice.isImportant ? styles.important : ""
            }`}
            onClick={() => navigate(`/notice/${notice.id}`)}
          >
            <div className={styles.noticeInfo}>
              {notice.isImportant && (
                <span className={styles.importantBadge}>중요</span>
              )}
              <h3>{notice.title}</h3>
              <p>{notice.content}</p>
              <span className={styles.noticeDate}>{notice.date}</span>
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

export default NoticePage;
