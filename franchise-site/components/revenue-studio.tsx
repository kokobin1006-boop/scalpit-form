"use client";
import { useState } from "react";
import { MotionNumber } from "@/components/scalpit-experience";
import { ArrowDown, ArrowUpRight, ChevronDown } from "lucide-react";
import { calculateEconomics, operatingModel as m } from "@/lib/franchise-economics";
const number = (n: number) => Math.round(n).toLocaleString("ko-KR");

export function RevenueStudio() {
  const [sales, setSales] = useState(7000);
  const [ticket, setTicket] = useState(11);
  const data = calculateEconomics(sales, ticket);
  const slowerMonth = calculateEconomics(sales * .8, ticket);
  const costs = [
    ["제품비", "매출의 10%", sales*m.productRate],
    ["마케팅비", "매출의 10%", sales*m.marketingRate],
    ["인건비", "테라피스트 5명 + 상담·운영 1명", data.labor],
    ["월세", "월 고정비", m.rent], ["공과금·기타", "월 고정비", m.other],
    ["로열티", "시안 가정 10%", sales*m.royaltyRate],
    ["결제수수료", "시안 가정 2%", sales*m.paymentRate],
    ["감가상각", "월 200만원 가정", m.depreciation],
  ] as const;
  return <section className="sc-economics" id="profit">
    <div className="sc-economics-heading"><div><span className="sc-eyebrow">02 / 매출을 만드는 운영, 비용을 뺀 수익</span><h2>그래서,<br/>얼마 남는데?</h2></div><p>매출을 바꿔보세요.<br/>제품비부터 인건비, 월세까지 뺀<br/>영업이익이 함께 바뀝니다.</p></div>
    <div className="sc-scenario-bar"><span>월매출을 바꿔보세요 <small>운영 조건을 가정한 계산</small></span><div role="group" aria-label="가정 월매출 선택">{[3500,5000,7000].map(value=><button key={value} type="button" aria-pressed={sales===value} onClick={()=>setSales(value)}>{number(value)}<small>만원</small></button>)}</div></div>
    <div className="sc-profit-spread"><div className="sc-profit-main" aria-live="polite"><span>가정 월 영업이익</span><strong><MotionNumber value={data.profit}/><small>만원</small></strong><b>영업이익률 <MotionNumber value={data.margin} decimals={1}/>%</b><p className="sc-profit-bridge">객단가 {ticket}만원 · 하루 약 {data.dailyCustomers.toFixed(1)}건 · 월 {m.operatingDays}일 가정</p><p>비용 8개 항목을 모두 차감한 금액.<br/>소득·법인세와 대출이자 차감 전입니다.</p><a href="#apply">내 조건으로 수익 구조 확인 <ArrowUpRight/></a></div><div className="sc-cost-sheet"><div className="sc-sheet-label"><span>MONTHLY OPERATING MODEL</span><b>단위 · 만원</b></div><div className="sc-ledger-total"><span>서비스 매출</span><strong>{number(sales)}</strong></div>{costs.map(([name,note,value])=><div key={name}><span>{name}<small>{note}</small></span><b>− {number(value)}</b></div>)}<div className="sc-ledger-total"><span>영업이익</span><strong>{number(data.profit)}</strong></div></div></div>
    <div className="sc-slower-month" aria-live="polite"><div><span>잘되는 달만 계산하지 않습니다</span><h3>매출이 20% 줄어도<br/>운영할 수 있을까요?</h3></div><dl><div><dt>줄어든 가정 월매출</dt><dd>{number(sales*.8)}<small>만원</small></dd></div><div><dt>같은 인원·월세 기준 영업이익</dt><dd>{number(slowerMonth.profit)}<small>만원</small></dd></div></dl><p>{slowerMonth.profit > 0 ? "이 가정에서는 흑자입니다. 대출 상환과 세금, 초기 비용까지 뺀 현금 흐름도 별도로 확인해야 합니다." : "이 가정에서는 적자입니다. 필요한 운영자금과 비용 구조를 다시 검토해야 합니다."} 손익분기 월매출은 약 {number(data.breakEven)}만원입니다.</p></div>
    <details className="sc-operation-math"><summary><span>이 매출에 필요한 고객 수·인원·운영자금</span><ChevronDown/></summary>
    <div className="sc-revenue-route">
      <div><span>가정 객단가</span><label><select value={ticket} onChange={e=>setTicket(Number(e.target.value))} aria-label="가정 객단가">{[9,11,13,14.5].map(value=><option key={value} value={value}>{value}만원</option>)}</select><ChevronDown/></label><small>서비스 이용 1건 기준</small></div><b>×</b>
      <div><span>하루 필요한 이용량</span><strong>{data.dailyCustomers.toFixed(1)}<small>건</small></strong><small>월 약 {number(data.customers)}건</small></div><b>×</b>
      <div><span>월 영업일</span><strong>{m.operatingDays}<small>일</small></strong><small>동일 조건으로 계산</small></div><b>=</b>
      <div><span>가정 월 서비스 매출</span><strong>{number(sales)}<small>만원</small></strong><small>신규 회원권 판매·점판 제외</small></div>
    </div>
    <div className="sc-capacity"><div><span>이 이용량을 소화하려면</span><strong>베드 5개 · 테라피스트 5명 · 상담·운영 1명</strong><p>1인당 하루 6건 × 월 26일 = 월 최대 {data.monthlyCapacity}건 가정.<br/>예약 90분, 일 10시간 운영 기준으로 준비·휴게 시간을 함께 검토합니다.</p></div><div><span>가정 수용량 대비 이용량</span><strong>{data.utilization.toFixed(1)}<small>%</small></strong><div className="sc-capacity-bar" role="img" aria-label={`수용량 대비 ${data.utilization.toFixed(1)}퍼센트`}><i style={{width:`${Math.min(data.utilization,100)}%`}}/></div>{data.utilization>100&&<b className="sc-capacity-warning">현재 인력·베드 가정으로는 수용량이 부족합니다.</b>}</div></div>
    <div className="sc-downside"><div><span>손익분기 월매출</span><strong>{number(data.breakEven)}<small>만원</small></strong><p>같은 인원·비용을 유지할 때의 계산.<br/>현재 객단가 기준 하루 약 {(data.breakEven/ticket/m.operatingDays).toFixed(1)}건입니다.</p></div><div><span>오픈 후 운영자금도 따로 봅니다</span><strong>{number(data.reserveThreeMonths)}<small>만원</small></strong><p>매출 없이 3개월간 인건비·월세·기타 고정 지출을 충당하는 가정. 광고·제품 선지출 등은 별도입니다.</p></div></div>
    </details>
    <details className="sc-model-notes"><summary>계산 조건·투자금 회수 시뮬레이션 <ChevronDown/></summary><p>실제 지점 성과가 아닌 기획용 가정 계산입니다. 객단가와 매출·비용은 부가세 제외 기준이며, 인건비는 사업주 부담 등을 포함해 테라피스트 1인 월 300만원, 상담·운영 1인 월 350만원으로 가정했습니다. 5명은 일일 배치 인원 기준이며, 휴무·휴게·결원에 따른 추가 인원과 점주 참여 비용은 개별 검토해야 합니다. 로열티 등은 확정 계약 조건이 아닙니다.</p><div className="sc-payback">{[{name:"동탄형",investment:14000},{name:"천안형",investment:22000}].map(item=><div key={item.name}><span>{item.name} · 투자금 {(item.investment/10000).toFixed(1)}억원 가정</span><strong>{data.profit>0 ? `약 ${(item.investment/data.profit).toFixed(1)}개월` : "회수 계산 불가"}</strong><p>현재 선택한 월 영업이익을 적용한 단순 나눗셈</p></div>)}</div><p>회수 기간은 실제 지점의 회수 실적이 아닙니다. 감가상각·세금·대출 상환·회원권 판매와 소진·초기 적자·추가 투자를 반영하는 실제 현금 회수 기간은 별도로 계산해야 합니다. 위 수치는 매출이나 수익을 보장하지 않습니다.</p></details>
    <div className="sc-next"><span>이 객단가를 만드는 서비스는?</span><a href="#courses">실제 관리 영상 보기 <ArrowDown/></a></div>
  </section>;
}
