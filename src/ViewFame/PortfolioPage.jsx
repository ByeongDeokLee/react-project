import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../js/useApi";
import "../CssFolder/MyPage.css";

const PortfolioPage = () => {
  const { memberId } = useParams();
  const { request } = useApi();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await request({
          method: "GET",
          url: `http://localhost:4000/api/users/${memberId}/portfolios`,
        });
        setItems(res?.portfolios || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (memberId) load();
  }, [memberId, request]);

  return (
    <div className="mypage-container">
      <div className="mypage-title">포트폴리오</div>
      <div className="portfolio-list">
        {loading ? (
          <div className="loading-career">불러오는 중...</div>
        ) : items.length === 0 ? (
          <div className="no-career">등록된 포트폴리오가 없습니다.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="career-item">
              <div className="career-info">
                <div className="career-company">{item.title}</div>
                {item.description && (
                  <div className="career-description">{item.description}</div>
                )}
                {item.url && (
                  <div className="career-skills">
                    <strong>URL:</strong>{" "}
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.url}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
