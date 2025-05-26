import "../CssFolder/FirstCtgry.css";
// import mainLogo from "../../assets/img/mainLogo.png";

function serchShow() {
  console.log("\n\n 들어오나? \n\n");
}

export default function firtstCtgry() {
  return (
    <div className="main_first_ctgry">
      <div className="main_logo">
        <p>
          <a href="http://localhost:3000/">이미지</a>
          {/* <img src={mainLogo} alt="Main Logo" /> */}
        </p>
      </div>
      <div className="main_company">
        <p>기업용</p>
      </div>
      <input type="checkbox" id="switch"></input>
      <label for="switch" className="switch_label">
        <span className="onf_btn"></span>
      </label>
      <div className="serch_class">
        <p onClick={serchShow}>검색</p>
      </div>
      <div className="login_join_class">
        <p onClick="memberJoin">회원가입</p>
      </div>
      <div className="login_class">
        <p>로그인</p>
      </div>
    </div>
  );
}
