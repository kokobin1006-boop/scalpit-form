"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CountUp } from "@/components/franchise-motion";
import { HeadquartersCapabilities } from "@/components/franchise-expansion";
import { BranchReels } from "@/components/franchise-reels";
import { PreventionTrend, RecoveryBars } from "@/components/franchise-visuals";

export function FranchiseOpening() {
  return <section className="section franchise-opening" aria-labelledby="opening-title"><div data-reveal><span className="story-kicker">“스칼프잇은 가맹 안 하나요?”</span><h2 id="opening-title">스칼프잇 가맹,<br/>드디어 시작합니다.</h2><p className="opening-question-context">스칼프잇을 오픈하고<br/>가장 많이 들었던 질문 중 하나입니다.</p><div className="opening-limit"><span>전국 가맹 파트너</span><strong>단 <b>30</b>개점.</strong><p>확장의 속도만큼,<br/>함께할 파트너의 기준도 중요하니까요.</p></div></div><div className="opening-answer opening-purpose" data-reveal><span className="story-kicker">가맹을 시작하는 이유는 단 하나</span><h3>더 빠르게,<br/>시장의 기준이 되기 위해.</h3><p>마음 같아서는 직영점으로만<br/>20개, 30개를 직접 만들고 싶었습니다.</p><p>하지만 좋은 기준이 더 많은 고객에게 닿기까지,<br/>한 매장씩 늘리는 시간만 기다릴 수는 없었습니다.</p><p>직영 4곳에서 쌓은 운영 경험에<br/>같은 기준을 지킬 파트너의 실행력을 더합니다.</p><strong className="opening-final">아무 곳에나 오픈하지 않습니다.<br/>아무와나 계약하지 않습니다.</strong><a className="editorial-text-link" href="#sales">직영점에서 만든 결과 확인 <ArrowRight size={19}/></a></div></section>;
}

export function RecoveryPlan() {
  return <section className="section recovery-section" id="recovery" aria-labelledby="recovery-title">
    <div className="recovery-heading" data-reveal><span className="story-kicker">투자금 2억원 기준 · 단순 회수 시뮬레이션</span><h2 id="recovery-title">원금 회수 기간.</h2><p><strong>월 순현금별 회수 기간 비교.</strong><br/>총 투자금 2억원을 기준으로 계산했습니다.</p><div className="recovery-investment"><span>투자금 가정</span><strong>2<small>억원</small></strong></div></div>
    <div className="recovery-calculation" data-reveal><p className="recovery-assumption">투자금 <b>2억원 ÷ 월 순현금</b></p><RecoveryBars/><p className="recovery-note">모든 비용·세금 차감 후 회수 가능한 순현금이 매월 일정하고 추가 투자가 없는 가정입니다. 위 손익표의 잔액과는 별도이며, 실제 수익·회수 실적을 뜻하지 않습니다.</p><a href="#meeting" className="editorial-text-link">내 창업비용과 회수 기간 상담 <ArrowUpRight size={18}/></a></div>
  </section>;
}

const cosmeticsSource = "https://kcia.or.kr/inc/down.php?dir=BOARD&file_name=202605_177978900248248_2.pdf&rename=5.22.%ED%99%94%EC%9E%A5%ED%92%88%EC%A0%95%EC%B1%85%EA%B3%BC.pdf";
const wellnessSource = "https://globalwellnessinstitute.org/press-room/press-releases/gwi-country-rankings-jan2024/";
const hairSurveySource = "https://www.trendmonitor.co.kr/tmweb/trend/allTrend/detail.do?bIdx=3236&code=0502&trendType=CKOREA";

export function MarketOpportunity() {
  return <section className="section korea-market" id="market" aria-labelledby="market-title">
    <div className="korea-market-heading" data-reveal>
      <span className="story-kicker">탈모 고민 · 예방 관심 · 뷰티 · 웰니스</span>
      <h2 id="market-title">관심은 이미 일상으로.<br/><em>두피 관리의 시장.</em></h2>
      <p>탈모 증상 경험자부터<br/>미리 관리하고 싶은 고객까지.</p>
    </div>
    <div className="hair-demand-grid">
      <article data-reveal><span className="demand-category">탈모 증상 경험</span><strong><CountUp value={31.7} decimals={1}/><small>%</small></strong><h3>응답자 약 3명 중 1명.</h3><p>탈모 증상을 경험한 적이 있다고 응답한 비율.<br/>두피와 모발 고민은 가까운 일상에 있습니다.</p></article>
      <PreventionTrend/>
    </div>
    <p className="hair-survey-source">전국 만 19~59세 성인 남녀 1,000명 · 2025.03.12–03.17 조사 · 자가 응답 기준<br/><a href={hairSurveySource} target="_blank" rel="noreferrer">엠브레인 트렌드모니터 · 2025 헤어 관리 및 탈모 관련 인식 조사 <ArrowUpRight size={13}/></a></p>
    <div className="domestic-context">
      <article data-reveal><span>K뷰티 산업</span><strong>17.9<small>조원</small></strong><div><h3>2025년 국내 화장품 생산액</h3><p>전년 대비 2.3% 증가</p><a className="market-source" href={cosmeticsSource} target="_blank" rel="noreferrer">식약처 · 2025 생산·수출·수입 통계 <ArrowUpRight size={13}/></a></div></article>
      <article data-reveal><span>국내 웰니스 시장</span><strong>1,130<small>억 달러</small></strong><div><h3>2022년 한국 웰니스 경제 규모</h3><p>2020–2022년 연평균 9.4% 성장</p><a className="market-source" href={wellnessSource} target="_blank" rel="noreferrer">GWI · 한국 웰니스 경제, 2024 발표 <ArrowUpRight size={13}/></a></div></article>
    </div>
    <div className="market-to-business" data-reveal><p>관리 수요 × 뷰티 수요 × 휴식 수요</p><strong>전문 두피 케어에 휴식을 더한<br/><em>스칼프잇의 사업 영역.</em></strong></div>
    <p className="market-scope">조사 비율은 의학적 탈모 유병률이나 유료 서비스 이용률이 아닙니다. 화장품 생산액과 한국 전체 웰니스 경제 규모는 헤드스파 시장 규모와 구분됩니다.</p>
  </section>;
}

const audiences = [
  {n:"01", program:"프리미엄 헤어 로스 솔루션", category:"숱·가르마 변화가 고민인 성인", title:"사진 속 정수리가 신경 쓰이는 고객", moment:"“예전보다 가르마가 넓어 보이는데.”", text:"모발과 두피의 변화 때문에 직접 검색하는 고객. 현재 두피 상태를 살피고, 꾸준히 관리할 곳을 찾는 목적이 분명합니다.", opportunity:"일회성 체험 이후 정기 관리로 연결할 수 있는 수요"},
  {n:"02", program:"트러블드 스칼프 케어", category:"각질·유분이 불편한 청소년·20대", title:"머리숱보다, 오늘의 두피가 고민인 고객", moment:"“매일 감는데도 오후면 기름지고 신경 쓰여요.”", text:"교복 위 각질, 오후의 유분과 냄새처럼 일상에서 느끼는 불편. 탈모를 고민하지 않아도 두피 세정과 관리를 찾는 이유가 있습니다.", opportunity:"기존 탈모 고객 밖의 젊은 생활 관리 수요"},
  {n:"03", program:"매터니티 헤드스파", category:"출산 전후 두피 변화에 관심 있는 고객", title:"출산 후 달라진 머리카락이 낯선 고객", moment:"“아이를 낳고 나니 제 머리도 신경 쓰여요.”", text:"출산과 육아를 거치며 모발 변화에 관심이 생긴 고객. 개인 컨디션과 이용 가능 여부를 먼저 확인하고 두피 관리와 휴식 시간을 안내합니다.", opportunity:"출산이라는 생애 사건에서 생기는 새로운 관리 수요"},
  {n:"04", program:"리페어 스파", category:"염색·펌을 반복하는 고객", title:"헤어스타일만큼 두피도 챙기려는 고객", moment:"“염색은 계속하고 싶은데 두피 관리도 받고 싶어요.”", text:"정기적으로 뿌리 염색, 새치 염색, 펌을 하는 고객. 헤어스타일을 가꾸는 기존 소비에 두피 상태를 살피는 관리 경험을 더합니다.", opportunity:"미용실 이용층과 연결되는 별도의 두피 관리 수요"},
  {n:"05", program:"프레스티지 스칼프 리바이브", category:"스파·에스테틱을 이용하는 뷰티 고객", title:"피부와 몸처럼 두피에도 투자하는 고객", moment:"“피부 관리는 꾸준히 받는데, 두피는 처음이에요.”", text:"이미 전문 관리에 비용을 지불하는 고객. 두피를 자기관리 루틴의 한 부분으로 제안하며, 프로그램과 서비스 완성도로 선택받습니다.", opportunity:"관리에 지출하는 고객에게 추가로 제안할 수 있는 서비스"},
  {n:"06", program:"시그니처 딥 릴랙스 스파", category:"일상에서 휴식이 필요한 직장인", title:"두피 문제 없이도 쉬러 오는 고객", moment:"“오늘 한 시간만큼은 아무것도 신경 쓰고 싶지 않아요.”", text:"관리 결과보다 쉬는 시간 자체를 구매하는 고객. 야근 뒤, 휴일 오후, 혼자 보내는 시간에 편안하게 누워 관리받는 경험을 제안합니다.", opportunity:"증상과 관계없이 방문 이유가 생기는 휴식 수요"},
  {n:"07", program:"브레인 디톡스 헤드스파", category:"커플·친구의 데이트와 기념일", title:"식사와 카페 다음 코스를 찾는 두 사람", moment:"“이번 주말엔 같이 새로운 걸 해볼까?”", text:"커플 데이트, 친구와의 약속, 기념일에 함께 즐기는 관리. 누가 두피 고민이 있는지보다 무엇을 함께 경험할지가 방문을 결정합니다.", opportunity:"한 사람의 관심이 동행 고객의 예약으로 이어지는 수요"},
  {n:"08", program:"프레스티지 딥 릴랙스 스파", category:"K뷰티를 경험하려는 여행객", title:"여행 일정에 헤드스파를 넣는 고객", moment:"“한국에 가면 이 헤드스파는 받아보고 싶어요.”", text:"콘텐츠를 보고 찾아오는 외국인 관광객과 국내 여행객. 관광·방문 수요가 있는 상권에서는 생활권 밖의 고객에게도 매장을 알릴 수 있습니다.", opportunity:"지역 주민 밖에서 찾아오는 목적 방문 수요"},
];

export function CustomerReasons() {
  return <section className="section customer-section" id="customers" aria-labelledby="customer-title">
    <div className="longform-heading" data-reveal><span className="story-kicker">고민·생애 변화·뷰티·휴식·동반 방문·여행</span><h2 id="customer-title">탈모 고객만으로<br/>시장을 보지 않습니다.</h2><p>두피가 불편해서. 출산 후 달라져서. 염색을 자주 해서.<br/>이미 관리를 즐겨서. 쉬고 싶어서. 함께 경험하고 싶어서.<br/>같은 헤드스파에도, 구매 이유는 다릅니다.</p></div>
    <div className="customer-reasons">{audiences.map(a=><article key={a.n} data-reveal><span className="reason-number">{a.n}</span><div className="customer-reason-copy"><span className="customer-type">{a.category}</span><h3>{a.title}</h3><p className="customer-moment">{a.moment}</p><p>{a.text}</p><div className="customer-program"><span>연결할 프로그램</span><strong>{a.program}</strong></div><div className="customer-opportunity"><span>점주가 볼 기회</span><strong>{a.opportunity}</strong></div></div></article>)}</div>
    <div className="customer-closing" data-reveal><span>지금 불편한 고객 + 이미 관리하는 고객 + 경험을 찾는 고객</span><strong>매장의 고객을,<br/>탈모 고민 하나에 한정하지 않습니다.</strong><p>각 항목은 방문 상황의 예시입니다. 상권에 맞는 고객층을 골라 본사가 광고와 콘텐츠를 설계합니다.</p></div>
  </section>;
}

export function RevenueLogic() {
  return <section className="section revenue-logic" id="business" aria-labelledby="business-title"><div className="longform-heading" data-reveal><span className="story-kicker">매출을 만드는 운영의 세 가지 축</span><h2 id="business-title">첫 방문을 만들고,<br/>다음 예약을 쌓습니다.</h2><p>광고로 한 번 알리는 데서 끝나지 않습니다.<br/>예약부터 서비스, 다음 방문까지 매장의 흐름을 함께 봅니다.</p></div><div className="revenue-levers">{[
    ["신규 고객", "매장을 알리고, 예약으로.", "플레이스·콘텐츠·지역 광고로 방문할 이유를 전달합니다. 문의에서 실제 예약으로 이어지는 과정까지 확인합니다."],
    ["고객당 매출", "가격을 설명할 수 있는 경험.", "고객의 목적에 맞는 프로그램을 안내합니다. 관리의 구성과 가치를 납득시키는 상담을 교육합니다."],
    ["다음 방문", "관리가 끝난 뒤에도 이어지게.", "이용 경험과 두피 고민을 확인하고 다음 관리와 홈케어를 안내합니다. 다시 찾을 이유를 만드는 것이 현장 운영의 핵심입니다."],
  ].map(([label,title,text],i)=><article key={label} data-reveal><span>0{i+1} / {label}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="business-question" data-reveal><strong>“손님이 왜 안 올까요?”<br/>혼자 답을 찾게 두지 않겠습니다.</strong><a href="#support" className="editorial-text-link">본사가 실행하는 일 보기 <ArrowRight size={18}/></a></div></section>;
}

export function CareDifference() {
  return <section className="section difference-section" id="difference" aria-labelledby="difference-title"><div className="longform-heading" data-reveal><span className="story-kicker">미용실에도 헤드스파가 있는데, 왜 스칼프잇인가</span><h2 id="difference-title">헤드스파 전문점의<br/>확실한 차이.</h2><p>고객이 두피 케어를 받으러 일부러 찾아오도록.<br/>메뉴도, 교육도, 광고도 같은 목적에 집중합니다.</p></div><div className="difference-table" role="table" aria-label="스칼프잇 전문점의 운영 기준"><div className="difference-row difference-head" role="row"><span role="columnheader">점주님이 봐야 할 차이</span><span role="columnheader">매장의 경쟁력으로 연결되는 기준</span></div>{[
    ["판매하는 서비스", "두피 케어가 매장의 중심입니다.", "상담과 프로그램, 예약 시간을 두피 관리에 맞춥니다. 고객이 무엇을 받기 위해 오는 곳인지 명확하게 전달합니다."],
    ["직원을 키우는 방식", "관리 전 과정을 하나의 기준으로.", "관리 순서와 고객 응대를 교육합니다. 채용 이후 현장에서 필요한 기준까지 함께 준비합니다."],
    ["고객에게 기억되는 이유", "우리 동네에서 떠오르는 두피 브랜드.", "플레이스에서 찾고, 콘텐츠로 확인하고, 경험으로 기억하게 합니다. 공간과 서비스, 광고에서 같은 브랜드를 만나게 합니다."],
  ].map(([label,title,description])=><div className="difference-row" role="row" key={label} data-reveal><span role="cell">{label}</span><div role="cell"><h3>{title}</h3><p>{description}</p></div></div>)}</div><div className="difference-conclusion" data-reveal><strong>“두피 관리 어디서 받아?”<br/>그 질문의 답이 스칼프잇이 되도록.</strong><span>전문점으로 선택받는 이유를 만듭니다.</span></div></section>;
}

export function SpaceGallery() {
  return <section className="space-section" id="spaces" aria-labelledby="space-title"><div className="section space-heading" data-reveal><span className="story-kicker">점주님의 매장도, 이런 브랜드로</span><h2 id="space-title">보여주고 싶은 매장.<br/>찾아가고 싶은 브랜드.</h2><p>처음 보는 사진에서 방문할 이유를 만들고,<br/>직접 온 고객에게 기억할 장면을 남깁니다.<br/>압구정과 광교에서 그 기준을 확인하세요.</p></div><div className="space-gallery"><figure className="space-main" data-reveal><div><img src="/images/apgujeong-reception.webp" loading="lazy" alt="스칼프잇 압구정 리셉션 공간"/></div><figcaption><span>압구정 본점</span><strong>브랜드의 기준을 직접 만나는 곳</strong></figcaption></figure><figure className="space-secondary" data-reveal><div><img src="/images/gwanggyo.webp" loading="lazy" alt="스칼프잇 광교점 공간"/></div><figcaption><span>광교점</span><strong>지역에서도 선택받을 첫인상</strong></figcaption></figure></div></section>;
}

const keywordGroups = [
  {region:"서울", keywords:["서울 헤드스파"]},
  {region:"강남", keywords:["강남 탈모", "강남 헤드스파", "강남 두피케어", "강남 두피관리", "강남 두피스파"]},
  {region:"압구정", keywords:["압구정 탈모", "압구정 헤드스파", "압구정 두피케어", "압구정 두피관리", "압구정 두피스파"]},
];

function KeywordRankings() {
  return <div className="keyword-proof" id="rankings">
    <div className="keyword-proof-heading" data-reveal><span className="story-kicker">네이버 플레이스 · 압구정 본점</span><h3>서울·강남·압구정<br/>지역 키워드 1위.</h3><div className="keyword-total"><strong>11</strong><span>개 키워드<br/>1위 기록</span></div><p>서울 헤드스파부터 강남 두피관리까지.<br/>고객이 찾는 검색어에 스칼프잇.</p></div>
    <div className="keyword-table-wrap" data-reveal><table className="keyword-table"><caption className="sr-only">스칼프잇 압구정 본점 지역별 네이버 플레이스 키워드 순위</caption><thead><tr><th scope="col">지역</th><th scope="col">검색 키워드</th><th scope="col">순위</th></tr></thead>{keywordGroups.map(group=><tbody key={group.region}>{group.keywords.map((keyword,index)=><tr key={keyword}>{index===0 && <th scope="rowgroup" rowSpan={group.keywords.length}>{group.region}</th>}<td>{keyword}</td><td><strong>1<small>위</small></strong></td></tr>)}</tbody>)}</table><p className="keyword-note">검색 순위는 조회 시점·위치·검색 환경에 따라 달라질 수 있습니다.</p></div>
    <div className="keyword-conclusion" data-reveal><p>이것이 스칼프잇의 광고를 본사가 직접 실행하는 이유입니다.</p><strong>“광고를 도와드리는 것이 아니라,<br/>본사가 직접 해드립니다.”</strong><span>직영점에서 실행해온 마케팅을 가맹점 운영에 연결합니다.</span></div>
  </div>;
}

export function MarketingEngine() {
  return <section className="section marketing-section" id="marketing" aria-labelledby="marketing-title"><div className="marketing-heading" data-reveal><span className="story-kicker">본사 직접 실행 · 광고·마케팅</span><h2 id="marketing-title">손님을 부르는 일,<br/>본사가 직접 합니다.</h2><p>콘텐츠부터 지역 광고까지.<br/>기획·집행·개선은 본사가 맡습니다.<br/><strong>직영점에서 실행해온 본사의 마케팅.</strong></p></div><div className="marketing-zero" data-reveal><div><span>점주님의 광고 실무 부담</span><p>기획·집행·관리까지<br/>본사가 직접 실행합니다.</p></div><strong>ZERO</strong></div><BranchReels/><KeywordRankings/><HeadquartersCapabilities/><div className="instagram-proof" data-reveal><div><span className="story-kicker">이미 스칼프잇을 보고 있는 사람들</span><strong><CountUp value={1.5} decimals={1}/><small>만 팔로워</small></strong><h3>첫 매장이지만,<br/>처음 알려지는 브랜드는 아닙니다.</h3><p>점주님의 첫 매장에,<br/>스칼프잇의 콘텐츠와 마케팅 경험을 연결합니다.</p><a className="editorial-text-link" href="https://www.instagram.com/scalpit__/" target="_blank" rel="noreferrer">스칼프잇 인스타그램 <ArrowUpRight size={17}/></a></div><figure><img src="/images/scalpit-instagram-profile.png" width="627" height="302" loading="lazy" alt="스칼프잇 인스타그램 scalpit__ 프로필. 팔로워 1.5만 명이 표시된 화면."/><figcaption>브랜드 인스타그램 프로필 · 팔로워 수는 화면 캡처 기준</figcaption></figure></div><MarketingJourney/><p className="editorial-note">본사 실행 범위와 지점 광고 예산은 상담에서 구체적으로 안내합니다.</p></section>;
}

function MarketingJourney() {
  const steps = [
    { title: "콘텐츠로 발견", text: "공간과 관리 장면으로 관심을 만듭니다. 상권에 맞는 소재와 지역 광고를 본사가 실행합니다.", owner: "본사 · 콘텐츠·광고" },
    { title: "검색에서 예약", text: "플레이스의 매장 정보, 프로그램, 리뷰를 통해 비교하고 예약할 수 있게 연결합니다.", owner: "본사 · 마케팅 / 매장 · 예약 응대" },
    { title: "첫 방문의 만족", text: "예약 시간부터 상담과 관리까지. 교육받은 직원이 브랜드의 기준으로 고객을 맞습니다.", owner: "본사 · 교육 / 매장 · 서비스" },
    { title: "다음 관리로 연결", text: "관리 후 두피 상태와 고객의 목적에 맞춰 다음 관리와 홈케어를 안내합니다.", owner: "매장 · 고객 관리 / 본사 · 운영 점검" },
  ];
  return <div className="marketing-journey" aria-labelledby="journey-title">
    <div className="journey-heading" data-reveal><span className="story-kicker">광고 이후의 운영까지</span><h3 id="journey-title">신규 유입부터 재방문까지.</h3><p>광고가 방문으로, 관리 경험이 다음 예약으로.<br/>본사와 매장이 함께 만드는 매출의 흐름입니다.</p></div>
    <ol className="journey-steps">{steps.map((step,index)=><li key={step.title} data-reveal><span className="journey-index">0{index+1}</span><h4>{step.title}</h4><p>{step.text}</p><span className="journey-owner">{step.owner}</span></li>)}</ol>
    <div className="journey-cta"><strong>광고를 처음 배울 필요 없이,<br/>이미 실행하는 본사와 시작하세요.</strong><a href="#meeting" className="button button-wine">내 지역 마케팅·창업 상담 <ArrowUpRight size={18}/></a></div>
  </div>;
}

export function LocationStrategy() {
  return <section className="section location-section" id="location" aria-labelledby="location-title"><div className="location-intro" data-reveal><span className="story-kicker">경쟁점·고객·매출·비용 분석</span><h2 id="location-title">출점 상권 분석.<br/><em>감이 아닌 데이터로.</em></h2><p>우리 서비스를 선택할 고객이 있는지,<br/>매출과 비용이 맞는지부터 확인합니다.<br/>희망 지역을 알려주세요.</p><a className="editorial-text-link" href="#meeting">희망 지역 출점 상담 <ArrowUpRight size={18}/></a></div><ol className="location-checks">{[
    ["고객이 실제로 머무는 상권인가", "주거·업무·방문 수요, 접근성과 고객 동선을 살펴봅니다. 평일과 주말에 누가 찾아올지 구체적으로 그립니다."],
    ["뷰티·관리에 얼마를 쓰는 지역인가", "주변 미용실·에스테틱·뷰티 업종의 매출과 가격대를 검토합니다. 고객의 소비 수준과 우리 프로그램의 적합성을 봅니다."],
    ["경쟁 속에서 선택받을 이유가 있는가", "경쟁점의 서비스, 가격, 리뷰를 분석합니다. 우리 매장이 보여줄 차이와 고객에게 전할 메시지를 정합니다."],
    ["매출이 나면 얼마가 남는 자리인가", "임대료·인건비·시설 조건을 함께 계산합니다. 공간의 크기만큼, 매달 감당할 비용도 확인합니다."],
  ].map(([title,text],index)=><li key={title} data-reveal><span>0{index+1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>;
}

export function OpeningSupport() {
  return <section className="section opening-support-section" id="education" aria-labelledby="education-title"><div className="longform-heading" data-reveal><span className="story-kicker">계약 이후, 본사가 함께하는 과정</span><h2 id="education-title">오픈 준비부터 운영까지.<br/>본사 지원 프로세스.</h2><p>입지, 직원, 교육, 첫 광고.<br/>처음이라 막막한 준비를 단계별로 함께 진행합니다.</p></div><div className="opening-support-steps">{[
    {phase:"오픈 전", title:"상권·인력·공간 준비",items:["고객층·경쟁점·임대료 검토", "필요 인원 계획과 모집·면접 지원", "시설·동선과 오픈 준비 점검"], result:"우리 매장에 맞는 출점·인력 계획"},
    {phase:"교육·오픈",title:"첫 고객을 맞을 준비",items:["상담·관리·고객 응대 교육", "예약과 현장 운영 교육", "지역 광고와 오픈 콘텐츠 준비"], result:"서비스 기준과 고객 유입 준비"},
    {phase:"운영 이후",title:"매출·서비스 운영 점검",items:["광고 반응과 고객 유입 확인", "직원·서비스·현장 이슈 상담", "운영 수치와 개선 방향 점검"], result:"오픈 이후의 운영 개선"},
  ].map(({phase,title,items,result},i)=><article key={phase} data-reveal><span className="opening-phase">0{i+1} <b>{phase}</b></span><h3>{title}</h3><ul>{items.map(item=><li key={item}>{item}</li>)}</ul><p className="opening-result-summary">{result}</p></article>)}</div><div className="support-partnership" data-reveal><div><span>본사가 집중하는 일</span><strong>광고·채용 지원·교육·운영 점검</strong></div><div><span>점주가 집중하는 일</span><strong>고객·직원·매장의 하루</strong></div><a href="#meeting" className="editorial-text-link">내 준비 상황으로 상담하기 <ArrowUpRight size={18}/></a></div></section>;
}
