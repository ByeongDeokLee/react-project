import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

//프레임
import MainHome from "../ViewFame/FrameFolder/MainHome";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Home" element={<MainHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
