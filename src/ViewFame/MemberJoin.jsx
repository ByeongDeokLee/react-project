import { useState } from "react";
import "../CssFolder/MemberJoin.css";
import useApi from "../js/useApi"; // useApi hook 대신 axios 직접 사용
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function MemberJoin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    password: "",
    email: "",
    name: "",
    birthdate: "",
    phone: "",
  });
  const { loading, request } = useApi();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // 정규식
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 영문, 숫자
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    if (!emailRegex.test(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!passwordRegex.test(form.password)) {
      newErrors.password = "비밀번호는 8자 이상, 영문과 숫자를 포함해야 합니다.";
    }
    if (form.password !== passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (!form.name) newErrors.name = "이름을 입력해주세요.";
    if (!form.birthdate) newErrors.birthdate = "생년월일을 입력해주세요.";
    if (form.phone.replace(/-/g, "").length < 10) {
      newErrors.phone = "올바른 휴대폰 번호를 입력해주세요.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const formattedPhone = value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
      setForm({ ...form, [name]: formattedPhone });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAgree = (e) => {
    setAgree(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      setMessage("약관에 동의해야 회원가입이 가능합니다.");
      return;
    }
    if (!validate()) {
        setMessage("입력 내용을 다시 확인해주세요.");
        return;
    }
    try {
      const payload = {
        ...form,
        phone: form.phone.replace(/-/g, ""), // 하이픈 제거
      };
      await request({
        method: "POST",
        url: "http://localhost:4000/api/register",
        data: payload,
      });
      // setMessage("회원가입 성공!");
      toast.success("회원가입 성공 되었습니다.");
      navigate("/home");
    } catch (err) {
      setMessage(err.response?.data?.error || "회원가입 실패");
    }
  };

  return (
    <div className="member-join-container">
      <h2>회원가입</h2>
      {loading && <LoadingSpinner />}
      <form className="member-join-form" onSubmit={handleSubmit}>
        {/* <input name="username" placeholder="아이디" onChange={handleChange} />
        {errors.username && <div className="error-message">{errors.username}</div>} */}
        <input name="email" placeholder="이메일" onChange={handleChange} />
        {errors.email && <div className="error-message">{errors.email}</div>}
        <input name="password" type="password" placeholder="비밀번호" onChange={handleChange} />
        {errors.password && <div className="error-message">{errors.password}</div>}
        <input
          name="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {errors.passwordConfirm && <div className="error-message">{errors.passwordConfirm}</div>}
        <input name="name" placeholder="이름" onChange={handleChange} />
        {errors.name && <div className="error-message">{errors.name}</div>}
        <input name="birthdate" type="date" placeholder="생년월일" onChange={handleChange} />
        {errors.birthdate && <div className="error-message">{errors.birthdate}</div>}
        <input name="phone" placeholder="휴대폰" value={form.phone} onChange={handleChange} />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
        <div className="terms-section">
          <label>
            <input type="checkbox" checked={agree} onChange={handleAgree} />
            <span>약관에 동의합니다.</span>
          </label>
          <div className="terms-content">
            <img
              src={require("../assets/img/consulting.png")}
              alt="약관 그림"
              style={{ width: 60, verticalAlign: "middle" }}
            />
            <span style={{ marginLeft: 8 }}>
              [필수] 서비스 이용약관 및 개인정보 처리방침에 동의합니다.
              <br />
              (자세한 약관은{" "}
              <a
                href="/home"
                onClick={(e) => {
                  e.preventDefault();
                  alert("약관 전문은 추후 제공됩니다.");
                }}
              >
                여기
              </a>
              를 클릭하세요)
            </span>
          </div>
        </div>
        <button type="submit">회원가입</button>
      </form>
      <div className="member-join-message">{message}</div>
         <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}