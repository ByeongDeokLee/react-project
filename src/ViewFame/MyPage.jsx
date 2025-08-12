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
    name: user?.name || user?.nickname || "",
    birthDate: user?.birthDate || "",
    career: user?.career || "",
    introduction: user?.introduction || "",
    specialty: user?.specialty || "",
    image: user?.image || "",
    sex: user?.sex || "male",
  });

  // 로그인 사용자 식별자
  const [userId, setUserId] = useState(null);

  // 컴포넌트 마운트 시 로컬스토리지에서 사용자 정보 로드
  useEffect(() => {
    const loadUserInfoFromStorage = () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const storedUser = JSON.parse(userData);
          setUserInfo((prev) => ({
            ...prev,
            ...storedUser,
          }));

          // 다양한 형태의 user 객체에서 id 추출 시도
          const derivedId =
            storedUser?.id ||
            storedUser?.user?.id ||
            user?.id ||
            user?.user?.id ||
            null;
          if (derivedId) setUserId(derivedId);
        } catch (e) {
          console.error("사용자 데이터 파싱 오류:", e);
        }
      } else {
        const derivedId = user?.id || user?.user?.id || null;
        if (derivedId) setUserId(derivedId);
      }
    };

    loadUserInfoFromStorage();
  }, [user]);

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
  });
  const [errors, setErrors] = useState({});

  // 초기 경력 로드
  useEffect(() => {
    const fetchCareers = async () => {
      if (!userId) return;
      try {
        const res = await request({
          method: "GET",
          url: `http://localhost:4000/api/users/${userId}/careers`,
        });
        const fetched = (res?.careers || []).map((c) => ({
          id: c.id,
          company: c.company,
          position: c.position,
          startDate: c.start_date,
          endDate: c.end_date,
          description: c.description,
          isPersisted: true,
        }));
        setCareerEntries(fetched);
      } catch (err) {
        console.error(err);
        toast.error("경력 정보를 불러오는데 실패했습니다.");
      }
    };
    fetchCareers();
  }, [userId]);

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

  // 정보 수정 처리
  const handleEdit = (field) => {
    setEditField(field);
    setIsEditing(true);
  };

  // 수정 완료 처리
  const handleSave = (field) => {
    setIsEditing(false);
    setEditField(null);

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

  const addCareerEntry = () => {
    if (
      !newCareerEntry.company ||
      !newCareerEntry.position ||
      !newCareerEntry.startDate
    ) {
      setErrors({ career: "회사명, 직책, 시작일을 입력해주세요." });
      return;
    }

    const entry = {
      ...newCareerEntry,
      id: Date.now(),
      isPersisted: false,
    };

    setCareerEntries((prev) => [...prev, entry]);
    setNewCareerEntry({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setErrors({});
    setShowCareerModal(false);
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
        console.error(err);
        toast.error("경력 삭제에 실패했습니다.");
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

  // 경력 저장(일괄 반영)
  const handleSaveCareers = async () => {
    if (!userId) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    try {
      const payload = careerEntries.map((c) => ({
        company: c.company,
        position: c.position,
        startDate: c.startDate,
        endDate: c.endDate || null,
        description: c.description || null,
      }));
      const res = await request({
        method: "POST",
        url: `http://localhost:4000/api/users/${userId}/careers`,
        data: { careers: payload },
      });
      const saved = (res?.careers || []).map((c) => ({
        id: c.id,
        company: c.company,
        position: c.position,
        startDate: c.start_date,
        endDate: c.end_date,
        description: c.description,
        isPersisted: true,
      }));
      setCareerEntries(saved);
      toast.success("경력이 저장되었습니다.");
    } catch (err) {
      console.error(err);
      toast.error("경력 저장에 실패했습니다.");
    }
  };

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
              >
                + 경력 추가
              </button>
              <button
                type="button"
                className="add-career-btn"
                onClick={handleSaveCareers}
                disabled={loading}
              >
                {loading ? "저장중..." : "경력 저장"}
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
                  </div>
                  <button
                    type="button"
                    className="remove-career-btn"
                    onClick={() => removeCareerEntry(entry.id)}
                    disabled={loading}
                  >
                    삭제
                  </button>
                </div>
              ))
            )}
          </div>
          {errors.career && (
            <div className="error-message">{errors.career}</div>
          )}
        </div>

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
              </div>
              <div className="career-modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCareerModal(false)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="add-btn"
                  onClick={addCareerEntry}
                >
                  추가
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
                <textarea
                  value={userInfo.specialty}
                  onChange={(e) =>
                    handleInputChange("specialty", e.target.value)
                  }
                  className="edit-textarea"
                  placeholder="전문분야를 입력해주세요"
                />
                <div className="edit-buttons">
                  <button
                    onClick={() => handleSave("specialty")}
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
