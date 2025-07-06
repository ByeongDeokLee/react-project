import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../CssFolder/NoticeDetailPage.module.css";

const NoticeDetailPage = () => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const noticeData = location.state?.noticeData || [];

  console.log(noticeData.contentdtl);
  console.log(noticeData);
  // const [loading, setLoading] = useState(true);

  //   useEffect(() => {
  //     // URL 파라미터로 전달된 공지사항 데이터 가져오기
  //     const noticeData = location.state?.notice;
  //     if (noticeData) {
  //       setNotice(noticeData);
  //     } else {
  //       // 실제 API 호출이 필요한 경우 여기에 구현
  //       // 임시로 더미 데이터 사용
  //       setNotice({
  //         id: id,
  //         title: "2024년 3월 시스템 점검 안내",
  //         content: `안녕하세요.

  // 더 나은 서비스를 제공하기 위해 시스템 점검을 실시합니다.

  // ■ 점검 일시: 2024년 3월 20일 (수) 오전 2시 ~ 오전 6시
  // ■ 점검 내용: 서버 업그레이드 및 보안 패치 적용
  // ■ 영향 범위: 웹사이트 접속 일시 중단

  // 점검 시간 동안에는 서비스 이용이 제한될 수 있습니다.
  // 불편을 끼쳐 대단히 죄송합니다.

  // 문의사항이 있으시면 고객센터로 연락 주시기 바랍니다.

  // 감사합니다.`,
  //         date: "2024.03.15",
  //         isImportant: true,
  //         author: "관리자",
  //         views: 1250,
  //       });
  //     }
  //     setLoading(false);
  //   }, [id, location.state]);

  const handleBack = () => {
    navigate(-1);
  };

  // if (loading) {
  //   return (
  //     <div className={styles.loadingContainer}>
  //       <div className={styles.loadingSpinner}></div>
  //       <p>로딩 중...</p>
  //     </div>
  //   );
  // }

  if (!noticeData) {
    return (
      <div className={styles.errorContainer}>
        <h2>공지사항을 찾을 수 없습니다.</h2>
        <button onClick={handleBack} className={styles.backButton}>
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.noticeDetailPage}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backButton}>
          ← 목록으로
        </button>
        <h1>공지사항</h1>
      </div>

      <div className={styles.noticeContainer}>
        <div className={styles.noticeHeader}>
          <div className={styles.titleSection}>
            {noticeData.isImportant && (
              <span className={styles.importantBadge}>중요</span>
            )}
            <h2 className={styles.title}>{noticeData.title}</h2>
          </div>

          <div className={styles.metaInfo}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>작성일:</span>
              <span className={styles.metaValue}>{noticeData.date}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>작성자:</span>
              <span className={styles.metaValue}>{noticeData.author}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>조회수:</span>
              <span className={styles.metaValue}>{noticeData.views}</span>
            </div>
          </div>
        </div>

        <div className={styles.contentSection}>
          <div className={styles.content}>
            {/* <p>{noticeData.contentdtl}</p> */}
            {noticeData.contentdtl.split("\n").map((line, index) => (
              <p key={index} className={styles.contentLine}>
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={handleBack} className={styles.listButton}>
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetailPage;
