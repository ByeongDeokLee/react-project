import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./ViewFame/MainPage";
import "./App.css";
import SubMainHome from "./ViewFame/SubMainHome";
import InquiryPage from "./ViewFame/InquiryPage";
import BoardPage from "./ViewFame/BoardPage";
import FaqPage from "./ViewFame/FaqPage";
import NoticePage from "./ViewFame/NoticePage";
import NoticeDetailPage from "./ViewFame/NoticeDetailPage";
import ReviewPage from "./ViewFame/ReviewPage";
import ServiceDetail from "./ViewFame/ServiceDetail";
import ServiceCatalog from "./ViewFame/ServiceCatalog";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/submainhome" element={<SubMainHome />} />
          {/* <Route path="/inquiry/write" element={<InquiryPage />} /> */}
          <Route path="/inquiry" element={<InquiryPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/notice/:id" element={<NoticeDetailPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/service-detail" element={<ServiceDetail />} />
          <Route path="/services" element={<ServiceCatalog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
