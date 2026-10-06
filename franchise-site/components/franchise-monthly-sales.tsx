"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Amounts are in KRW 10,000. Cheonan keeps owner-supplied records.
// Dongtan: explicit design simulation requested on 2026-09-22, not historical evidence.
// Previously supplied actual anchors: 2025.07=2800, 2025.08=3900.
// Ambiguous 50222 / 42900 remain unused as actual records.
const branches = [
  {
    id: "cheonan", name: "천안", demo: false, opened: "2025년 12월 오픈",
    period: "2025.12–2026.06 · 7개월",
    months: ["25.12", "26.01", "26.02", "26.03", "26.04", "26.05", "26.06"],
    sales: [3000, 4200, 4500, 5600, 6300, 7200, 4900],
  },
  {
    id: "dongtan", name: "동탄", demo: true, opened: "2025년 7월 오픈",
    period: "2025.08–2026.08 · 13개월",
    months: ["25.08", "25.09", "25.10", "25.11", "25.12", "26.01", "26.02", "26.03", "26.04", "26.05", "26.06", "26.07", "26.08"],
    sales: [3900, 4287, 4668, 5143, 5526, 4982, 5718, 6184, 5837, 6742, 7148, 6389, 6827],
  },
];

const format = (value: number) => value.toLocaleString("ko-KR");
const chartMax = 8000;

export function MonthlySales() {
  return <section className="section monthly-sales" id="monthly-sales" aria-labelledby="monthly-sales-title">
    <div className="monthly-heading" data-reveal>
      <div><span className="story-kicker">한 달의 숫자를 넘어, 월별 흐름으로</span><h2 id="monthly-sales-title">월별 매출 공개.</h2></div>
      <p>천안·동탄 직영점의<br/>오픈 이후 매출 흐름을 확인하세요.</p>
    </div>
    <Tabs defaultValue="dongtan" className="monthly-tabs">
      <TabsList className="monthly-tab-list" aria-label="월별 매출 지점 선택">
        {branches.map(branch => <TabsTrigger key={branch.id} value={branch.id}>{branch.name} 직영점</TabsTrigger>)}
      </TabsList>
      {branches.map(branch => {
        const average = branch.sales.reduce((sum, value) => sum + value, 0) / branch.sales.length;
        const isCheonan = branch.id === "cheonan";
        const headline = Math.round(average);
        return <TabsContent key={branch.id} value={branch.id} className={`monthly-panel${branch.demo ? " monthly-panel-long" : ""}`}>
          <div className="monthly-result">
            <span className="monthly-opened">{branch.opened}</span>
            {branch.demo && <span className="monthly-demo-badge">그래프 시안 · 예시 데이터</span>}
            <h3>{branch.demo ? "시안 평균 월매출" : "7개월 평균 월매출"}</h3>
            <strong className="monthly-main-number">{format(headline)}<small>만원</small></strong>
            <p className="monthly-period">{branch.period}</p>
            <dl className="monthly-summary">
              <div><dt>{branch.demo ? "시안 시작 월 · 25.08" : "오픈 첫 달"}</dt><dd>{format(branch.sales[0])}<small>만원</small></dd></div>
              <div><dt>{branch.demo ? "시안 마지막 월 · 26.08" : "표시 기간 최고 매출"}</dt><dd>{format(branch.demo ? branch.sales.at(-1)! : Math.max(...branch.sales))}<small>만원</small></dd></div>
            </dl>
          </div>
          <figure className="monthly-chart">
            <figcaption><strong>{branch.name} 월별 매출{branch.demo && " 구성 시안"}</strong><span>단위: 만원</span></figcaption>
            {branch.demo && <p className="monthly-chart-demo">기간과 화면 구성을 검토하기 위한 예시이며 실제 매출이 아닙니다.</p>}
            <div className={branch.demo ? "monthly-chart-scroll" : ""} tabIndex={branch.demo ? 0 : undefined} role={branch.demo ? "region" : undefined} aria-label={branch.demo ? "동탄 13개월 예시 매출 그래프, 좌우로 이동" : undefined}>
            <div className="monthly-plot" aria-hidden="true">
              <div className="monthly-axis"><span>8,000</span><span>4,000</span><span>0</span></div>
              <div className="monthly-bars" style={{gridTemplateColumns:`repeat(${branch.sales.length}, minmax(0, 1fr))`}}>
                <div className="monthly-grid-line is-top"/><div className="monthly-grid-line is-middle"/>
                {isCheonan && <div className="monthly-average-line" style={{bottom:`${average/chartMax*100}%`}}/>}
                {branch.sales.map((value, index) => <div className="monthly-bar-column" key={branch.months[index]}>
                  <div className={`monthly-bar${value === Math.max(...branch.sales) ? " is-peak" : ""}`} style={{height:`${value/chartMax*100}%`}}><span className="monthly-bar-value">{format(value)}</span></div>
                  <span className="monthly-bar-month">{branch.months[index]}</span>
                </div>)}
              </div>
            </div>
            </div>
            {branch.demo && <p className="monthly-scroll-hint">좌우로 밀어 전체 기간을 확인하세요.</p>}
            <div className="monthly-chart-caption"><span><i className="monthly-sales-swatch"/>{branch.demo ? "예시 월매출" : "월매출"}</span>{isCheonan && <span><i className="monthly-average-swatch"/>7개월 평균 {format(average)}만원</span>}</div>
            <table className="sr-only"><caption>{branch.name} {branch.demo ? "예시 데이터 · 실제 실적 아님" : "월별 매출"}, 단위 만원</caption><thead><tr><th scope="col">연월</th><th scope="col">매출</th></tr></thead><tbody>{branch.months.map((month,index)=><tr key={month}><th scope="row">20{month.replace(".","년 ")}월</th><td>{format(branch.sales[index])}만원</td></tr>)}</tbody></table>
          </figure>
        </TabsContent>;
      })}
    </Tabs>
    <p className="monthly-scope">천안은 표시 기간의 직영점 매출이며, 동탄은 화면 검토용 예시 데이터입니다. 가맹점 예상 매출을 뜻하지 않습니다.</p>
  </section>;
}
