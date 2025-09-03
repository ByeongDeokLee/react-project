"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useApi from "../js/useApi";
import styles from "../CssFolder/SubMainHome.module.css";

const categories = ["디자인", "개발", "영상", "컨텐츠", "번역"];

const sortOptions = [
  { value: "latest", label: "최신 등록순" },
  { value: "price_asc", label: "가격 낮은순" },
  { value: "price_desc", label: "가격 높은순" },
];

export default function ServiceCatalog() {
  const { request, loading } = useApi();
  const [services, setServices] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(
    () => ({
      keyword: searchParams.get("keyword") || "",
      category: searchParams.get("category") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      sort: searchParams.get("sort") || "latest",
    }),
    [searchParams]
  );

  useEffect(() => {
    const fetch = async () => {
      const params = new URLSearchParams();
      if (state.keyword) params.set("keyword", state.keyword);
      if (state.category) params.set("category", state.category);
      if (state.minPrice) params.set("minPrice", state.minPrice);
      if (state.maxPrice) params.set("maxPrice", state.maxPrice);
      if (state.sort) params.set("sort", state.sort);

      const data = await request({
        method: "GET",
        url: `http://localhost:4000/api/serviceList?${params.toString()}`,
      });
      setServices(data || []);
    };
    fetch();
  }, [
    state.keyword,
    state.category,
    state.minPrice,
    state.maxPrice,
    state.sort,
  ]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === undefined || value === null || value === "") next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="container">
      <div className="stack">
        <h1>서비스 탐색</h1>
        <div className="cluster">
          <input
            type="text"
            placeholder="키워드 검색"
            value={state.keyword}
            onChange={(e) => updateParam("keyword", e.target.value)}
            className="border p-4 rounded"
          />
          <select
            value={state.category}
            onChange={(e) => updateParam("category", e.target.value)}
            className="border p-4 rounded"
          >
            <option value="">카테고리 전체</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="최소가격"
            value={state.minPrice}
            onChange={(e) => updateParam("minPrice", e.target.value)}
            className="border p-4 rounded"
            min={0}
          />
          <input
            type="number"
            placeholder="최대가격"
            value={state.maxPrice}
            onChange={(e) => updateParam("maxPrice", e.target.value)}
            className="border p-4 rounded"
            min={0}
          />
          <select
            value={state.sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="border p-4 rounded"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {loading && <div>불러오는 중...</div>}

        <div className="cluster" style={{ alignItems: "stretch" }}>
          {services.map((service) => (
            <div
              key={service.id}
              className="border rounded p-4"
              style={{ width: 320 }}
            >
              <div className="stack">
                <div>
                  {service.images && service.images[0] ? (
                    <img
                      src={service.images[0].image_url}
                      alt={service.title}
                      style={{ width: "100%", height: 160, objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="bg-surface"
                      style={{ width: "100%", height: 160 }}
                    />
                  )}
                </div>
                <h3 style={{ marginTop: 0 }}>{service.title}</h3>
                <div className="text-muted">{service.service_type}</div>
                <div style={{ fontWeight: 700 }}>
                  {Number(service.price || 0).toLocaleString()}원
                </div>
                <div className="text-muted">
                  {service.user?.name || service.user?.email || "작성자"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && !loading && (
          <div className="text-muted">
            결과가 없습니다. 조건을 변경해보세요.
          </div>
        )}
      </div>
    </div>
  );
}
