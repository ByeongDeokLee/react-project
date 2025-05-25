// eslint-disable-next-line
//프레임
import FirstCtgry from "../../CtgryFolder/FrameFolder/FirstCtgry";
import SecondCtgrt from "../../CtgryFolder/FrameFolder/SecondCtgrt";
import SubMainHome from "./SubMainHome";

//css 파일
import "../CssFolder/MainHome.css";

//이미지 파일
import one from "../../assets/img/one.png";
import two from "../../assets/img/two.png";
import three from "../../assets/img/three.png";
import four from "../../assets/img/four.png";
import five from "../../assets/img/five.png";
import six from "../../assets/img/six.png";
import seven from "../../assets/img/seven.png";
import eight from "../../assets/img/eight.png";
// import Image from "../../assets/img";

//라이브러리
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function MainHome() {
  const images = [one, two, three, four, five, six, seven, eight];
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
      <div class="main_img">
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
                style={{ width: "100%", borderRadius: "12px" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div class="serach_class">
        <input
          type="text"
          class="inputField"
          placeholder="어떤 서비스가 필요하세요?"
          value={serachID}
          onChange={serachValue}
        />
        <button class="input_but" onClick={serachSub}>
          검색
        </button>
      </div>
      <div class="main_second_ctgrt">
        <SecondCtgrt />
      </div>
      <div class="sub_main_home">
        <SubMainHome />
      </div>
    </div>
  );
}
