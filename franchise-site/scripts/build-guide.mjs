// 가맹 안내서(PDF) 생성기.
//   사용: node scripts/build-guide.mjs [출력경로]
//   필요: node 22.18+ (TS 직접 import), playwright-core 와 크로미움(PLAYWRIGHT_BROWSERS_PATH 또는 CHROMIUM_PATH)
// 숫자·문구의 원본은 lib/franchise-terms.ts 와 lib/franchise-economics.ts 입니다.
// TERMS_VERIFIED=false 인 동안은 모든 쪽에 "시안" 표시가 들어갑니다.
import { chromium } from "playwright-core";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(process.argv[2] ?? path.join(root, "public/guide/scalpit-franchise-guide.pdf"));
const terms = await import(pathToFileURL(path.join(root, "lib/franchise-terms.ts")).href);
const econ = await import(pathToFileURL(path.join(root, "lib/franchise-economics.ts")).href);
const { TERMS_VERIFIED, startupModels, modelTotal, excludedCosts, costBasis, contractTerms, processSteps, siteSpecs, academyStats, talentSteps, visitSlots } = terms;
const draft = TERMS_VERIFIED ? "" : "시안";
const won = (n) => Math.round(n).toLocaleString("ko-KR");
const e = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const fileUrl = (p) => pathToFileURL(path.join(root, p)).href;

const stores = [["동탄", "27평", "1억 4천만원"], ["천안", "30평", "2억 2천만원"], ["광교", "50평", "3억원"], ["압구정", "65평", "5억원"]];
const scenarios = [3500, 5000, 7000].map((sales) => ({ sales, ...econ.calculateEconomics(sales) }));
const faq = [
  ["가맹비와 로열티는 얼마인가요?", `${startupModels[1].name} 기준 가맹비 ${won(startupModels[1].lines[0].amount)}만원, 교육비 ${won(startupModels[1].lines[1].amount)}만원이며 로열티는 월 매출의 10%입니다. 확정 금액은 정보공개서와 계약서로 안내하며, 정보공개서를 받은 날부터 14일이 지나야 계약과 가맹금 수령이 가능합니다.`],
  ["상담을 신청하면 계속 영업 전화가 오나요?", "신청 내용은 가맹 상담 목적으로만 사용합니다. 희망 지역·예산·운영 계획을 확인하는 연락을 드리며, 계약을 서두르지 않습니다. 비교 중이라고 말씀해 주셔도 괜찮습니다."],
  ["다른 일을 하면서 맡겨두고 운영할 수 있나요?", "초기 3~6개월은 점주의 현장 참여를 권장합니다. 상주가 어렵다면 매장 운영 책임자를 먼저 정하고, 해당 인건비를 포함해 손익을 다시 계산해야 합니다. 본사 지원만으로 매장이 자동 운영되는 구조는 아닙니다."],
  ["직원이 갑자기 그만두면 어떻게 하나요?", "본사와 채용·교육 계획을 다시 잡고, 매장은 현재 인원으로 소화할 수 있는 예약과 근무표를 조정합니다. 즉시 대체 인력을 보장하는 것은 아니므로 채용 기간과 예비 인건비도 함께 검토합니다."],
  ["광고는 직접 해준다는데, 비용도 무료인가요?", "ZERO는 점주님이 직접 광고를 제작하고 집행하는 실무 부담을 말합니다. 광고 매체비·체험 비용 등은 별도로 확인합니다. 손익 계산의 마케팅비 10%는 계산 가정입니다."],
  ["이 안내서의 수익이 제 매장에서도 그대로 나오나요?", "아닙니다. 수익 계산은 검토용 가정입니다. 내 임대료·인원·운영 참여·대출 조건으로 다시 계산해야 합니다. 높은 매출보다 손익분기점과 초기 운영자금을 먼저 확인하세요."],
];

const footer = (n) => `<footer><span>${draft ? `<b class="draft">${draft}</b>` : ""}확정 조건은 정보공개서·계약서가 우선합니다. 수익을 보장하지 않습니다.</span><span>SCÁLPIT · ${n}</span></footer>`;
const page = (cls, inner, n) => `<section class="page ${cls}">${inner}${footer(n)}</section>`;

const modelTable = `<table class="costs"><thead><tr><th>항목</th>${startupModels.map((m) => `<th>${e(m.key)}<small>${e(m.tier)}</small></th>`).join("")}</tr></thead><tbody>${startupModels[0].lines.map((l, i) => `<tr><th>${e(l.label)}</th>${startupModels.map((m) => `<td>${won(m.lines[i].amount)}</td>`).join("")}</tr>`).join("")}<tr class="sum"><th>합계(만원)</th>${startupModels.map((m) => `<td>${won(modelTotal(m))}</td>`).join("")}</tr><tr class="size"><th>권장 규모</th>${startupModels.map((m) => `<td>${e(m.size)}</td>`).join("")}</tr></tbody></table>`;

const pages = [
  page("cover", `<div class="cover-top"><img src="${fileUrl("public/brand/scalpit-wordmark.jpg")}" alt="Scálpit"></div><div class="cover-main"><p class="kicker">헤드스파 · 두피관리 프랜차이즈</p><h1>가맹 안내서</h1><p class="lead">1년 만에, 직영 4개.<br>본사가 먼저 해본 운영 기준과 비용, 계약 전 순서를 한 권으로 정리했습니다.</p></div><div class="cover-bottom"><div><b>동탄 · 천안 · 광교 · 압구정</b><span>직영 4개점 운영 · 전국 30개점 가맹 모집</span></div><div><b>가맹 상담 010-9941-8870</b><span>상담 신청은 가맹 계약이 아닙니다.</span></div></div>${draft ? `<div class="stamp">${draft} · SAMPLE</div>` : ""}`, "표지"),

  page("", `<h2><span>01</span>스칼프잇은 이렇게 운영합니다</h2><p class="intro">본사가 먼저 투자하고 직접 운영한 네 개의 매장에서 가맹 운영 기준이 나왔습니다.</p>
  <table class="plain"><thead><tr><th>직영점</th><th>규모</th><th>투자 규모</th></tr></thead><tbody>${stores.map(([n, a, i]) => `<tr><th>${n}</th><td>${a}</td><td>${i}</td></tr>`).join("")}</tbody></table>
  <h3>본사가 하는 일 / 점주님이 하는 일</h3>
  <table class="plain split"><thead><tr><th>업무</th><th>본사</th><th>점주님·매장</th></tr></thead><tbody>
  <tr><th>고객 유입</th><td>콘텐츠 제작 · 광고 집행 · 검색 정보 관리</td><td>예약 가능 시간 공유 · 문의 응대 · 방문 기록</td></tr>
  <tr><th>채용·교육</th><td>필요 인원 검토 · 모집·면접 준비 · 직무 교육</td><td>채용 결정 · 근무표 · 현장 피드백</td></tr>
  <tr><th>서비스 품질</th><td>관리 순서 · 상담 기준 · 정기 교육</td><td>고객 컨디션 확인 · 위생 · 관리 품질 점검</td></tr>
  <tr><th>매출·비용</th><td>지표 검토 · 원인 분석 · 개선 과제 협의</td><td>매출·비용 입력 · 재고 · 현장 실행</td></tr></tbody></table>
  <p class="note">광고 실무는 본사가 담당하지만 광고 매체비는 별도입니다. 본사 지원이 현장 운영자를 대신하는 구조는 아닙니다.</p>`, "02"),

  page("", `<h2><span>02</span>창업 비용, 항목별로 펼쳐 놓습니다</h2><p class="intro">${e(costBasis)}. 단위: 만원.</p>${modelTable}
  <h3>이 표에 없는 돈</h3><ul class="out">${excludedCosts.map((c) => `<li><b>${e(c.label)}${c.refundable ? "<i>환급</i>" : ""}</b>${e(c.note)}</li>`).join("")}</ul>
  <p class="note">그래서 점포부터 계약하지 않고, 위 표와 별도 비용을 합친 총예산을 먼저 맞춥니다.</p>`, "03"),

  page("", `<h2><span>03</span>매달 나가는 돈, 그리고 계약 조건</h2><div class="grid3">${contractTerms.map((t) => `<div class="card"><span>${e(t.label)}</span><strong>${e(t.value)}</strong><p>${e(t.note)}</p></div>`).join("")}</div>
  <h3>손익은 이렇게 계산합니다 <small>(가정 · 직영 실적이 아닙니다)</small></h3>
  <table class="plain num"><thead><tr><th>가정 월매출(만원)</th>${scenarios.map((s) => `<th>${won(s.sales)}</th>`).join("")}</tr></thead><tbody>
  <tr><th>가정 월 영업이익(만원)</th>${scenarios.map((s) => `<td class="${s.profit < 0 ? "neg" : ""}">${won(s.profit)}</td>`).join("")}</tr>
  <tr><th>영업이익률</th>${scenarios.map((s) => `<td>${s.margin.toFixed(1)}%</td>`).join("")}</tr></tbody></table>
  <p class="note">손익분기 월매출 약 ${won(scenarios[0].breakEven)}만원. 제품비 10%·마케팅비 10%·로열티 10%·결제수수료 2%, 월 고정비 ${won(scenarios[0].fixed)}만원(테라피스트 5명+상담·운영 1명 인건비 포함)을 가정했습니다. 소득세·법인세와 대출이자 차감 전이며, 내 임대료·인원·운영 참여로 다시 계산해야 합니다.</p>`, "04"),

  page("", `<h2><span>04</span>계약 전, 이 순서를 지킵니다</h2><p class="intro">상담받았다고 바로 계약하지 않습니다. 어느 단계에서든 멈추셔도 됩니다.</p><ol class="steps">${processSteps.map((s) => `<li><b>${s.n}</b><div><strong>${e(s.t)}</strong><em>${e(s.days)}</em><i>${e(s.phase)}</i><p><u>본사</u>${e(s.hq)}</p><p><u>점주</u>${e(s.owner)}</p></div></li>`).join("")}</ol><p class="note">계약 후 오픈까지 약 10~12주(점포 확보 이후 설계·공사·채용·교육 병행 기준). 정보공개서를 받은 날부터 14일이 지나야 계약과 가맹금 수령이 가능합니다.</p>`, "05"),

  page("", `<h2><span>05</span>교육과 인력, 출점 기준</h2>
  <div class="stats">${academyStats.map((s) => `<div><strong>${e(s.value)}</strong><span>${e(s.label)}</span></div>`).join("")}</div>
  <h3>테라피스트가 그만둬도 흔들리지 않게</h3><ol class="talent">${talentSteps.map((t) => `<li><b>${t.n}</b><div><strong>${e(t.t)}</strong><p>${e(t.d)}</p></div></li>`).join("")}</ol>
  <h3>출점 검토 기준</h3><table class="plain spec"><tbody>${siteSpecs.map((s) => `<tr><th>${e(s.label)}</th><td><strong>${e(s.value)}</strong> ${e(s.note)}</td></tr>`).join("")}</tbody></table>`, "06"),

  page("", `<h2><span>06</span>결정 전에 남는 질문</h2><div class="faq">${faq.map(([q, a]) => `<div><strong>${e(q)}</strong><p>${e(a)}</p></div>`).join("")}</div>
  <div class="cta"><b>직영점 방문(1:1 창업 코칭)</b><p>희망 시간대 ${visitSlots.map((v) => e(v.label)).join(" · ")}${draft ? " (시안)" : ""}<br>가맹 상담 010-9941-8870 · 상담 신청은 가맹 계약이 아니며 수익을 보장하는 안내도 아닙니다.</p></div>`, "07"),
];

const css = `
@page{size:A4;margin:0}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font-family:"Pretendard Variable","Apple SD Gothic Neo","Noto Sans KR",sans-serif;color:#2c2120;font-size:10.2pt;line-height:1.65;word-break:keep-all}
.page{width:210mm;height:297mm;padding:17mm 18mm 20mm;position:relative;page-break-after:always;overflow:hidden;background:#fbf8f3}
.page:last-child{page-break-after:auto}
h2{font-size:19pt;letter-spacing:-.04em;margin:0 0 6mm;color:#641522;display:flex;align-items:baseline;gap:10px;line-height:1.3}
h2 span{font:400 13pt Georgia,serif;color:#b9856d}
h3{font-size:11.5pt;letter-spacing:-.03em;margin:7mm 0 3mm}
h3 small{font-weight:400;color:#78665e;font-size:8.5pt}
.intro{margin:0 0 5mm;color:#5c4d47}
.note{margin:4mm 0 0;font-size:8.8pt;color:#6b5d56;line-height:1.7;border-left:2px solid #641522;padding-left:3mm}
table{width:100%;border-collapse:collapse;font-size:9.4pt}
th,td{padding:2.2mm 2.5mm;border-bottom:.3mm solid #d9c9bf;text-align:left;vertical-align:top}
thead th{font-size:8.6pt;color:#78665e;border-bottom:.5mm solid #2c2120}
tbody th{font-weight:600;white-space:nowrap}
.costs th small{display:block;font-weight:400;font-size:7.5pt}
.costs td,.num td,.num thead th:not(:first-child){text-align:right;font-variant-numeric:tabular-nums}
.costs thead th:not(:first-child){text-align:right}
.costs .sum th,.costs .sum td{font-size:11pt;color:#641522;border-top:.5mm solid #2c2120;border-bottom:.5mm solid #2c2120;font-weight:700}
.costs .size td{color:#78665e;font-size:8.6pt}
.neg{color:#b02b37}
.split td{width:36%}
.out{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:0 6mm}
.out li{padding:2.2mm 0;border-bottom:.3mm solid #e3d6cb;font-size:9pt;color:#5c4d47}
.out b{display:block;color:#2c2120;font-size:9.6pt}
.out i{font-style:normal;margin-left:6px;background:#641522;color:#fff;font-size:7pt;padding:0 5px;vertical-align:1px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}
.card{background:#fff;border:.3mm solid #d9c9bf;padding:3.5mm 4mm}
.card span{font-size:8.4pt;font-weight:600;color:#641522}
.card strong{display:block;font-size:11.2pt;margin:1mm 0 1.5mm;letter-spacing:-.03em;line-height:1.4}
.card p{margin:0;font-size:8.2pt;color:#6b5d56;line-height:1.6}
.steps{list-style:none;margin:0;padding:0;border-top:.5mm solid #2c2120}
.steps li{display:grid;grid-template-columns:11mm 1fr;padding:3mm 0;border-bottom:.3mm solid #d9c9bf}
.steps b{font:400 14pt Georgia,serif;color:#641522}
.steps strong{font-size:10.6pt;margin-right:8px}
.steps em{font-style:normal;font-size:8.6pt;font-weight:600;color:#641522}
.steps i{float:right;font-style:normal;font-size:7.4pt;border:.3mm solid #b9a89b;padding:0 5px;color:#6b5d56}
.steps p{margin:1mm 0 0;font-size:8.8pt;color:#4a3c36;line-height:1.6}
.steps u{text-decoration:none;display:inline-block;width:9mm;font-size:7.8pt;font-weight:600;color:#85766e}
.stats{display:grid;grid-template-columns:repeat(4,1fr);border-top:.5mm solid #641522;border-bottom:.3mm solid #d9c9bf}
.stats div{padding:3mm 3mm;border-right:.3mm solid #d9c9bf}
.stats div:last-child{border:0}
.stats strong{display:block;font:400 14pt Georgia,serif;color:#641522;line-height:1.3}
.stats span{font-size:7.8pt;color:#6b5d56;line-height:1.5;display:block}
.talent{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:0 6mm}
.talent li{display:grid;grid-template-columns:8mm 1fr;padding:2.2mm 0;border-bottom:.3mm solid #e3d6cb}
.talent b{font:400 11pt Georgia,serif;color:#b9856d}
.talent strong{font-size:9.6pt}
.talent p{margin:0;font-size:8.2pt;color:#6b5d56;line-height:1.55}
.spec th{width:24mm;color:#641522;font-size:8.8pt}
.spec td{font-size:8.6pt;color:#6b5d56}
.spec td strong{color:#2c2120;margin-right:6px}
.faq div{padding:3mm 0;border-bottom:.3mm solid #d9c9bf}
.faq strong{font-size:10.4pt;color:#641522}
.faq p{margin:1mm 0 0;font-size:9pt;color:#4a3c36;line-height:1.7}
.cta{margin-top:8mm;background:#641522;color:#fff;padding:5mm 6mm}
.cta b{font-size:12pt}
.cta p{margin:1.5mm 0 0;font-size:9pt;color:#ecd6d0;line-height:1.7}
footer{position:absolute;left:18mm;right:18mm;bottom:9mm;display:flex;justify-content:space-between;font-size:7.4pt;color:#85766e;border-top:.3mm solid #d9c9bf;padding-top:2.5mm}
.draft{display:inline-block;margin-right:6px;padding:0 6px;background:#b8946f;color:#fff;font-weight:600;letter-spacing:.08em}
.cover{background:#641522;color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:22mm 20mm}
.cover footer{display:none}
.cover-top img{width:56mm;background:#fff;padding:3mm 5mm}
.kicker{font-size:11pt;letter-spacing:.14em;color:#e6c79f;margin:0 0 8mm}
.cover h1{font-size:46pt;letter-spacing:-.05em;line-height:1.15;margin:0 0 8mm;font-weight:700}
.lead{font-size:13pt;line-height:1.8;color:#f3e3dc;margin:0}
.cover-bottom{display:flex;justify-content:space-between;gap:10mm;border-top:.3mm solid #ffffff55;padding-top:6mm}
.cover-bottom b{display:block;font-size:11pt}
.cover-bottom span{font-size:8.6pt;color:#e0c7c0}
.stamp{position:absolute;right:20mm;top:22mm;border:.6mm solid #e6c79f;color:#e6c79f;padding:2mm 5mm;font-weight:700;letter-spacing:.12em;font-size:10pt;transform:rotate(4deg)}
`;

const htmlDoc = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>스칼프잇 가맹 안내서</title><link rel="stylesheet" href="${fileUrl("public/fonts/pretendard/pretendardvariable-dynamic-subset.css")}"><style>${css}</style></head><body>${pages.join("")}</body></html>`;

fs.mkdirSync(path.dirname(out), { recursive: true });
const tmp = path.join(path.dirname(out), ".guide-build.html");
fs.writeFileSync(tmp, htmlDoc);
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium", args: ["--no-sandbox", "--allow-file-access-from-files"] });
const tab = await browser.newPage();
await tab.goto(pathToFileURL(tmp).href);
await tab.evaluate(() => document.fonts.ready);
await tab.waitForTimeout(1200);
await tab.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
fs.rmSync(tmp);
console.log("wrote", out);
