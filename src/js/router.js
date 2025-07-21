import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//프레임
import MainHome from "../ViewFame/MainHome";
import MemberJoin from "../ViewFame/MemberJoin";
import FirstCtgry from "../CtgryFolder/FirstCtgry";
import SecondCtgrt from "../CtgryFolder/SecondCtgrt";
import CompanyIntro from "../ViewFame/CompanyIntro";
import SubMainHome from "../ViewFame/SubMainHome";
import NoticeDetailPage from "../ViewFame/NoticeDetailPage";

//팝업
import LoginPopup from "../PopupFame/PopupFameFolder/LoginPopup";
import Callback from "../PopupFame/CallBackFolder/CallBack";

//서비스 선택 및 결제 페이지
import ServiceSelection from "../ViewFame/ServiceSelection";
import Payment from "../ViewFame/Payment";
import PaymentSuccess from "../ViewFame/PaymentSuccess";
import InquiryPage from "../ViewFame/InquiryPage";
import InquiryWritePage from "../ViewFame/InquiryWritePage";
import BoardPage from "../ViewFame/BoardPage";
import FaqPage from "../ViewFame/FaqPage";
import NoticePage from "../ViewFame/NoticePage";
import ReviewPage from "../ViewFame/ReviewPage";
import PostDetailPage from "../ViewFame/PostDetailPage";
import WritePage from "../ViewFame/WritePage";
import ReviewWritePage from "../ViewFame/ReviewWritePage";
import MyPage from "../ViewFame/MyPage";
import ServiceDetail from "../ViewFame/ServiceDetail";
import TeamMemberDetail from "../ViewFame/TeamMemberDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/first" element={<FirstCtgry />} />
        <Route path="/second" element={<SecondCtgrt />} />
        <Route path="/company-intro" element={<CompanyIntro />} />
        <Route path="/service-selection" element={<ServiceSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/sub" element={<SubMainHome />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/board/:postId" element={<PostDetailPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/notice/:postId" element={<NoticeDetailPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/inquiry/write" element={<InquiryWritePage />} />
        <Route path="/write" element={<WritePage />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/login" element={<LoginPopup />} />
        <Route path="/login/callback" element={<Callback />} />
        <Route path="/join" element={<MemberJoin />} />
        <Route path="/review/write" element={<ReviewWritePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/service-detail" element={<ServiceDetail />} />
        <Route path="/team-member/:memberId" element={<TeamMemberDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
