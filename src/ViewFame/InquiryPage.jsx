import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/InquiryPage.css";
import axios from "axios";


const InquiryPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "general",
    content: "",
    contact: "",
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };



  // const sendEmail = async (to, subject, text, html) => {
  //   try {
  //     const transporter  = nodeMailer.createTransport({
  //       service: 'Naver',
  //       host: 'smtp.naver.com',
  //       port: 993,
  //       auth: {
  //         user: 'dlqudejr89@naver.com',
  //         pass: 'ko171018@A'
  //       }

  //     });

  //     const mailOptions = {
  //       from: "YOUR_NAVER_EMAIL_ADDRESS", // 네이버 이메일 주소
  //       to: to,
  //       subject: subject,
  //       text: text,
  //       html: html,
  //     };

  //     const info = await transporter.sendMail(mailOptions);
  //     console.log("Message sent: %s", info.messageId);
  //     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //   } catch (error) {
  //     console.error("Error sending email:", error);
  //   }
  // };


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
  };

  return (
    <div className="inquiry-page">
      <div className="inquiry-container">
        <div className="inquiry-header">
          <h1>문의하기</h1>
          <p>궁금하신 점을 문의해 주세요. 빠른 시일 내에 답변 드리겠습니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="inquiry-form">
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
              <option value="billing">결제 문의</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">문의 내용</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="문의하실 내용을 자세히 입력해주세요"
              required
              rows="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">연락처</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="답변 받으실 연락처를 입력해주세요"
              required
            />
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeToTerms">
              개인정보 수집 및 이용에 동의합니다
            </label>
          </div>

          <div className="form-buttons">
            <button type="button" onClick={() => navigate(-1)} className="cancel-btn">
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

export default InquiryPage;