"use client";

import { ArrowUpRight, Phone } from "lucide-react";

export function HeadquartersCapabilities() {
  const items = [
    ["SEARCH", "검색에서\n예약까지", "네이버 플레이스", "매장 정보·프로그램·사진·예약 경로를 정비하고, 지역 고객이 비교하고 선택할 근거를 준비합니다."],
    ["CONTENTS", "보고 싶게.\n와보고 싶게.", "브랜드·인플루언서 콘텐츠", "공간과 관리 장면, 고객의 방문 이유를 콘텐츠로 기획합니다. 헤드스파를 몰랐던 고객에게도 매장을 알립니다."],
    ["ADS", "우리 지역에\n집중하는 광고", "메타·지역 광고", "상권과 고객층에 맞춰 소재와 예산을 운영합니다. 광고를 켜는 일부터 반응을 보고 개선하는 일까지 본사가 실행합니다."],
    ["PEOPLE", "직원을 뽑고,\n팀을 만드는 일", "채용·교육 지원", "필요 인원과 역할을 정하고 모집·면접을 지원합니다. 상담·관리·고객 응대 교육으로 첫 서비스를 준비합니다."],
    ["OPERATIONS", "처음이어도\n기준은 분명하게", "현장 운영 기준", "예약 확인, 상담, 관리, 마무리 안내. 직원마다 달라지기 쉬운 서비스의 흐름을 함께 맞춥니다."],
    ["NUMBERS", "매출 다음은\n남는 돈까지", "운영 수치 점검", "고객 수·객단가·인건비·광고비를 함께 봅니다. 빈 예약 시간을 채우고 비용 구조를 개선할 방향을 찾습니다."],
  ];
  return <div className="hq-capabilities" aria-labelledby="hq-capabilities-title"><div className="hq-capabilities-heading" data-reveal><span className="story-kicker">점주님이 직접 배울 일을 줄입니다</span><h3 id="hq-capabilities-title">마케팅부터 매장 운영까지.<br/><em>실행하는 본사가 있습니다.</em></h3></div><div className="hq-capability-grid">{items.map(([en,title,label,copy],i)=><article key={en} data-reveal><span className="hq-card-index">0{i+1} / {en}</span><h4>{title.split('\n').map((line,j)=><span key={j}>{line}</span>)}</h4><strong>{label}</strong><p>{copy}</p></article>)}</div></div>;
}

export function OpeningRoadmap() {
  const steps = [
    ["상담·본점 체험", "운영할 브랜드부터 경험", "압구정 본점에서 공간과 프로그램을 경험하고, 예산과 운영 참여 계획을 이야기합니다."],
    ["상권·점포 검토", "계약 전에 숫자로 검토", "지역 고객층, 경쟁 매장, 주변 뷰티 업종의 매출과 임대료를 검토합니다."],
    ["개설 조건 협의", "비용과 역할을 명확하게", "개설 견적, 지원 범위, 운영 조건을 확인하고 함께할 파트너인지 판단합니다."],
    ["공간·시설 준비", "관리하기 좋은 매장으로", "관리실, 상담 공간, 급배수와 고객·직원 동선을 점포 조건에 맞춰 준비합니다."],
    ["직원 채용", "우리 매장에 맞는 팀 구성", "필요 인원과 역할을 정하고 모집·면접·입사 준비를 본사가 함께 지원합니다."],
    ["교육·오픈 점검", "첫 고객을 맞을 준비", "상담·관리·응대·예약 운영을 익히고, 현장에서 서비스 흐름을 점검합니다."],
    ["오픈·지역 마케팅", "문을 열고, 고객에게 알리기", "매장 정보와 콘텐츠, 지역 광고를 연결하고 고객이 예약할 경로를 준비합니다."],
    ["운영·개선", "문을 연 다음까지 함께", "광고 반응, 예약 흐름, 직원과 서비스 이슈를 확인하고 운영 개선 방향을 함께 잡습니다."],
  ];
  return <section className="section opening-roadmap" id="education" aria-labelledby="roadmap-title"><div className="roadmap-heading" data-reveal><span className="story-kicker">스칼프잇 창업 프로세스</span><h2 id="roadmap-title">계약이 끝이 아닙니다.<br/><em>매장의 시작을 함께합니다.</em></h2><p>입지·공간·직원·교육·첫 광고.<br/>준비할 일을 순서대로, 본사와 함께.</p></div><ol className="roadmap-grid">{steps.map(([title,result,copy],i)=><li key={title} data-reveal><span className="roadmap-number">{String(i+1).padStart(2,'0')}</span><span className="roadmap-phase">{i<3?'오픈을 결정하기 전':i<6?'매장을 준비하는 과정':i===6?'고객을 만나는 순간':'오픈 이후'}</span><h3>{title}</h3><strong>{result}</strong><p>{copy}</p></li>)}</ol><div className="roadmap-close"><strong>처음 창업이어도,<br/>모든 일을 처음부터 혼자 알아낼 필요는 없습니다.</strong><a className="button button-wine" href="#meeting">내 창업 준비 상담하기 <ArrowUpRight size={18}/></a></div></section>;
}

export function InteriorShowcase() {
  return <section className="interior-showcase" id="difference" aria-labelledby="interior-title"><div className="section interior-heading" data-reveal><span className="story-kicker">공간에서 시작되는 브랜드의 선택</span><h2 id="interior-title">사진 한 장에 끌리고.<br/><em>경험한 뒤 다시 찾도록.</em></h2><p>광교와 압구정에서 만나는 스칼프잇.<br/>고객이 찾아오고 싶고, 점주가 운영하고 싶은 매장.</p></div><div className="interior-pair"><figure data-reveal><img src="/images/apgujeong-reception.webp" alt="스칼프잇 압구정 본점 리셉션 인테리어" loading="lazy"/><figcaption><span>APGUJEONG · 65평</span><h3>압구정 본점</h3><p>스칼프잇의 공간과 서비스를 직접 경험하는 곳.</p><a href="https://www.instagram.com/reel/Dda0Fujq_AA/" target="_blank" rel="noreferrer">압구정 공간 영상 <ArrowUpRight size={18}/></a></figcaption></figure><figure data-reveal><img src="/images/gwanggyo.webp" alt="스칼프잇 광교점 인테리어" loading="lazy"/><figcaption><span>GWANGGYO · 50평</span><h3>광교점</h3><p>우리 지역에서도 찾아오고 싶은 프리미엄 두피 공간.</p><a href="https://www.instagram.com/reel/Ddaz5P9qumT/" target="_blank" rel="noreferrer">광교 공간 영상 <ArrowUpRight size={18}/></a></figcaption></figure></div><div className="section service-standard"><div className="service-standard-photo"><img src="/images/apgujeong-ritual.webp" alt="스칼프잇 압구정의 헤드스파 관리 공간" loading="lazy"/></div><div data-reveal><span className="story-kicker">고객이 지불한 시간에 집중하는 관리</span><h3>관리의 중심은 기계가 아닌,<br/><em>고객에게 집중하는 손길.</em></h3><p>상담부터 수기 중심 관리, 마무리 안내까지.<br/>두피 케어와 휴식이 하나의 경험으로 이어지도록<br/>프로그램과 직원 교육을 함께 설계했습니다.</p><dl><div><dt>두피 케어</dt><dd>고객의 고민과 방문 목적을 살피는 상담</dd></div><div><dt>수기 중심 관리</dt><dd>관리 과정에서 고객에게 집중하는 서비스</dd></div><div><dt>다음 방문</dt><dd>오늘의 경험이 다시 찾을 이유가 되도록</dd></div></dl><a href="#visit" className="editorial-text-link">본점에서 직접 경험하기 <ArrowUpRight size={18}/></a></div></div></section>;
}

export function DesktopConsultationBar() {
  return <aside className="desktop-consultation-bar" aria-label="빠른 창업 상담"><a href="tel:01099418870" className="consultation-bar-phone"><Phone size={23}/><span>스칼프잇 가맹 문의<strong>010-9941-8870</strong></span></a><p>지역·예산이 정해지지 않아도 상담 가능합니다.</p><a href="#meeting" className="button button-cream">지역·예산별 창업 상담 <ArrowUpRight size={18}/></a></aside>;
}
