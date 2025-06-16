import { BrowserRouter, Route, Routes } from "react-router-dom";

//프레임
import MainHome from "../ViewFame/MainHome";
import MemberJoin from "../ViewFame/MemberJoin";

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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<MainHome />} />
        <Route path="/MemberJoin" element={<MemberJoin />} />
        <Route path="/LoginPopup" element={<LoginPopup />} />
        <Route path="/oauth/callback" element={<Callback />} />
        <Route path="/service-selection" element={<ServiceSelection />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/inquiry" element={<InquiryPage />} />
        <Route path="/inquiry/write" element={<InquiryWritePage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/notice" element={<NoticePage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
