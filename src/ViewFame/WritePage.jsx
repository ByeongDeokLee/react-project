import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/WritePage.css";
import useApi from "../js/useApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";

const WritePage = () => {
  const navigate = useNavigate();
  const { loading, request } = useApi();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: API 연동
    //   console.log(post)
    try {
      await request({
        method: "POST",
        url: "http://localhost:4000/api/posts-write",
        data: {
          ...post,
          author: "익명", // 또는 로그인된 사용자 이름으로 대체
        },
      });

      const response = await request({
        method: "GET",
        url: "http://localhost:4000/api/posts",
      });

      // 토스트 메시지 표시 (예: react-toastify 사용)
      toast.success("게시글이 성공적으로 작성되었습니다!");
      navigate("/board", { state: { posts: response } });
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="write-page">
      {loading && <LoadingSpinner />}
      <h1>글쓰기</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            value={post.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            required
            disabled={loading}
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={() => navigate("/board")}>
            취소
          </button>
          <button type="submit">등록</button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default WritePage;
