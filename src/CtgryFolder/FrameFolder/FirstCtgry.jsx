import "../CssFolder/FirstCtgry.css";

function serchShow() {
  console.log("\n\n 들어오나? \n\n");
}

export default function firtstCtgry() {
  return (
    <div className="fristCtgry">
      <div class="main_class">
        <div class="main_logo">
          <p>
            <a href="http://localhost:3000/">메인 이미지 </a>
          </p>
        </div>
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
