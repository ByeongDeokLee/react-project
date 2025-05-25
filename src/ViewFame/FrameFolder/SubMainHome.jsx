import "../CssFolder/SubMainHome.css";

//이미지
import dog1 from "../../assets/img/dog1.jpg";
import dog2 from "../../assets/img/dog2.jpg";
import dog3 from "../../assets/img/dog3.jpg";
import dog4 from "../../assets/img/dog4.jpg";
import dog5 from "../../assets/img/dog5.jpg";

//라이브러리

const HomePageImg = [dog1, dog2, dog3, dog4, dog5];

export default function SubMainHome() {
  return (
    <div class="main_sub_class">
      <div class="home_page_space">
        <h1>홈페이지을 원하시면 여기 보세요.</h1>
        {HomePageImg.map((img, index) => {
          return (
            <div class="home_page_image" key={index}>
              <img
                src={img}
                alt={`슬라이드 ${index + 1}`}
                class="home_page_image"
                // style={{ width: "100%", borderRadius: "12px" }}
              />
            </div>
          );
        })}
      </div>
      <div class="shop_mall_space">
        <h1>쇼핑몰을 원하시면 여기 보세요.</h1>
      </div>

      <div class="community_space">
        <h1>커뮤니티를 원하시면 여기 보세요.</h1>
      </div>
    </div>
  );
}
