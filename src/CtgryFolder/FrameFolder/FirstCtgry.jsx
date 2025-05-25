import "../CssFolder/FirstCtgry.css";
// import mainLogo from "../../assets/img/mainLogo.png";

function serchShow() {
  console.log("\n\n 들어오나? \n\n");
}

export default function firtstCtgry() {
  return (
    <div className="fristCtgry">
      <div class="main_class">
        <div class="main_logo">
          <p>
            <a href="http://localhost:3000/">이미지</a>
            {/* <img src={mainLogo} alt="Main Logo" /> */}
          </p>
        </div>
        <div class="main_company">
          <p>기업용</p>
        </div>
        <input type="checkbox" id="switch"></input>
        <label for="switch" class="switch_label">
          <span class="onf_btn"></span>
        </label>
        <div class="serch_class">
          <p onClick={serchShow}>검색</p>
        </div>
        <div class="login_join_class">
          <p onClick="memberJoin">회원가입</p>
        </div>
        <div class="login_class">
          <p>로그인</p>
        </div>
      </div>
    </div>
  );
}
