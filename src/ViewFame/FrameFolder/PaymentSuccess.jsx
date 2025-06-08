"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/PaymentSuccess.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [paymentResult, setPaymentResult] = useState(null);

  useEffect(() => {
    const savedPaymentResult = localStorage.getItem("paymentResult");
    if (savedPaymentResult) {
      setPaymentResult(JSON.parse(savedPaymentResult));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleGoHome = () => {
    navigate("/Home");
  };

  if (!paymentResult) {
    return <div className="loading">결제 정보를 불러오는 중...</div>;
  }

  const getProjectTypeText = (type) => {
    const types = {
      homepage: "홈페이지",
      shopping: "쇼핑몰",
      community: "커뮤니티",
    };
    return types[type] || type;
  };

  return (
    <div className="payment-success-container">
      <div className="success-content">
        <div className="success-icon">
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#28a745" />
            <path
              d="M8 12l2 2 4-4"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1>결제가 완료되었습니다!</h1>
        <p>주문이 성공적으로 접수되었습니다. 곧 담당자가 연락드리겠습니다.</p>

        <div className="order-details">
          <h2>주문 정보</h2>
          <div className="detail-item">
            <span className="label">주문번호:</span>
            <span className="value">{paymentResult.orderId}</span>
          </div>
          <div className="detail-item">
            <span className="label">프로젝트 유형:</span>
            <span className="value">
              {getProjectTypeText(paymentResult.projectType)}
            </span>
          </div>
          <div className="detail-item">
            <span className="label">결제 금액:</span>
            <span className="value">
              {paymentResult.totalPrice.toLocaleString()}원
            </span>
          </div>
          <div className="detail-item">
            <span className="label">결제 일시:</span>
            <span className="value">
              {new Date(paymentResult.paymentDate).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="customer-details">
          <h3>고객 정보</h3>
          <div className="detail-item">
            <span className="label">이름:</span>
            <span className="value">{paymentResult.customerInfo.name}</span>
          </div>
          <div className="detail-item">
            <span className="label">이메일:</span>
            <span className="value">{paymentResult.customerInfo.email}</span>
          </div>
          <div className="detail-item">
            <span className="label">연락처:</span>
            <span className="value">{paymentResult.customerInfo.phone}</span>
          </div>
        </div>

        <div className="next-steps">
          <h3>다음 단계</h3>
          <ul>
            <li>24시간 내에 담당자가 연락드립니다.</li>
            <li>프로젝트 상세 요구사항을 논의합니다.</li>
            <li>디자인 시안을 제작하여 검토받습니다.</li>
            <li>개발 진행 상황을 정기적으로 공유합니다.</li>
          </ul>
        </div>

        <button className="home-button" onClick={handleGoHome}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
