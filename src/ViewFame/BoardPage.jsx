import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CssFolder/BoardPage.css";
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
      const response = await request({
        method: 'GET',
        url: `http://localhost:3001/api/posts/${id}`,
      });
      navigate(`/board/${id}`, { state: { post: response } });
    } catch (error) {
      console.error('Error getting post:', error);
      throw error;
    }
  }

  return (
    <div className="board-page">
      <div className="board-header">
        <div className="board-title">
          <h1>게시판</h1>
        </div>
        <div className="board-actions">
          <button className="write-btn" onClick={() => navigate("/board/write")}>
            글쓰기
          </button>
        </div>
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
            onClick={(e) => boardDetailSubmit(e, post.id)
        }
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
