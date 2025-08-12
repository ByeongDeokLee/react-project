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
    // career: "",
    sex: "",
    introduction: "",
    specialties: [],
  });
  const { loading, request } = useApi();
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // const [male, setMale] = useState(false);
  // const [female, setFemale] = useState(false);
  // const [sex, setSex] = useState({})
  const sexForm = [
    { name: "남성", sex: "male" },
    { name: "여성", sex: "female" },
  ];
  // const [showCareerModal, setShowCareerModal] = useState(false);
  // const [careerEntries, setCareerEntries] = useState([]);
  // const [newCareerEntry, setNewCareerEntry] = useState({
  //   company: "",
  //   position: "",
  //   startDate: "",
  //   endDate: "",
  //   description: ""
  // });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // 정규식
  const passwordRegex =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 전문 분야 옵션
  const specialtyOptions = [
    "웹 개발",
    "모바일 앱 개발",
    "데이터 분석",
    "AI/머신러닝",
    "UI/UX 디자인",
    "프로젝트 관리",
    "마케팅",
    "영업",
    "고객 서비스",
    "기타",
  ];

  const validate = () => {
    const newErrors = {};
    if (!emailRegex.test(form.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "비밀번호는 8자 이상, 영문과 숫자, 특수문자를 포함해야 합니다.";
    }
    if (form.password !== passwordConfirm) {
      newErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (!form.name) newErrors.name = "이름을 입력해주세요.";
    if (!form.birthdate) newErrors.birthdate = "생년월일을 입력해주세요.";
    if (form.phone.replace(/-/g, "").length < 10) {
      newErrors.phone = "올바른 휴대폰 번호를 입력해주세요.";
    }
    // if (careerEntries.length === 0) newErrors.career = "경력을 입력해주세요.";
    if (!form.introduction) newErrors.introduction = "자기소개를 입력해주세요.";
    if (form.specialties.length === 0)
      newErrors.specialties = "전문 분야를 선택해주세요.";
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB 제한
        toast.error("파일 크기는 5MB 이하여야 합니다.");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("이미지 파일만 업로드 가능합니다.");
        return;
      }
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecialtyChange = (specialty) => {
    setForm((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }));
  };

  // const handleCareerEntryChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewCareerEntry(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  // const addCareerEntry = () => {
  //   if (!newCareerEntry.company || !newCareerEntry.position || !newCareerEntry.startDate) {
  //     toast.error("회사명, 직책, 시작일을 입력해주세요.");
  //     return;
  //   }

  //   const entry = {
  //     ...newCareerEntry,
  //     id: Date.now()
  //   };

  //   setCareerEntries(prev => [...prev, entry]);
  //   setNewCareerEntry({
  //     company: "",
  //     position: "",
  //     startDate: "",
  //     endDate: "",
  //     description: ""
  //   });
  //   toast.success("경력이 추가되었습니다.");
  //   setShowCareerModal(false)
  // };

  // const removeCareerEntry = (id) => {
  //   setCareerEntries(prev => prev.filter(entry => entry.id !== id));
  //   toast.success("경력이 삭제되었습니다.");
  // };

  // const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('ko-KR', {
  //     year: 'numeric',
  //     month: 'long'
  //   });
  // };

  const handleAgree = (e) => {
    setAgree(e.target.checked);
  };

  const handleSex = (sex, e) => {
    const { name } = e.target;
    console.log("성별선택 : name", name);
    console.log("성별선택 : value ", sex);
    setForm({ ...form, [name]: sex });
    console.log(form);
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
      // JSON 객체로 데이터 구성
      const payload = {
        email: form.email,
        password: form.password,
        name: form.name,
        birthdate: form.birthdate,
        phone: form.phone.replace(/-/g, ""), // 하이픈 제거
        // career: careerEntries, // 경력 데이터를 배열로 전송
        introduction: form.introduction,
        specialties: form.specialties,
        usertype: "사용자",
        sex: "남자",
      };

      console.log("전송할 데이터:", payload);

      // // 이미지 파일이 있는 경우 FormData 사용, 없으면 JSON 사용
      if (profileImage) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(payload));
        formData.append("profileImage", profileImage);

        await request({
          method: "POST",
          url: "http://localhost:4000/api/register",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // JSON으로 전송
        await request({
          method: "POST",
          url: "http://localhost:4000/api/register",
          data: payload,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      // toast.success("회원가입 성공 되었습니다.");
      // navigate("/home");
    } catch (err) {
      setMessage(err.response?.data?.error || "회원가입 실패");
    }
  };

  return (
    <div className="member-join-container">
      <h2>회원가입</h2>
      {loading && <LoadingSpinner />}
      <form className="member-join-form" onSubmit={handleSubmit}>
        {/* 프로필 이미지 업로드 */}
        <div className="image-upload-section">
          <label className="image-upload-label">
            <div className="image-preview-container">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="프로필 미리보기"
                  className="image-preview"
                />
              ) : (
                <div className="image-placeholder">
                  <span>프로필 이미지</span>
                  <span className="upload-hint">클릭하여 이미지 선택</span>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        <input name="email" placeholder="이메일" onChange={handleChange} />
        {errors.email && <div className="error-message">{errors.email}</div>}

        {/* 비밀번호 입력 필드 */}
        <div className="password-input-container">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호"
            onChange={handleChange}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "숨김" : "확인"}
          </button>
        </div>
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}

        {/* 비밀번호 확인 입력 필드 */}
        <div className="password-input-container">
          <input
            name="passwordConfirm"
            type={showPasswordConfirm ? "text" : "password"}
            placeholder="비밀번호 확인"
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
          >
            {showPasswordConfirm ? "숨김" : "확인"}
          </button>
        </div>
        {errors.passwordConfirm && (
          <div className="error-message">{errors.passwordConfirm}</div>
        )}

        <input name="name" placeholder="이름" onChange={handleChange} />
        {errors.name && <div className="error-message">{errors.name}</div>}

        <input
          name="birthdate"
          type="date"
          placeholder="생년월일"
          onChange={handleChange}
        />
        {errors.birthdate && (
          <div className="error-message">{errors.birthdate}</div>
        )}

        <input
          name="phone"
          placeholder="휴대폰"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}

        {/* 자기소개서 */}
        <div className="introduction-section">
          <label>자기소개</label>
          <textarea
            name="introduction"
            placeholder="자기소개를 입력해주세요"
            onChange={handleChange}
            rows="5"
          />
          {errors.introduction && (
            <div className="error-message">{errors.introduction}</div>
          )}
        </div>

        {/* 전문 분야 선택 */}
        <div className="specialties-section">
          <label>전문 분야 (복수 선택 가능)</label>
          <div className="specialties-grid">
            {specialtyOptions.map((specialty) => (
              <label key={specialty} className="specialty-checkbox">
                <input
                  type="checkbox"
                  checked={form.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                />
                <span>{specialty}</span>
              </label>
            ))}
          </div>
          {errors.specialties && (
            <div className="error-message">{errors.specialties}</div>
          )}
        </div>

        {/* 성별 선택 */}
        <div className="specialties-section">
          <label>성별 선택</label>
          {sexForm.map((data) => (
            <label key={data} className="specialty-checkbox">
              <input
                name="sex"
                type="checkbox"
                checked={form.sex === data.sex}
                onChange={(e) => handleSex(data.sex, e)}
              />
              {/* <input name="sex" type="checkbox" checked={data.type} onChange={(e) => handleSex(data.sex, e)} /> */}
              <span>{data.name}</span>
            </label>
          ))}
        </div>

        {/* 약관 동의 */}
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
