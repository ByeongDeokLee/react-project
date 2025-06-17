import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/InquiryWritePage.css";
import useApi from "../hooks/useApi";
import LoadingSpinner from "../components/LoadingSpinner";

const InquiryWritePage = () => {
  const navigate = useNavigate();
  const { loading, error, request } = useApi();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
    isPrivate: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await request({
        method: 'POST',
        url: 'http://localhost:3001/api/send-inquiry',
        data: formData
      });

      alert('문의가 접수되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('문의 접수 실패:', error);
      alert('문의 접수 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="inquiry-write-page">
      {loading && <LoadingSpinner />}
      <div className="inquiry-write-container">
        <div className="inquiry-write-header">
          <h1>문의사항 작성</h1>
          <p>문의하실 내용을 자세히 작성해 주시면 빠른 답변 드리도록 하겠습니다.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">카테고리</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="general">일반문의</option>
              <option value="technical">기술문의</option>
              <option value="business">비즈니스문의</option>
            </select>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
                disabled={loading}
              />
              비공개로 작성
            </label>
          </div>
          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? '제출 중...' : '제출하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryWritePage;