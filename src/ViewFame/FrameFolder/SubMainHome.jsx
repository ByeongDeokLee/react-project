import "../CssFolder/SubMainHome.css";

//이미지
import dog1 from "../../assets/img/dog1.jpg";
import dog2 from "../../assets/img/dog2.jpg";
import dog3 from "../../assets/img/dog3.jpg";
import dog4 from "../../assets/img/dog4.jpg";
import favorite from "../../assets/img/favorite.png";
import produimg from "../../assets/img/produimg.png";

//라이브러리

const HomePageImg = [
  {
    src: dog1,
    title: "기업 제작용 페이지",
    great: 4.1,
    comment: 20,
    price: 50000,
    producer: "핑크덕후",
  },
  {
    src: dog2,
    title: "개쩌는 홈페이지",
    great: 3.9,
    comment: 5,
    price: 500,
    producer: "길동이",
  },
  {
    src: dog3,
    title: "요즘 많이 사용하는 홈페이지",
    great: 3.0,
    comment: 1,
    price: 5000,
    producer: "오리쿵덕",
  },
  {
    src: dog4,
    title: "간편한 홈페이지 제작",
    great: 4.5,
    comment: 100,
    price: 25000,
    producer: "피캬츄",
  },
];

export default function SubMainHome() {
  return (
    <div className="main_sub_class">
      <div className="home_page_space">
        <h1>홈페이지을 원하시면 여기 보세요.</h1>
        {HomePageImg.map((img, index) => {
          return (
            <div className="home_page_card" key={index}>
              <img src={img.src} alt={img.title} className="home_page_image" />
              <span className="home_page_title">{img.title}</span>
              <div className="home_page_great">
                <img src={favorite} alt="좋아요" className="great_img"></img>
                <span>{img.great.toFixed(1)}</span>
                <span>{"(" + img.comment + ")"}</span>
              </div>
              <div className="home_page_price">
                {img.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  "원 ~"}
              </div>
              <div className="home_page_producer">
                <img src={produimg} alt="produimg"></img>
                <span>{img.producer}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shop_mall_space">
        <h1>쇼핑몰을 원하시면 여기 보세요.</h1>
        {HomePageImg.map((img, index) => {
          return (
            <div className="home_page_card" key={index}>
              <img src={img.src} alt={img.title} className="home_page_image" />
              <span className="home_page_title">{img.title}</span>
              <div className="home_page_great">
                <img src={favorite} alt="좋아요" className="great_img"></img>
                <span>{img.great.toFixed(1)}</span>
                <span>{"(" + img.comment + ")"}</span>
              </div>
              <div className="home_page_price">
                {img.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  "원 ~"}
              </div>
              <div className="home_page_producer">
                <img src={produimg} alt="produimg"></img>
                <span>{img.producer}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="community_space">
        <h1>커뮤니티를 원하시면 여기 보세요.</h1>
        {HomePageImg.map((img, index) => {
          return (
            <div className="home_page_card" key={index}>
              <img src={img.src} alt={img.title} className="home_page_image" />
              <span className="home_page_title">{img.title}</span>
              <div className="home_page_great">
                <img src={favorite} alt="좋아요" className="great_img"></img>
                <span>{img.great.toFixed(1)}</span>
                <span>{"(" + img.comment + ")"}</span>
              </div>
              <div className="home_page_price">
                {img.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  "원 ~"}
              </div>
              <div className="home_page_producer">
                <img src={produimg} alt="produimg"></img>
                <span>{img.producer}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
