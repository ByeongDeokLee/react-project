import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../CssFolder/NoticePage.module.css";
import useApi from "../js/useApi";

const NoticePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notices = location.state?.notice || [];
  const { request } = useApi();

  const NoticeDetail = async (e, id) => {
    e.preventDefault();
    console.log("NoticeDetail", id);
    try {
      const response = await request({
        method: "POST",
        url: `http://localhost:4000/api/getNotice/${id}`,
      });

      // console.log("\n\n\n 공지사항 \n\n", response);
      navigate(`/notice/${id}`, { state: { noticeData: response } });
    } catch (error) {}
  };

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
              notice.isimportant ? styles.important : ""
            }`}
            onClick={(e) => NoticeDetail(e, notice.id)}
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
