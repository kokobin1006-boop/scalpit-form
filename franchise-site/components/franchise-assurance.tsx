import { ChevronDown } from "lucide-react";
import { TERMS_VERIFIED, talentSteps } from "@/lib/franchise-terms";

export function RepeatVisitPlan() {
  return <div className="sc-return-plan">
    <div><span className="sc-decision-label">첫 방문 다음에 남아야 할 것</span><h3>다음에도 여기여야 할 이유.</h3><p>내 상태를 설명해 주고, 내 취향을 기억하고.<br/>다시 올 때 처음부터 설명하지 않아도 되는 관리.</p></div>
    <ol>{[
      ["상담에서 납득하고", "촬영한 두피 상태와 방문 목적을 바탕으로, 왜 이 관리가 필요한지 설명합니다."],
      ["관리에서 차이를 느끼고", "압력·온도·불편함을 확인하고, 마무리 때 오늘 받은 관리와 생활 속 관리법을 짚습니다."],
      ["다음 방문이 편해지도록", "고객 동의 아래 관리 이력과 선호를 기록합니다. 필요에 맞는 다음 시기와 예약을 안내합니다."],
    ].map(([title, description], i) => <li key={title}><b>0{i + 1}</b><div><h4>{title}</h4><p>{description}</p></div></li>)}</ol>
    <p className="sc-decision-note">재방문을 위한 운영 설계입니다. 고객별 관리 필요와 선호가 다르며, 재방문율이나 관리 효과를 보장하는 내용은 아닙니다.</p>
  </div>;
}

export function OperatingResponsibilities() {
  return <div className="sc-responsibilities">
    <div className="sc-decision-heading"><span className="sc-decision-label">본사가 하는 일 / 점주님이 하는 일</span><h3>처음부터 혼자 배울 일은 줄이고,<br/>매장에서 챙길 일은 분명하게.</h3><p>광고를 배우고 대행사를 찾는 시간은 본사가 맡습니다.<br/>점주님은 예약, 직원, 고객 경험과 매장 손익에 집중합니다.</p></div>
    <div className="sc-responsibility-table" role="region" aria-label="본사와 점주 업무 분담" tabIndex={0}><table><thead><tr><th scope="col">업무</th><th scope="col">본사</th><th scope="col">점주님·매장</th></tr></thead><tbody>{[
      ["고객 유입", "콘텐츠 제작 · 광고 집행 · 검색 정보 관리", "예약 가능 시간 공유 · 문의 응대 · 방문 기록"],
      ["채용·교육", "필요 인원 검토 · 모집·면접 준비 · 직무 교육", "채용 결정 · 근무표 · 현장 피드백"],
      ["서비스 품질", "관리 순서 · 상담 기준 · 정기 교육", "고객 컨디션 확인 · 위생 · 관리 품질 점검"],
      ["매출·비용", "지표 검토 · 원인 분석 · 개선 과제 협의", "매출·비용 입력 · 재고 · 현장 실행"],
    ].map(([area, hq, owner]) => <tr key={area}><th scope="row">{area}</th><td>{hq}</td><td>{owner}</td></tr>)}</tbody></table></div>
    <details className="sc-assurance-detail"><summary>그럼, 점주님의 하루는 어떤가요?<ChevronDown/></summary><ol className="sc-owner-day">{[
      ["오픈 전", "오늘 예약과 근무표, 준비된 관리실·제품을 확인합니다."],
      ["영업 중", "고객 응대와 대기 시간을 살피고, 예약 변경과 직원 이슈를 조율합니다."],
      ["마감 후", "매출·취소·비용을 기록하고, 내일 예약과 재고를 확인합니다."],
    ].map(([time, task]) => <li key={time}><strong>{time}</strong><p>{task}</p></li>)}</ol><p className="sc-decision-note">직접 관리 참여와 매니저 배치는 운영 방식에 따라 달라집니다. 본사 지원이 현장 운영자를 대신하는 구조는 아닙니다.</p></details>
  </div>;
}

export function RecoveryPlan() {
  return <div className="sc-recovery-plan">
    <div className="sc-decision-heading"><span className="sc-decision-label">오픈 이후 · 문제별 점검</span><h3>매출이 흔들릴 때,<br/>“광고를 더 하세요”로 끝내지 않습니다.</h3><p>어디에서 고객이 줄었는지, 어느 비용이 늘었는지.<br/>원인을 나눠야 다음에 할 일도 달라집니다.</p></div>
    <div className="sc-recovery-cases">{[
      {title:"문의가 줄었을 때", check:"노출 · 클릭 · 플레이스 진입", action:"본사가 지역·소재·검색 정보를 점검하고, 바꿔볼 광고와 콘텐츠를 정합니다.", metric:"광고비 대비 문의 수 · 문의당 비용"},
      {title:"문의는 오는데 예약이 안 될 때", check:"응답 시간 · 상담 내용 · 예약 가능 시간", action:"본사와 매장이 상담 과정과 이탈 지점을 확인합니다. 안내 문구와 예약 가능한 시간대를 조정합니다.", metric:"문의 대비 예약 · 취소율"},
      {title:"한 번 오고 다시 오지 않을 때", check:"방문 목적 · 만족도 · 다음 관리 안내", action:"상담·관리 기록과 고객 의견을 함께 봅니다. 응대 교육, 마무리 안내, 재예약 과정을 점검합니다.", metric:"첫 방문 고객의 재예약 · 실제 재방문"},
      {title:"바쁜데 남는 돈이 적을 때", check:"시간대별 예약 · 근무표 · 제품 사용량", action:"매출과 비용을 나란히 놓고 봅니다. 예약 배치, 인력 운영, 제품 사용 기준에서 조정할 일을 찾습니다.", metric:"인건비율 · 제품비율 · 영업이익"},
    ].map((item, i) => <details key={item.title}><summary><b>0{i + 1}</b><span>{item.title}</span><ChevronDown/></summary><div><span>먼저 확인</span><strong>{item.check}</strong><p>{item.action}</p><small>실행 후 비교할 숫자 · {item.metric}</small></div></details>)}</div>
    <p className="sc-decision-note">위 내용은 본사·매장의 운영 점검안입니다. 실제 지원 범위와 점검 주기는 개설 상담에서 확인하며, 매출 회복을 보장하는 약속은 아닙니다.</p>
  </div>;
}

export function CapitalChecklist() {
  return <details className="sc-capital-check sc-assurance-detail"><summary><span>내 총예산에 빠진 비용은 없을까요?<small>개설 비용 + 점포 비용 + 운영자금</small></span><ChevronDown/></summary><div className="sc-capital-columns">{[
    ["01", "매장을 만드는 돈", "가맹·교육, 인테리어, 장비·집기, 초도 제품 등 견적에 포함된 항목과 별도 항목을 구분합니다."],
    ["02", "점포를 확보하는 돈", "보증금·권리금과 공간에 따른 추가 공사, 부가세 등 별도 지출을 확인합니다."],
    ["03", "오픈 후 운영하는 돈", "초기 인건비·월세·광고비와 대출 상환, 생활비까지 고려해 여유 자금을 남깁니다."],
  ].map(([n, title, description]) => <div key={n}><span>{n}</span><h4>{title}</h4><p>{description}</p></div>)}</div><p className="sc-decision-note">모델 금액은 최종 총투자금 견적이 아닙니다. 포함·별도 항목과 정기 부담금을 확인한 뒤 출점을 검토합니다.</p></details>;
}

export function TalentPipeline() {
  return <div className="sc-talent">
    <div className="sc-decision-heading"><span className="sc-decision-label">사람이 곧 매출입니다 {!TERMS_VERIFIED && <em className="sc-draft-tag">시안</em>}</span><h3>테라피스트가 그만둬도<br/>매장이 흔들리지 않게.</h3><p>채용부터 교육, 실기 점검, 역할 확대, 정기 보수교육, 결원 대비까지.<br/>한 사람의 감이 아니라 기록과 기준으로 이어지게 설계합니다.</p></div>
    <ol className="sc-talent-steps">{talentSteps.map(step => <li key={step.n}><b>{step.n}</b><div><strong>{step.t}</strong><p>{step.d}</p></div></li>)}</ol>
    <p className="sc-decision-note">자격증이 아니라 본사 자체 점검표 기준입니다. 이직과 결원을 완전히 막을 수는 없어, 즉시 대체 인력을 보장하지 않습니다. 예비 인건비와 채용 기간을 함께 검토합니다.</p>
  </div>;
}
