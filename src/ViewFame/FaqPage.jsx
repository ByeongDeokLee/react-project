import React, { useState } from "react";
import "../CssFolder/FaqPage.css";

const FaqPage = () => {
  const [faqs] = useState([
    {
      id: 1,
      question: "홈페이지 제작 기간은 얼마나 걸리나요?",
      answer:
        "기본적인 홈페이지 제작은 2-3주 정도 소요됩니다. 기능의 복잡도와 디자인 요구사항에 따라 기간이 달라질 수 있습니다.",
    },
    {
      id: 2,
      question: "쇼핑몰 제작 비용은 어떻게 되나요?",
      answer:
        "쇼핑몰 제작 비용은 필요한 기능과 디자인에 따라 50만원부터 시작됩니다. 정확한 견적은 상담을 통해 안내해 드립니다.",
    },
    {
      id: 3,
      question: "제작 후 유지보수는 어떻게 하나요?",
      answer:
        "제작 완료 후 1년간 무료 유지보수를 제공해 드립니다. 이후에는 선택적으로 유지보수 계약을 체결하실 수 있습니다.",
    },
  ]);

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="faq-page">
      <div className="faq-header">
        <h1>자주 묻는 질문</h1>
        <p>고객님들께서 자주 문의하시는 질문과 답변을 모았습니다.</p>
      </div>

      <div className="faq-list">
        {faqs.map((faq) => (
          <div key={faq.id} className="faq-item">
            <div
              className={`faq-question ${openFaq === faq.id ? "open" : ""}`}
              onClick={() => toggleFaq(faq.id)}
            >
              <span className="question-text">{faq.question}</span>
              <span className="toggle-icon">
                {openFaq === faq.id ? "−" : "+"}
              </span>
            </div>
            {openFaq === faq.id && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="faq-contact">
        <p>원하시는 답변을 찾지 못하셨나요?</p>
        <button onClick={() => (window.location.href = "/inquiry")}>
          문의하기
        </button>
      </div>
    </div>
  );
};

export default FaqPage;
