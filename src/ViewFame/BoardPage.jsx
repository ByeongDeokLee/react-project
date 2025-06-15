import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/BoardPage.css";

const BoardPage = () => {
  const navigate = useNavigate();
  const [posts] = useState([
    {
      id: 1,
      title: "홈페이지 제작 후기",
      author: "홍길동",
      date: "2024.03.15",
      views: 150,
      likes: 25,
    },
    {
      id: 2,
      title: "쇼핑몰 제작 팁",
      author: "김철수",
      date: "2024.03.14",
      views: 120,
      likes: 18,
    },
  ]);

  return (
    <div className="board-page">
      <div className="board-header">
        <h1>게시판</h1>
        <button className="write-btn" onClick={() => navigate("/board/write")}>
          글쓰기
        </button>
      </div>

      <div className="board-list">
        <div className="board-header-row">
          <span className="col-number">번호</span>
          <span className="col-title">제목</span>
          <span className="col-author">작성자</span>
          <span className="col-date">작성일</span>
          <span className="col-views">조회</span>
          <span className="col-likes">좋아요</span>
        </div>

        {posts.map((post) => (
          <div
            key={post.id}
            className="board-item"
            onClick={() => navigate(`/board/${post.id}`)}
          >
            <span className="col-number">{post.id}</span>
            <span className="col-title">{post.title}</span>
            <span className="col-author">{post.author}</span>
            <span className="col-date">{post.date}</span>
            <span className="col-views">{post.views}</span>
            <span className="col-likes">{post.likes}</span>
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

export default BoardPage;
