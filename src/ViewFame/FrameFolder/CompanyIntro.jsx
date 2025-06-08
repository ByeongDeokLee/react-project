"use client";

import "../CssFolder/CompanyIntro.css";

export default function CompanyIntro() {
  const stats = [
    { number: "500+", label: "완성된 프로젝트" },
    { number: "98%", label: "고객 만족도" },
    { number: "24/7", label: "고객 지원" },
    { number: "5년+", label: "업계 경험" },
  ];

  const features = [
    {
      icon: "🎨",
      title: "맞춤형 디자인",
      description: "브랜드 아이덴티티에 맞는 독창적인 디자인을 제공합니다.",
    },
    {
      icon: "⚡",
      title: "빠른 제작",
      description:
        "효율적인 개발 프로세스로 신속한 프로젝트 완성을 보장합니다.",
    },
    {
      icon: "📱",
      title: "반응형 웹",
      description:
        "모든 디바이스에서 완벽하게 작동하는 반응형 웹사이트를 제작합니다.",
    },
    {
      icon: "🔧",
      title: "지속적인 지원",
      description:
        "프로젝트 완료 후에도 지속적인 유지보수와 업데이트를 제공합니다.",
    },
    {
      icon: "💡",
      title: "최신 기술",
      description:
        "최신 웹 기술과 트렌드를 적용하여 경쟁력 있는 웹사이트를 구축합니다.",
    },
    {
      icon: "🎯",
      title: "목표 달성",
      description:
        "고객의 비즈니스 목표 달성을 위한 전략적 웹사이트를 기획합니다.",
    },
  ];

  const team = [
    {
      name: "김웹개발",
      role: "대표 개발자",
      experience: "10년+ 경력",
      specialty: "풀스택 개발",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "박디자인",
      role: "UI/UX 디자이너",
      experience: "8년+ 경력",
      specialty: "사용자 경험 설계",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      name: "이기획자",
      role: "프로젝트 매니저",
      experience: "7년+ 경력",
      specialty: "프로젝트 관리",
      image: "/placeholder.svg?height=120&width=120",
    },
  ];

  return (
    <section className="company-intro">
      {/* Hero Section */}
      <div className="company-hero">
        <div className="company-hero-content">
          <h2>신뢰할 수 있는 웹 개발 파트너</h2>
          <p>
            5년간 500개 이상의 프로젝트를 성공적으로 완성한 경험과 노하우로
            <br />
            고객의 비즈니스 성장을 위한 최고의 웹사이트를 제작합니다.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="company-stats">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="company-features">
        <div className="features-container">
          <div className="section-header">
            <h3>왜 저희를 선택해야 할까요?</h3>
            <p>고객 만족을 위한 차별화된 서비스를 제공합니다</p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="company-team">
        <div className="team-container">
          <div className="section-header">
            <h3>전문가 팀</h3>
            <p>각 분야의 전문가들이 함께 최고의 결과물을 만들어갑니다</p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                  />
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p className="team-role">{member.role}</p>
                  <p className="team-experience">{member.experience}</p>
                  <p className="team-specialty">{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="company-process">
        <div className="process-container">
          <div className="section-header">
            <h3>개발 프로세스</h3>
            <p>체계적이고 투명한 개발 과정으로 고품질의 결과물을 보장합니다</p>
          </div>

          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h4>상담 및 기획</h4>
                <p>
                  고객의 요구사항을 정확히 파악하고 최적의 솔루션을 제안합니다.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h4>디자인 설계</h4>
                <p>
                  브랜드에 맞는 UI/UX 디자인을 설계하고 고객 승인을 받습니다.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h4>개발 및 구현</h4>
                <p>
                  최신 기술을 활용하여 안정적이고 효율적인 웹사이트를
                  개발합니다.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h4>테스트 및 배포</h4>
                <p>철저한 테스트를 통해 품질을 검증하고 안전하게 배포합니다.</p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-number">05</div>
              <div className="step-content">
                <h4>유지보수</h4>
                <p>지속적인 모니터링과 업데이트로 최적의 성능을 유지합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
