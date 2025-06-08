"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/ServiceSelection.css";

const serviceOptions = {
  basic: {
    title: "기본 기능",
    options: [
      {
        id: "responsive",
        name: "반응형 디자인",
        price: 50000,
        description: "모든 디바이스에서 최적화된 화면",
      },
      {
        id: "seo",
        name: "SEO 최적화",
        price: 30000,
        description: "검색엔진 최적화로 노출도 향상",
      },
      {
        id: "mobile",
        name: "모바일 최적화",
        price: 40000,
        description: "모바일 환경에 특화된 UI/UX",
      },
      {
        id: "ssl",
        name: "SSL 보안인증서",
        price: 20000,
        description: "사이트 보안 강화",
      },
    ],
  },
  pages: {
    title: "페이지 구성",
    options: [
      {
        id: "main",
        name: "메인페이지",
        price: 100000,
        description: "브랜드를 대표하는 메인 페이지",
        required: true,
      },
      {
        id: "about",
        name: "회사소개",
        price: 50000,
        description: "회사/개인 소개 페이지",
      },
      {
        id: "contact",
        name: "연락처/오시는길",
        price: 30000,
        description: "연락처 및 위치 정보",
      },
      {
        id: "gallery",
        name: "갤러리/포트폴리오",
        price: 80000,
        description: "작품이나 제품 갤러리",
      },
      {
        id: "blog",
        name: "블로그/뉴스",
        price: 120000,
        description: "콘텐츠 관리 시스템",
      },
      {
        id: "faq",
        name: "FAQ/고객지원",
        price: 40000,
        description: "자주 묻는 질문 페이지",
      },
    ],
  },
  advanced: {
    title: "고급 기능",
    options: [
      {
        id: "membership",
        name: "회원가입/로그인",
        price: 150000,
        description: "사용자 계정 관리 시스템",
      },
      {
        id: "admin",
        name: "관리자 페이지",
        price: 200000,
        description: "콘텐츠 관리를 위한 관리자 패널",
      },
      {
        id: "payment",
        name: "결제 시스템",
        price: 300000,
        description: "온라인 결제 기능 통합",
      },
      {
        id: "booking",
        name: "예약 시스템",
        price: 250000,
        description: "온라인 예약 및 스케줄 관리",
      },
      {
        id: "chat",
        name: "실시간 채팅",
        price: 180000,
        description: "고객 상담을 위한 채팅 기능",
      },
      {
        id: "search",
        name: "사이트 내 검색",
        price: 100000,
        description: "콘텐츠 검색 기능",
      },
    ],
  },
  design: {
    title: "디자인 & 브랜딩",
    options: [
      {
        id: "custom-design",
        name: "커스텀 디자인",
        price: 200000,
        description: "고유한 브랜드 디자인",
      },
      {
        id: "logo",
        name: "로고 제작",
        price: 100000,
        description: "전문 로고 디자인",
      },
      {
        id: "branding",
        name: "브랜딩 패키지",
        price: 150000,
        description: "통일된 브랜드 아이덴티티",
      },
      {
        id: "animation",
        name: "애니메이션 효과",
        price: 120000,
        description: "인터랙티브 애니메이션",
      },
    ],
  },
  maintenance: {
    title: "운영 & 유지보수",
    options: [
      {
        id: "domain",
        name: "도메인 연결",
        price: 50000,
        description: "원하는 도메인으로 연결",
      },
      {
        id: "hosting",
        name: "1년 호스팅",
        price: 200000,
        description: "안정적인 웹 호스팅 서비스",
      },
      {
        id: "maintenance",
        name: "3개월 무료 유지보수",
        price: 150000,
        description: "버그 수정 및 업데이트",
      },
      {
        id: "training",
        name: "사용법 교육",
        price: 100000,
        description: "관리자 사용법 1:1 교육",
      },
    ],
  },
};

export default function ServiceSelection() {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [projectType, setProjectType] = useState("homepage");

  useEffect(() => {
    // 필수 항목 기본 선택
    const requiredServices = {};
    Object.values(serviceOptions).forEach((category) => {
      category.options.forEach((option) => {
        if (option.required) {
          requiredServices[option.id] = true;
        }
      });
    });
    setSelectedServices(requiredServices);
  }, []);

  useEffect(() => {
    // 총 가격 계산
    let total = 0;
    Object.entries(selectedServices).forEach(([serviceId, isSelected]) => {
      if (isSelected) {
        Object.values(serviceOptions).forEach((category) => {
          const service = category.options.find((opt) => opt.id === serviceId);
          if (service) {
            total += service.price;
          }
        });
      }
    });
    setTotalPrice(total);
  }, [selectedServices]);

  const handleServiceChange = (serviceId, required = false) => {
    if (required) return; // 필수 항목은 변경 불가

    setSelectedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const handleProjectTypeChange = (type) => {
    setProjectType(type);
  };

  const handleProceedToPayment = () => {
    const selectedServicesList = Object.entries(selectedServices)
      .filter(([_, isSelected]) => isSelected)
      .map(([serviceId, _]) => {
        let service = null;
        Object.values(serviceOptions).forEach((category) => {
          const found = category.options.find((opt) => opt.id === serviceId);
          if (found) service = found;
        });
        return service;
      })
      .filter((service) => service !== null);

    const orderData = {
      projectType,
      services: selectedServicesList,
      totalPrice,
    };

    // 주문 데이터를 localStorage에 저장하거나 상태 관리
    localStorage.setItem("orderData", JSON.stringify(orderData));
    navigate("/payment");
  };

  return (
    <div className="service-selection-container">
      <div className="service-header">
        <h1>원하는 서비스를 선택해주세요</h1>
        <p>필요한 기능들을 체크하시면 맞춤 견적을 확인하실 수 있습니다.</p>
      </div>

      {/* 프로젝트 타입 선택 */}
      <div className="project-type-section">
        <h2>프로젝트 유형</h2>
        <div className="project-type-options">
          <label
            className={`project-type-option ${
              projectType === "homepage" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="projectType"
              value="homepage"
              checked={projectType === "homepage"}
              onChange={() => handleProjectTypeChange("homepage")}
            />
            <span>홈페이지</span>
          </label>
          <label
            className={`project-type-option ${
              projectType === "shopping" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="projectType"
              value="shopping"
              checked={projectType === "shopping"}
              onChange={() => handleProjectTypeChange("shopping")}
            />
            <span>쇼핑몰</span>
          </label>
          <label
            className={`project-type-option ${
              projectType === "community" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="projectType"
              value="community"
              checked={projectType === "community"}
              onChange={() => handleProjectTypeChange("community")}
            />
            <span>커뮤니티</span>
          </label>
        </div>
      </div>

      {/* 서비스 옵션들 */}
      <div className="service-categories">
        {Object.entries(serviceOptions).map(([categoryKey, category]) => (
          <div key={categoryKey} className="service-category">
            <h3>{category.title}</h3>
            <div className="service-options">
              {category.options.map((option) => (
                <div key={option.id} className="service-option">
                  <label
                    className={`service-checkbox ${
                      selectedServices[option.id] ? "checked" : ""
                    } ${option.required ? "required" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices[option.id] || false}
                      onChange={() =>
                        handleServiceChange(option.id, option.required)
                      }
                      disabled={option.required}
                    />
                    <div className="checkbox-content">
                      <div className="service-info">
                        <span className="service-name">
                          {option.name}
                          {option.required && (
                            <span className="required-badge">필수</span>
                          )}
                        </span>
                        <span className="service-description">
                          {option.description}
                        </span>
                      </div>
                      <span className="service-price">
                        {option.price.toLocaleString()}원
                      </span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 총 가격 및 결제 버튼 */}
      <div className="price-summary">
        <div className="total-price">
          <h3>총 예상 금액: {totalPrice.toLocaleString()}원</h3>
          <p>* 최종 금액은 상담 후 조정될 수 있습니다.</p>
        </div>
        <button
          className="proceed-button"
          onClick={handleProceedToPayment}
          disabled={totalPrice === 0}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
