import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

//프레임
import MainHome from "../ViewFame/FrameFolder/MainHome";
import MemberJoin from "../ViewFame/FrameFolder/MemberJoin";

//팝업
import LoginPopup from "../PopupFame/PopupFameFolder/LoginPopup";
import Callback from "../PopupFame/CallBackFolder/CallBack";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<MainHome />} />
        <Route path="/MemberJoin" element={<MemberJoin />} />
        <Route path="/LoginPopup" element={<LoginPopup />} />
        <Route path="/oauth/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
