import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/InquiryWritePage.css";
import axios from "axios";

const InquiryWritePage = () => {
  const navigate = useNavigate();
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

    // TODO: API 연동
    // console.log('제출된 데이터:', formData);
    // alert('문의가 접수되었습니다.');
    try {
      const response = await axios.post('http://localhost:3001/api/send-inquiry', formData);
      if (response.data.success) {
        alert('문의가 접수되었습니다.');
        navigate('/');
      } else {
        alert('문의 접수 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('문의 접수 실패:', error);
      alert('문의 접수 중 오류가 발생했습니다.');
    }
    // navigate('/');
    // navigate("/inquiry"); // 문의사항 목록으로 이동
  };

  return (
    <div className="inquiry-write-page">
      <div className="inquiry-write-container">
        <div className="inquiry-write-header">
          <h1>문의사항 작성</h1>
          <p>문의하실 내용을 자세히 작성해 주시면 빠른 답변 드리도록 하겠습니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="inquiry-form">
          <div className="form-group">
            <label htmlFor="category">문의 유형</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="general">일반 문의</option>
              <option value="technical">기술 문의</option>
              <option value="business">비즈니스 문의</option>
              <option value="payment">결제 문의</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="문의 제목을 입력해주세요"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">문의 내용</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="문의하실 내용을 자세히 작성해주세요"
              rows="10"
              required
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
              />
              비밀글 설정
            </label>
          </div>

          <div className="form-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/inquiry")}
            >
              취소
            </button>
            <button type="submit" className="submit-btn">
              문의하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryWritePage;