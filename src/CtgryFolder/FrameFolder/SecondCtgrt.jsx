//css파일
import "../CssFolder/SecondCtgrt.css";

//이미지
import consulting from "../../assets/img/consulting.png";
import design from "../../assets/img/design.png";
import discussion from "../../assets/img/discussion.png";
import homepage from "../../assets/img/homepage.png";
import shopping from "../../assets/img/shopping.png";

const img = [
  { src: homepage, title: "홈페이지 제작" },
  { src: design, title: "디자인 제작" },
  { src: shopping, title: "쇼핑몰 제작" },
  { src: discussion, title: "커뮤티니 제작" },
  { src: consulting, title: "어드민 제작" },
];

export default function SecondCtgrt() {
  return (
    <div className="main_class">
      {img.map((img, index) => {
        return (
          <div key={index}>
            <img src={img.src} alt={img.title} className="second_ctgrt_image" />
            <h3 className="image_title">{img.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
