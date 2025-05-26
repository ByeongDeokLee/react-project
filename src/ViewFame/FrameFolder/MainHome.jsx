// eslint-disable-next-line
//프레임
import FirstCtgry from "../../CtgryFolder/FrameFolder/FirstCtgry";
import SecondCtgrt from "../../CtgryFolder/FrameFolder/SecondCtgrt";
import SubMainHome from "./SubMainHome";

//css 파일
import "../CssFolder/MainHome.css";

//이미지 파일

import img1 from "../../assets/img/img1.jpg";
import img2 from "../../assets/img/img2.jpg";
import img3 from "../../assets/img/img3.jpg";
import img4 from "../../assets/img/img4.jpg";

//라이브러리
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MainHome() {
  const images = [img1, img2, img3, img4];
  // const images = [one, two, three, four, five, six, seven, eight];
  const [serachID, setSerachID] = useState("");

  const serachValue = (event) => {
    setSerachID(event.target.value);
  };

  const serachSub = () => {
    alert(serachID);
  };

  return (
    <div>
      <FirstCtgry />
      <div className="main_img">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`슬라이드 ${index + 1}`}
                style={{
                  width: "-webkit-fill-available",
                  borderRadius: "12px",
                }}
                // style={{ height: "100%", borderRadius: "12px" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="serach_class">
        <input
          type="text"
          className="inputField"
          placeholder="어떤 서비스가 필요하세요?"
          value={serachID}
          onChange={serachValue}
        />
        <button className="input_but" onClick={serachSub}>
          검색
        </button>
      </div>
      <div className="main_second_ctgrt">
        <SecondCtgrt />
      </div>
      <div className="sub_main_home">
        <SubMainHome />
      </div>
    </div>
  );
}
