import { BrowserRouter, Route, Routes } from "react-router-dom";

//프레임
import MainHome from "../ViewFame/FrameFolder/MainHome";
import MemberJoin from "../ViewFame/FrameFolder/MemberJoin";

//팝업
import LoginPopup from "../PopupFame/PopupFameFolder/LoginPopup";
import Callback from "../PopupFame/CallBackFolder/CallBack";

//서비스 선택 및 결제 페이지
import ServiceSelection from "../ViewFame/FrameFolder/ServiceSelection";
import Payment from "../ViewFame/FrameFolder/Payment";
import PaymentSuccess from "../ViewFame/FrameFolder/PaymentSuccess";

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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
