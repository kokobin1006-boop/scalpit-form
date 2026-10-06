"use client";

import { CountUp } from "@/components/franchise-motion";
import { ArrowUpRight } from "lucide-react";
import { MonthlySales } from "@/components/franchise-monthly-sales";
import { ProfitComposition } from "@/components/franchise-visuals";

const stores = [
  { name: "동탄", area: 27, sales: "7,200", investment: "1억 4천만원", image: "dongtan.webp", period: "월매출 사례", target: "목표 월매출 7,000만원", achieved: true },
  { name: "천안", area: 30, sales: "7,800", investment: "2억 2천만원", image: "cheonan.webp", period: "월매출 사례", target: "목표 월매출 7,000만원", achieved: true },
  { name: "광교", area: 50, sales: "7,000", investment: "3억원", image: "gwanggyo.webp", period: "오픈 첫 달 매출", target: "목표 월매출 1억원", achieved: false },
  { name: "압구정", area: 65, sales: "7,000", investment: "5억원", image: "apgujeong-space.webp", period: "오픈 첫 달 매출", target: "목표 월매출 1억 5천만원", achieved: false },
];

export function SalesAndProfit() {
  return <>
    <section className="section editorial-sales" id="sales"><div className="editorial-heading" data-reveal><h2>네 곳의 직영점.<br/>매출부터 공개합니다.</h2><p>동탄 27평 월 7,200만원 · 천안 30평 월 7,800만원.<br/>평수도, 상권도 다른 네 매장에서 직접 운영했습니다.</p></div><div className="editorial-stores">{stores.map((s, index) => <article key={s.name} data-reveal style={{ transitionDelay: `${index * 90}ms` }}><div className="editorial-store-photo"><img src={`/images/${s.image}`} alt={`스칼프잇 ${s.name} 공간, 브랜드 소개 자료`} loading="lazy"/></div><div className="editorial-store-title"><h3>{s.name}</h3><span>{s.area}평</span></div><span className="editorial-sales-label">{s.period}</span><strong className="editorial-sales-number"><CountUp value={Number(s.sales.replace(",", ""))}/><small>만원</small></strong><p className="editorial-investment">투자 규모 {s.investment}</p><div className={`editorial-target${s.achieved ? " is-achieved" : ""}`}><span>{s.target}</span>{s.achieved ? <b>달성</b> : <span className="opening-result">오픈 첫 달 7,000만원</span>}</div></article>)}</div><p className="editorial-note">지점별 매출 사례이며 평균 또는 가맹점 예상 매출이 아닙니다. 매출 집계 기간과 기준은 상담 시 안내합니다.</p></section>
    <MonthlySales/>
    <section className="section editorial-profit" id="profit"><div className="editorial-profit-copy" data-reveal><span className="editorial-label">월매출 7,000만원 가정 · 손익 시뮬레이션</span><h2>마진율 공개.</h2><div className="editorial-profit-number"><span>표시 운영비 차감 후 월 잔액</span><strong><CountUp value={3400}/><small>만원</small></strong><b>예시 마진율 <em>48.6%</em></b></div><p className="editorial-profit-caveat">세금·결제수수료·로열티 등 추가 비용 차감 전</p><ProfitComposition/></div><div className="editorial-ledger" data-reveal><table><caption>월 손익 예시 · 단위: 만원</caption><thead><tr><th scope="col">항목</th><th scope="col">금액</th></tr></thead><tbody><tr className="ledger-revenue"><th scope="row">매출</th><td>7,000</td></tr>{[["제품비 · 10%", "700"],["마케팅비 · 10%", "700"],["인건비 · 25%", "1,750"],["월세", "300"],["공과금·기타 운영비", "150"]].map(([label, amount]) => <tr key={label}><th scope="row">{label}</th><td>{amount}</td></tr>)}<tr className="ledger-total"><th scope="row">예상 잔액</th><td>3,400</td></tr><tr className="ledger-margin"><th scope="row">매출 대비</th><td>48.6%</td></tr></tbody></table><p className="editorial-note">월세 300만원을 적용한 비용 가정입니다. 세금·수수료·로열티 등 별도 비용 차감 전이며 실제 순이익과는 다릅니다.</p><a className="editorial-text-link" href="#meeting">내 매장의 손익 구조 상담하기 <ArrowUpRight size={18}/></a></div></section>
  </>;
}

export function ExecutionSection() {
  return <section className="editorial-support" id="support"><div className="editorial-support-photo" data-scroll-scene><img src="/images/gwanggyo.webp" alt="스칼프잇 광교점 공간" loading="lazy"/><span>스칼프잇 광교</span></div><div className="editorial-support-copy"><span className="editorial-label">본사가 하는 일</span><h2 data-reveal>처음 창업이어도,<br/>혼자 시작하지 않습니다.</h2><dl>{[["광고·마케팅", "콘텐츠 제작, 광고 집행, 반응 확인과 개선. 점주님이 광고 전문가가 될 필요 없이 본사가 실행합니다."],["채용 지원", "필요 인원과 역할부터 잡습니다. 직원 모집·면접·입사 준비를 함께 진행하고 현장 교육으로 연결합니다."],["상권 분석", "계약 전에 고객층·경쟁점·주변 뷰티 업종 매출을 분석합니다. 임대료와 운영비까지 계산해 출점 여건을 검토합니다."],["교육·운영", "상담·관리·예약·고객 응대를 교육합니다. 문을 연 이후에도 인력과 서비스, 운영 수치를 함께 점검합니다."]].map(([title, text], index) => <div key={title} data-reveal><dt><span className="support-step-number">0{index + 1}</span>{title}</dt><dd>{text}</dd></div>)}</dl><p className="editorial-support-note">점주는 고객·직원·현장을 관리합니다.<br/>광고비 부담과 지원 범위는 계약 조건에 따라 안내합니다.</p></div></section>;
}

export function FounderStatement() {
  return <section className="section editorial-founder" id="experience"><div data-reveal><span className="editorial-label">다양한 브랜드를 운영하며 쌓은 본사의 경험</span><h2>“업종은 달라도,<br/>가맹점이 돈을 버는<br/>시스템은 같습니다.”</h2><p>한식 브랜드 밥풀릭스를 론칭하고,<br/>커플릭스·화춘가든·피르메스 등<br/>다양한 브랜드를 운영하며<br/><strong>200호점 이상의 오픈 경험을 쌓았습니다.</strong></p><p>그 경험에 스칼프잇 직영 4곳에서 쌓은<br/>두피·헤드스파 운영 노하우를 더했습니다.</p></div><dl data-reveal><div><dt>스칼프잇 직영점 총투자 규모</dt><dd><CountUp value={11.6} decimals={1}/><span>억원</span></dd></div><div><dt>다양한 브랜드의 오픈 경험</dt><dd><CountUp value={200}/><span>호점 이상</span></dd></div></dl></section>;
}

export function BrandStory() {
  return <section className="editorial-brand" id="story"><div className="editorial-brand-photo" data-scroll-scene><img src="/images/apgujeong-ritual.webp" alt="스칼프잇 압구정 헤드스파 관리 공간" loading="lazy"/><span>스칼프잇 압구정</span></div><div className="editorial-brand-copy" data-reveal><span className="editorial-label">스칼프잇을 만든 이유</span><h2>고객이 다시 오고 싶은<br/>두피 관리숍을<br/>만들고 싶었습니다.</h2><p>직접 여러 두피 관리숍을 경험했습니다.<br/>길어지는 판매 상담과 관리 중 혼자 남는 시간.<br/>고객이 편하게 쉬어갈 수 있는 서비스를 만들고 싶었습니다.</p><p>필요한 상담과 끝까지 이어지는 관리.<br/>조도와 향, 수건과 베드의 편안함까지.<br/>고객이 지불한 시간에 만족할 수 있도록 설계했습니다.<br/>그 만족이 다시 방문할 이유가 된다고 믿습니다.</p><a className="editorial-text-link" href="#meeting">압구정 본점에서 직접 경험하기 <ArrowUpRight size={18}/></a></div></section>;
}

export function CostPreview({ onRequest }: { onRequest: () => void }) {
  return <div className="cost-preview-panel"><div className="cost-estimate-visual" aria-hidden="true"><div className="cost-estimate-head"><span>개설 항목</span><span>견적 안내</span></div>{["가맹·교육", "인테리어", "시설·장비", "사인·가구", "오픈 준비", "총 개설비"].map((item,i)=><div key={item}><span>{item}</span><i style={{width:`${80+i%3*23}px`}}/></div>)}</div><div className="cost-preview-overlay"><span>내 지역 · 내 예산에 맞는 개설 견적</span><h3>상세 창업비용 안내</h3><p>희망 지역과 매장 조건에 맞춰<br/>포함 항목부터 별도 비용까지 안내합니다.</p><button className="button button-cream" onClick={onRequest}>창업비용 상담 신청 <ArrowUpRight size={18}/></button><a href="tel:01099418870" className="cost-phone">전화 상담 010-9941-8870</a></div></div>;
}

export function TerritoryInvitation() {
  return <section className="section territory-section" aria-labelledby="territory-title"><div data-reveal><span className="story-kicker">함께할 가맹 파트너</span><h2 id="territory-title">아무 곳에나 오픈하지 않습니다.<br/>아무와나 계약하지 않습니다.</h2><p>우리의 목표는 더 빠르게 시장의 기준이 되는 것.<br/>그래서 상권의 수요와 운영 계획,<br/>브랜드의 서비스 기준을 지킬 의지를 함께 봅니다.</p><a href="#meeting" className="button button-wine">내 지역 출점 가능성 확인 <ArrowUpRight size={20}/></a></div><div className="territory-number" data-reveal><span>전국 가맹 모집 계획</span><strong>30<small>개점</small></strong><p>아무 곳에나, 누구에게나<br/>오픈을 권하지 않습니다.</p></div><p className="editorial-note territory-note">출점 가능 지역과 보호상권 범위는 개별 협의합니다.</p></section>;
}
