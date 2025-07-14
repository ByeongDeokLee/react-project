"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../CssFolder/Payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    requirements: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // 결제 옵션 데이터
  const paymentOptions = [
    {
      id: "basic",
      name: "일반형",
      desc: "페이지 3개 이하, 기간 한달, 이상 유지보수 한달",
      price: 150000,
    },
    {
      id: "business",
      name: "비지니스",
      desc: "페이지 5개 이하 및 UI 수정요청 가능, 기간 두달, 이상 유지보수 3달",
      price: 500000,
    },
    {
      id: "premium",
      name: "프리미엄형",
      desc: "페이지 10개 이하 개발 중 UI 수정 가능, 개발기간 3개월 이상, 유지보수 1년",
      price: 1000000,
    },
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);

  // 옵션 체크박스 핸들러
  const handleOptionChange = (id) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((opt) => opt !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    // 서비스 상세 페이지에서 전달받은 데이터 확인
    if (location.state?.service) {
      const service = location.state.service;
      const orderDataFromService = {
        projectType: service.service_type || "기타",
        services: [
          {
            name: service.title || "서비스",
            price: service.price || 0,
            description: service.description || "",
          },
        ],
        totalPrice: service.price || 0,
      };
      setOrderData(orderDataFromService);
    } else {
      // 기존 localStorage에서 데이터 확인
      const savedOrderData = localStorage.getItem("orderData");
      if (savedOrderData) {
        setOrderData(JSON.parse(savedOrderData));
      } else {
        // 주문 데이터가 없으면 서비스 선택 페이지로 리다이렉트
        navigate("/service-selection");
      }
    }
  }, [navigate, location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    setIsProcessing(true);

    try {
      const { IMP } = window;
      console.log("\n\n\n IMP \n\n\n", IMP);
      IMP.init("imp70878854");
      IMP.request_pay(
        {
          pg: "kcp", //PG사구분코드.{사이트코드},
          pay_method: "card", // card
          merchant_uid: "ORD20180131-0000012",
          name: getProjectTypeText(orderData.projectType),
          amount: 100,
          buyer_email: "gildong@gmail.com",
          buyer_name: "홍길동",
          buyer_tel: "010-0000-0000",
          buyer_addr: "서울특별시 강남구 신사동",
          buyer_postcode: "01181",
          m_redirect_url: "",
        },
        (rsp) => {
          console.log("\n\n\n rsp \n\n\n", rsp);
        }
      );
      // 실제 결제 API 호출 시뮬레이션
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // // 결제 완료 후 처리
      // const paymentResult = {
      //   orderId: "ORDER_" + Date.now(),
      //   ...orderData,
      //   customerInfo,
      //   paymentMethod,
      //   paymentDate: new Date().toISOString(),
      //   status: "completed",
      // };

      // localStorage.setItem("paymentResult", JSON.stringify(paymentResult));
      // localStorage.removeItem("orderData");

      // alert("결제가 완료되었습니다! 곧 담당자가 연락드리겠습니다.");

      // navigate("/payment-success");
    } catch (error) {
      alert("결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!orderData) {
    return <div className="loading">주문 정보를 불러오는 중...</div>;
  }

  const getProjectTypeText = (type) => {
    const types = {
      homepage: "홈페이지",
      shopping: "쇼핑몰",
      community: "커뮤니티",
    };
    return types[type] || type;
  };

  // 옵션 추가 가격 계산
  const selectedOptionsData = paymentOptions.filter((opt) => selectedOptions.includes(opt.id));
  const optionsTotal = selectedOptionsData.reduce((sum, opt) => sum + opt.price, 0);
  const totalPrice = (orderData?.totalPrice || 0) + optionsTotal;

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1>결제하기</h1>
        <p>선택하신 서비스의 결제를 진행합니다.</p>
      </div>

      <div className="payment-content">
        {/* 주문 요약 */}
        <div className="order-summary">
          <h2>주문 요약</h2>
          <div className="project-type">
            <strong>
              프로젝트 유형: {getProjectTypeText(orderData.projectType)}
            </strong>
          </div>

          <div className="selected-services">
            <h3>선택된 서비스</h3>
            {orderData.services.map((service, index) => (
              <div key={index} className="service-item">
                <span className="service-name">{service.name}</span>
                <span className="service-price">
                  {service.price.toLocaleString()}원
                </span>
              </div>
            ))}
          </div>

          {/* 선택된 옵션 표시 */}
          {selectedOptionsData.length > 0 && (
            <div className="selected-options">
              <h3>추가 옵션</h3>
              {selectedOptionsData.map((opt) => (
                <div key={opt.id} className="option-item">
                  <span className="option-name">{opt.name}</span>
                  <span className="option-desc">{opt.desc}</span>
                  <span className="option-price">+{opt.price.toLocaleString()}원</span>
                </div>
              ))}
            </div>
          )}

          <div className="total-amount">
            <strong>
              총 결제 금액: {totalPrice.toLocaleString()}원
            </strong>
          </div>
        </div>

        {/* 고객 정보 */}
        <div className="customer-info">
          <h2>고객 정보</h2>
          <div className="form-group">
            <label>이름 *</label>
            <input
              type="text"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              placeholder="이름을 입력해주세요"
              required
            />
          </div>

          <div className="form-group">
            <label>이메일 *</label>
            <input
              type="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력해주세요"
              required
            />
          </div>

          <div className="form-group">
            <label>연락처 *</label>
            <input
              type="tel"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              placeholder="연락처를 입력해주세요"
              required
            />
          </div>

          <div className="form-group">
            <label>회사명 (선택)</label>
            <input
              type="text"
              name="company"
              value={customerInfo.company}
              onChange={handleInputChange}
              placeholder="회사명을 입력해주세요"
            />
          </div>

          <div className="form-group">
            <label>추가 요구사항</label>
            <textarea
              name="requirements"
              value={customerInfo.requirements}
              onChange={handleInputChange}
              placeholder="프로젝트에 대한 추가 요구사항이나 특별한 사항이 있으시면 입력해주세요"
              rows="4"
            />
          </div>
        </div>

        {/* 결제 방법 */}
        <div className="payment-method">
          <h2>결제 방법</h2>
          <div className="payment-options">
            <label
              className={`payment-option ${
                paymentMethod === "card" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>신용카드</span>
            </label>

            <label
              className={`payment-option ${
                paymentMethod === "bank" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>무통장입금</span>
            </label>

            <label
              className={`payment-option ${
                paymentMethod === "kakao" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="kakao"
                checked={paymentMethod === "kakao"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>카카오페이</span>
            </label>
          </div>
        </div>

        {/* 결제 옵션 선택 */}
        <div className="payment-extra-options">
          <h2>추가 결제 옵션</h2>
          <div className="option-list">
            {paymentOptions.map((opt) => (
              <label key={opt.id} className={`option-box${selectedOptions.includes(opt.id) ? " selected" : ""}`}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(opt.id)}
                  onChange={() => handleOptionChange(opt.id)}
                />
                <div className="option-info">
                  <span className="option-title">{opt.name}</span>
                  <span className="option-desc">{opt.desc}</span>
                </div>
                <span className="option-price">+{opt.price.toLocaleString()}원</span>
              </label>
            ))}
          </div>
        </div>

        {/* 결제 버튼 */}
        <div className="payment-actions">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            disabled={isProcessing}
          >
            이전으로
          </button>
          <button
            className="payment-button"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing
              ? "결제 처리 중..."
              : `${totalPrice.toLocaleString()}원 결제하기`}
          </button>
        </div>
      </div>
    </div>
  );
}
