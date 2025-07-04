import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../CssFolder/BoardPage.module.css";
import useApi from "../js/useApi";

const BoardPage = () => {
  const navigate = useNavigate();
  const { request } = useApi(); // useApi 훅에서 request 받아오기
  const location = useLocation();
  const posts = location.state?.posts || [];

  console.log(posts);

  const boardDetailSubmit = async (e, id) => {
    e.preventDefault();

    try {
      const [postResponse, commentsResponse] = await Promise.all([
        request({
          method: "GET",
          url: `http://localhost:4000/api/posts/${id}`,
        }),
        request({
          method: "GET",
          url: `http://localhost:4000/api/posts/${id}/comments`,
        }),
      ]);
      navigate(`/board/${id}`, { state: { post: postResponse, comments: commentsResponse } });
    } catch (error) {
      console.error("Error getting post:", error);
      throw error;
    }
  };

  const BoardWrite = () => {
    if(localStorage.getItem("name")){
      navigate("/board/write");
    }else{
      alert("로그인 후 이용해주세요.");
    }
  };

  return (
    <div className={styles.boardPage}>
      <div className={styles.boardHeader}>
        <div className={styles.boardTitle}>
          <h1>게시판</h1>
        </div>
        <div className={styles.boardActions}>
          <button
            className={styles.writeBtn}
            onClick={() => BoardWrite()}
          >
            글쓰기
          </button>
        </div>
      </div>

      <div className={styles.boardList}>
        <div className={styles.boardHeaderRow}>
          <span className={styles.colNumber}>번호</span>
          <span className={styles.colTitle}>제목</span>
          <span className={styles.colAuthor}>작성자</span>
          <span className={styles.colDate}>작성일</span>
          <span className={styles.colViews}>조회</span>
          <span className={styles.colLikes}>좋아요</span>
        </div>

        {posts.map((post) => (
          <div
            key={post.id}
            className={styles.boardItem}
            onClick={(e) => boardDetailSubmit(e, post.id)}
          >
            <span className={styles.colNumber}>{post.id}</span>
            <span className={styles.colTitle}>{post.title}</span>
            <span className={styles.colAuthor}>{post.author}</span>
            <span className={styles.colDate}>{post.date}</span>
            <span className={styles.colViews}>{post.views}</span>
            <span className={styles.colLikes}>{post.likes}</span>
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

export default BoardPage;
