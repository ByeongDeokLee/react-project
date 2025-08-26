import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CssFolder/MyPage.css";

import male from "../assets/img/male.png";
import female from "../assets/img/female.png";
import useApi from "../js/useApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyPage = ({ user }) => {
  const navigate = useNavigate();
  const { loading, request } = useApi();

  // 사용자 정보 상태 관리
  const [userInfo, setUserInfo] = useState({
    name: user?.name || user?.nickname || localStorage.getItem("name"),
    birthDate: user?.birthDate || localStorage.getItem("birthdate"),
    career: user?.career || "",
    introduction: user?.introduction || localStorage.getItem("introduction"),
    specialty: user?.specialty || localStorage.getItem("specialty"),
    image: user?.image || "",
    sex: user?.sex || localStorage.getItem("sex"),
  });

  // console.log(userInfo);

  // 로그인 사용자 식별자
  const [userId, setUserId] = useState(null);
  const [specialties, setSpecialties] = useState([]);

  // 수정 모드 상태
  const [isEditing, setIsEditing] = useState(false);
  const [editField, setEditField] = useState(null);

  // 경력 관련 상태
  const [careerEntries, setCareerEntries] = useState([]);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [newCareerEntry, setNewCareerEntry] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
    skills: [],
  });
  const [errors, setErrors] = useState({});

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

  // console.log("전문분야", specialties);

  // 컴포넌트 마운트 시 로컬스토리지에서 사용자 정보 로드
  useEffect(() => {
    const loadUserInfoFromStorage = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const storedUser = JSON.parse(userData);
          setUserInfo(() => ({
            name: storedUser.user.name,
            birthDate: storedUser.user.birthdate,
            career: storedUser.user.career,
            introduction: storedUser.user.introduction,
            specialty: storedUser.user.specialty.split(","),
            image: storedUser.user.image || "",
            sex: storedUser.user.sex,
          }));

          // // 다양한 형태의 user 객체에서 id 추출 시도
          // const derivedId =
          //   storedUser?.id ||
          //   storedUser?.user?.id ||
          //   user?.id ||
          //   user?.user?.id ||
          //   null;
          // console.log("derivedId,", derivedId);
          // if (derivedId)

          setUserId(storedUser.id);

          // setSpecialties(() => {});
        } catch (e) {
          console.error("사용자 데이터 파싱 오류:", e);
        }
      } else {
        const derivedId = user?.id || user?.user?.id || null;
        if (derivedId) setUserId(derivedId);
      }
    };

    const fetchCareers = async () => {
      console.log("여기는 들어옴?", userId);
      if (!userId) return;
      try {
        const res = await request({
          method: "GET",
          url: `http://localhost:4000/api/users/${userId}/careers`,
        });
        const fetched = (res?.careers || []).map((c) => ({
          id: c.id,
          company: c.company_name,
          position: c.position,
          startDate: c.start_date,
          endDate: c.end_date,
          description: c.description,
          skills: c.skills || [],
          isPersisted: true,
        }));

        console.log("여기 언제탐?", fetched);
        // setCareerEntries(fetched);

        setUserInfo((prev) => ({
          ...prev,
          career: fetched,
        }));

        // console.log(setCareerEntries);
      } catch (err) {
        console.error("경력 조회 실패:", err);
        if (
          err.message?.includes("career") ||
          err.message?.includes("does not exist")
        ) {
          toast.error(
            "경력 테이블이 생성되지 않았습니다. 관리자에게 문의하세요."
          );
        } else {
          toast.error("경력 정보를 불러오는데 실패했습니다.");
        }
      }
    };

    loadUserInfoFromStorage();
    fetchCareers();
  }, [user]);

  console.log("확인 필요", userInfo.career);

  // 이미지 업로드 처리
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo((prev) => ({
          ...prev,
          image: e.target.result,
        }));

        // 로컬스토리지에서 기존 사용자 데이터 가져오기
        const userData = localStorage.getItem("user");
        let currentUser = {};

        if (userData) {
          try {
            currentUser = JSON.parse(userData);
          } catch (error) {
            console.error("사용자 데이터 파싱 오류:", error);
          }
        }

        // 이미지 업데이트
        currentUser.image = e.target.result;

        // 업데이트된 사용자 데이터를 로컬스토리지에 저장
        localStorage.setItem("user", JSON.stringify(currentUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecialtyChange = (specialty) => {
    console.log("specialty === ", specialty);
    setSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  // 정보 수정 처리
  const handleEdit = (field) => {
    setEditField(field);
    setIsEditing(true);
  };

  // 수정 완료 처리
  const handleSave = async (field) => {
    if (!userId) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      // 서버에 업데이트 요청
      const updateData = { [field]: userInfo[field] };

      const res = await request({
        method: "PUT",
        url: `http://localhost:4000/api/users/${userId}`,
        data: updateData,
      });

      // 로컬스토리지에서 기존 사용자 데이터 가져오기
      const userData = localStorage.getItem("user");
      let currentUser = {};

      if (userData) {
        try {
          currentUser = JSON.parse(userData);
        } catch (e) {
          console.error("사용자 데이터 파싱 오류:", e);
        }
      }

      // 수정된 필드 업데이트
      currentUser[field] = userInfo[field];

      // 업데이트된 사용자 데이터를 로컬스토리지에 저장
      localStorage.setItem("user", JSON.stringify(currentUser));

      setIsEditing(false);
      setEditField(null);
      toast.success("정보가 업데이트되었습니다.");
      console.log("업데이트된 사용자:", res.user);
    } catch (err) {
      console.error("사용자 정보 업데이트 실패:", err);
      toast.error("정보 업데이트에 실패했습니다.");
    }
  };

  // 입력값 변경 처리
  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCareerEntryChange = (e) => {
    const { name, value } = e.target;
    setNewCareerEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addCareerEntry = async () => {
    if (
      !newCareerEntry.company ||
      !newCareerEntry.position ||
      !newCareerEntry.startDate
    ) {
      setErrors({ career: "회사명, 직책, 시작일을 입력해주세요." });
      return;
    }

    if (!userId) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      // 경력 추가 API 호출
      const res = await request({
        method: "POST",
        url: `http://localhost:4000/api/users/${userId}/careers`,
        data: { career: newCareerEntry },
      });

      const addedCareer = {
        id: res.career.id,
        company: res.career.company_name,
        position: res.career.position,
        startDate: res.career.start_date,
        endDate: res.career.end_date,
        description: res.career.description,
        skills: res.career.skills || [],
        isPersisted: true,
      };

      setCareerEntries((prev) => [...prev, addedCareer]);
      setNewCareerEntry({
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
        skills: [],
      });
      setErrors({});
      setShowCareerModal(false);
      toast.success("경력이 추가되었습니다.");
    } catch (err) {
      console.error("경력 추가 실패:", err);
      if (
        err.message?.includes("user_careers") ||
        err.message?.includes("does not exist")
      ) {
        toast.error(
          "경력 테이블이 생성되지 않았습니다. 관리자에게 문의하세요."
        );
      } else {
        toast.error("경력 추가에 실패했습니다.");
      }
    }
  };

  const removeCareerEntry = async (id) => {
    const target = careerEntries.find((e) => e.id === id);
    if (!target) return;

    // 서버에 이미 저장된 항목이면 즉시 삭제 API 호출
    if (target.isPersisted && userId) {
      try {
        await request({
          method: "DELETE",
          url: `http://localhost:4000/api/users/${userId}/careers/${id}`,
        });
        toast.success("경력이 삭제되었습니다.");
      } catch (err) {
        console.error("경력 삭제 실패:", err);
        if (
          err.message?.includes("career") ||
          err.message?.includes("does not exist")
        ) {
          toast.error(
            "경력 테이블이 생성되지 않았습니다. 관리자에게 문의하세요."
          );
        } else {
          toast.error("경력 삭제에 실패했습니다.");
        }
        return; // 실패 시 로컬 상태 변경하지 않음
      }
    }

    setCareerEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
    });
  };

  // 경력 저장 기능 제거 (더 이상 필요 없음)
  // 경력은 추가할 때마다 자동으로 저장됨

  // 수정 취소 처리
  const handleCancel = () => {
    setIsEditing(false);
    setEditField(null);
    // 원래 값으로 복원
    setUserInfo({
      name: user?.name || user?.nickname || "",
      birthDate: user?.birthDate || "",
      career: user?.career || "",
      introduction: user?.introduction || "",
      specialty: user?.specialty || "",
      image: user?.image || "",
      sex: user?.sex || "male",
    });
  };

  // 중복 선언 제거됨

  return (
    <div className="mypage-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="mypage-title">마이페이지</div>

      <div className="mypage-info">
        <div className="mypage-label">사용자 정보</div>

        {/* 프로필 사진 */}
        <div className="profile-image-section">
          <img
            src={userInfo.image || (userInfo.sex === "male" ? male : female)}
            alt={userInfo.name}
            className="profile-image"
          />
          <div className="image-upload-section">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <label htmlFor="image-upload" className="upload-btn">
              사진 변경
            </label>
          </div>
        </div>

        {/* 이름 */}
        <div className="info-row">
          <label className="info-label">이름:</label>
          <div className="info-content">{userInfo.name || "정보 없음"}</div>
        </div>

        {/* 생년월일 */}
        <div className="info-row">
          <label className="info-label">생년월일:</label>
          <div className="info-content">
            {userInfo.birthdate || "정보 없음"}
          </div>
        </div>

        {/* 경력 */}
        <div className="career-section">
          <div className="career-header">
            <label>경력</label>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className="add-career-btn"
                onClick={() => setShowCareerModal(true)}
                disabled={loading}
              >
                + 경력 추가
              </button>
            </div>
          </div>
          console.log("경력 확이느" ,userInfo.career )
          <div className="career-list">
            {userInfo.career.length === 0 ? (
              <div className="no-career">등록된 경력이 없습니다.</div>
            ) : (
              userInfo.career.map((entry) => (
                <div key={entry.id} className="career-item">
                  <div className="career-info">
                    <div className="career-company">{entry.company}</div>
                    <div className="career-position">{entry.position}</div>
                    <div className="career-period">
                      {formatDate(entry.startDate)} ~{" "}
                      {entry.endDate ? formatDate(entry.endDate) : "현재"}
                    </div>
                    {entry.description && (
                      <div className="career-description">
                        {entry.description}
                      </div>
                    )}
                    {entry.skills && entry.skills.length > 0 && (
                      <div className="career-skills">
                        <strong>기술:</strong> {entry.skills.join(", ")}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="remove-career-btn"
                    onClick={() => removeCareerEntry(entry.id)}
                    disabled={loading}
                  >
                    {loading ? "삭제중..." : "삭제"}
                  </button>
                </div>
              ))
            )}
          </div>
          {errors.career && (
            <div className="error-message">{errors.career}</div>
          )}
        </div>
        {/* <div className="career-section">
          <div className="career-header">
            <label>경력</label>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                type="button"
                className="add-career-btn"
                onClick={() => setShowCareerModal(true)}
                disabled={loading}
              >
                + 경력 추가
              </button>
            </div>
          </div>

          <div className="career-list">
            {careerEntries.length === 0 ? (
              <div className="no-career">등록된 경력이 없습니다.</div>
            ) : (
              careerEntries.map((entry) => (
                <div key={entry.id} className="career-item">
                  <div className="career-info">
                    <div className="career-company">{entry.company}</div>
                    <div className="career-position">{entry.position}</div>
                    <div className="career-period">
                      {formatDate(entry.startDate)} ~{" "}
                      {entry.endDate ? formatDate(entry.endDate) : "현재"}
                    </div>
                    {entry.description && (
                      <div className="career-description">
                        {entry.description}
                      </div>
                    )}
                    {entry.skills && entry.skills.length > 0 && (
                      <div className="career-skills">
                        <strong>기술:</strong> {entry.skills.join(", ")}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="remove-career-btn"
                    onClick={() => removeCareerEntry(entry.id)}
                    disabled={loading}
                  >
                    {loading ? "삭제중..." : "삭제"}
                  </button>
                </div>
              ))
            )}
          </div>
          {errors.career && (
            <div className="error-message">{errors.career}</div>
          )}
        </div> */}

        {/* 경력 추가 모달 */}
        {showCareerModal && (
          <div className="career-modal-overlay">
            <div className="career-modal">
              <div className="career-modal-header">
                <h3>경력 추가</h3>
                <button
                  type="button"
                  className="close-modal-btn"
                  onClick={() => setShowCareerModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="career-modal-content">
                <div className="career-input-group">
                  <label>회사명 *</label>
                  <input
                    type="text"
                    name="company"
                    value={newCareerEntry.company}
                    onChange={handleCareerEntryChange}
                    placeholder="회사명을 입력하세요"
                  />
                </div>
                <div className="career-input-group">
                  <label>직책 *</label>
                  <input
                    type="text"
                    name="position"
                    value={newCareerEntry.position}
                    onChange={handleCareerEntryChange}
                    placeholder="직책을 입력하세요"
                  />
                </div>
                <div className="career-date-group">
                  <div className="career-input-group">
                    <label>시작일 *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={newCareerEntry.startDate}
                      onChange={handleCareerEntryChange}
                    />
                  </div>
                  <div className="career-input-group">
                    <label>종료일</label>
                    <input
                      type="date"
                      name="endDate"
                      value={newCareerEntry.endDate}
                      onChange={handleCareerEntryChange}
                    />
                  </div>
                </div>
                <div className="career-input-group">
                  <label>업무 설명</label>
                  <textarea
                    name="description"
                    value={newCareerEntry.description}
                    onChange={handleCareerEntryChange}
                    placeholder="담당 업무나 성과를 입력하세요"
                    rows="3"
                  />
                </div>
                <div className="career-input-group">
                  <label>관련 기술 (쉼표로 구분)</label>
                  <input
                    type="text"
                    name="skills"
                    value={newCareerEntry.skills.join(", ")}
                    onChange={(e) => {
                      const skillsArray = e.target.value
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter((skill) => skill.length > 0);
                      setNewCareerEntry((prev) => ({
                        ...prev,
                        skills: skillsArray,
                      }));
                    }}
                    placeholder="JavaScript, React, Node.js"
                  />
                </div>
              </div>
              <div className="career-modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCareerModal(false)}
                  disabled={loading}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="add-btn"
                  onClick={addCareerEntry}
                  disabled={loading}
                >
                  {loading ? "추가중..." : "추가"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 자기소개 */}
        <div className="info-row">
          <label className="info-label">자기소개:</label>
          <div className="info-content">
            {isEditing && editField === "introduction" ? (
              <div className="edit-section">
                <textarea
                  value={userInfo.introduction}
                  onChange={(e) =>
                    handleInputChange("introduction", e.target.value)
                  }
                  className="edit-textarea"
                  placeholder="자기소개를 입력해주세요"
                />
                <div className="edit-buttons">
                  <button
                    onClick={() => handleSave("introduction")}
                    className="save-btn"
                  >
                    저장
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="content-with-edit">
                <span>{userInfo.introduction || "정보 없음"}</span>
                <button
                  onClick={() => handleEdit("introduction")}
                  className="edit-btn"
                >
                  수정
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 전문분야 */}
        <div className="info-row">
          <label className="info-label">전문분야:</label>
          <div className="info-content">
            {isEditing && editField === "specialty" ? (
              <div className="edit-section">
                <div className="specialties-grid">
                  {specialtyOptions.map((specialty) => (
                    <label key={specialty} className="specialty-checkbox">
                      <input
                        type="checkbox"
                        checked={specialties.includes(specialty)}
                        onChange={() => handleSpecialtyChange(specialty)}
                      />
                      <span>{specialty}</span>
                    </label>
                  ))}
                </div>
                <div className="edit-buttons">
                  <button
                    onClick={() => {
                      handleInputChange("specialty", specialties.join(", "));
                      handleSave("specialty");
                    }}
                    className="save-btn"
                  >
                    저장
                  </button>
                  <button onClick={handleCancel} className="cancel-btn">
                    취소
                  </button>
                </div>
              </div>
            ) : (
              <div className="content-with-edit">
                <span>{userInfo.specialty || "정보 없음"}</span>
                <button
                  onClick={() => handleEdit("specialty")}
                  className="edit-btn"
                >
                  수정
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mypage-btn-group">
        <button className="mypage-btn">비밀번호 변경</button>
        <button className="mypage-btn">이름 변경</button>
        <button className="mypage-btn">휴대폰번호 변경</button>
      </div>

      <button className="mypage-main-btn" onClick={() => navigate("/")}>
        메인으로
      </button>
    </div>
  );
};

export default MyPage;
