"use client";

import { ArrowUpRight } from "lucide-react";

export function ProfitComposition() {
  const remainder = 3400 / 7000 * 100;
  return <figure className="profit-composition" aria-label="월매출 7,000만원 중 표시 운영비 3,600만원, 잔액 3,400만원. 추가 비용 차감 전 예시.">
    <svg viewBox="0 0 160 160" aria-hidden="true"><circle cx="80" cy="80" r="64" fill="none" stroke="#c4ac92" strokeWidth="21"/><circle cx="80" cy="80" r="64" fill="none" stroke="#631018" strokeWidth="21" pathLength="100" strokeDasharray={`${remainder} ${100-remainder}`} transform="rotate(-90 80 80)"/><text x="80" y="76" textAnchor="middle">잔액 비중</text><text x="80" y="101" textAnchor="middle" className="donut-percent">48.6%</text></svg>
    <figcaption><div><span className="legend-swatch remainder"/><span>표시 비용 차감 후<strong>3,400<small>만원</small></strong></span></div><div><span className="legend-swatch costs"/><span>표시 운영비 합계<strong>3,600<small>만원</small></strong></span></div></figcaption>
  </figure>;
}

export function RecoveryBars() {
  return <figure className="recovery-bars"><figcaption>월 순현금이 달라지면, 회수 기간도 달라집니다.</figcaption><div className="recovery-bar-axis" aria-hidden="true"><span>0</span><span>5</span><span>10개월</span></div>{[
    {cash:"2,000",months:"10",width:100},
    {cash:"3,000",months:"약 6.7",width:20000/3000/10*100},
    {cash:"4,000",months:"5",width:50},
  ].map(r=><div className="recovery-bar-row" key={r.cash}><div className="recovery-bar-label"><span>월 순현금</span><strong>{r.cash}<small>만원</small></strong></div><div className="recovery-bar-track" aria-hidden="true"><span style={{width:`${r.width}%`}}/></div><strong className="recovery-bar-value">{r.months}<small>개월</small></strong></div>)}</figure>;
}

export function PreventionTrend() {
  return <article className="prevention-trend" data-reveal><span className="demand-category">탈모 경험 없이도 예방에 관심</span><h3>증상이 없는 고객까지.<br/>관심층은 넓어지고 있습니다.</h3><figure><figcaption className="sr-only">탈모 예방 관심 응답률: 2022년 42.7%, 2023년 44.0%, 2025년 46.9%.</figcaption><div className="prevention-axis" aria-hidden="true"><span>0%</span><span>50%</span><span>100%</span></div>{[{year:2022,value:42.7},{year:2023,value:44.0},{year:2025,value:46.9}].map(r=><div className="prevention-row" key={r.year}><span>{r.year}</span><div className="prevention-track" aria-hidden="true"><i style={{width:`${r.value}%`}}/></div><strong>{r.value.toFixed(1)}<small>%</small></strong></div>)}</figure><p className="prevention-change">2022 → 2025 <strong>+4.2<small>%p</small></strong></p></article>;
}

const tiers = [
  {name:"CORE",label:"기본 두피·헤어 관리",min:9,max:12,time:"50–80분",intent:"첫 두피 관리부터 일상의 휴식까지",programs:["브레인 디톡스 헤드스파", "트러블드 스칼프 케어", "매터니티 헤드스파"]},
  {name:"SIGNATURE",label:"목적별 집중 관리",min:11,max:14.5,time:"70–80분",intent:"고객이 원하는 관리에 맞춘 선택",programs:["클리어·릴랙스 스파", "리페어 스파", "시그니처 딥 릴랙스 스파"]},
  {name:"PRESTIGE",label:"프리미엄 풀 케어",min:16.5,max:21,time:"80–90분",intent:"더 깊이 경험하고 싶은 고객까지",programs:["프레스티지 딥 릴랙스 스파", "프레스티지 스칼프 리바이브"]},
];

export function ProgramValue() {
  return <section className="section program-section" id="programs" aria-labelledby="program-title">
    <div className="program-heading" data-reveal><div><span className="story-kicker">고객의 방문 이유를, 프로그램 매출로</span><h2 id="program-title">첫 방문 <em>9만–21만원.</em><br/>선택의 폭이 매출의 폭으로.</h2></div><p>처음 두피 관리를 받는 고객부터<br/>프리미엄 스파를 찾는 고객까지.<br/>세 가지 프로그램군으로 맞이합니다.</p></div>
    <figure className="program-range-chart" data-reveal><figcaption><strong>프로그램군별 첫 방문 가격대</strong><span>단위: 만원 · 평균 객단가와는 다릅니다.</span></figcaption><div className="program-range-axis" aria-hidden="true">{[0,5,10,15,20,25].map(n=><span key={n}>{n}</span>)}</div>{tiers.map(t=><div className={`program-range-row tier-${t.name.toLowerCase()}`} key={t.name}><span>{t.name}</span><div className="program-range-track" aria-hidden="true"><i style={{left:`${t.min/25*100}%`,width:`${(t.max-t.min)/25*100}%`}}/></div><strong>{t.min}–{t.max}<small>만원</small></strong></div>)}</figure>
    <div className="program-tiers">{tiers.map(t=><article key={t.name} className={`tier-${t.name.toLowerCase()}`} data-reveal><span className="program-tier-name">{t.name}</span><h3>{t.label}</h3><div className="program-tier-price"><strong>{t.min}–{t.max}<small>만원</small></strong><span>첫 방문 · {t.time}</span></div><p>{t.intent}</p><ul>{t.programs.map(p=><li key={p}>{p}</li>)}</ul></article>)}</div>
    <div className="program-conclusion" data-reveal><strong>고객을 더 많이 만나는 구조.<br/>고객에게 더 맞게 제안하는 구조.</strong><p>상권에 맞는 고객을 광고로 만나고,<br/>방문 목적에 맞는 프로그램을 현장에서 제안합니다.</p><a href="#visit" className="editorial-text-link">본점에서 프로그램 직접 경험하기 <ArrowUpRight size={18}/></a></div>
    <p className="program-source">프로그램 안내표의 첫 방문 가격 기준입니다. 실제 적용 가격·프로모션·운영 프로그램은 상담에서 확인합니다.</p>
  </section>;
}

export function SpecialistComparison() {
  return <section className="section specialist-section" id="specialist" aria-labelledby="specialist-title"><div className="specialist-heading" data-reveal><span className="story-kicker">미용실에서도 헤드스파를 한다면?</span><h2 id="specialist-title">고객이 일부러 찾아올<br/><em>방문 목적을 만듭니다.</em></h2><p>커트와 펌을 받으러 가는 곳.<br/>두피 관리와 휴식 자체를 위해 찾아가는 곳.<br/>스칼프잇은 후자의 선택을 만드는 전문점입니다.</p></div><div className="specialist-table-wrap" data-reveal><table className="specialist-table"><caption>고객의 선택 기준과 스칼프잇의 운영 설계</caption><thead><tr><th scope="col">선택 기준</th><th scope="col">커트·펌·염색 중심의 방문</th><th scope="col">스칼프잇</th></tr></thead><tbody>{[
    ["방문 목적","헤어스타일의 변화","두피 관리와 휴식 자체"],
    ["메뉴의 중심","커트·펌·염색 등 헤어 시술","CORE · SIGNATURE · PRESTIGE"],
    ["예약하는 경험","원하는 스타일과 디자이너","목적에 맞는 50–90분 프로그램"],
    ["고객에게 알리는 내용","스타일과 시술 결과","두피 고민·관리·휴식·동반 경험"],
  ].map(row=><tr key={row[0]}><th scope="row">{row[0]}</th><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody></table><p>미용실의 헤드스파 운영 방식은 매장마다 다릅니다. 위 표는 방문 목적과 스칼프잇의 프로그램 설계를 비교한 내용입니다.</p></div><div className="specialist-bottom" data-reveal><strong>두피 관리를 받기 위해 검색하고,<br/>스칼프잇을 선택하게 만드는 것.</strong><a href="#marketing" className="editorial-text-link">본사가 실행하는 마케팅 확인 <ArrowUpRight size={18}/></a></div></section>;
}
