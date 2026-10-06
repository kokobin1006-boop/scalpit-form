"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const launchSeenKey = "scalpit:franchise-launch:v12";

export function LaunchPopup() {
  const [open, setOpen] = useState(false);
  const destination = useRef<string | null>(null);
  useEffect(() => {
    // One invitation per tab session, only while the visitor is still on the hero.
    try { if (sessionStorage.getItem(launchSeenKey)) return; } catch { /* Storage is optional. */ }
    const timer = window.setTimeout(() => {
      const active = document.activeElement;
      const engaging = active instanceof HTMLElement && active.matches("input,textarea,select,button,a,[role='combobox']");
      if (document.hidden || location.hash || window.scrollY > 180 || engaging || document.querySelector("[role='dialog']")) return;
      try { sessionStorage.setItem(launchSeenKey, "seen"); } catch { /* Still dismissible without storage. */ }
      setOpen(true);
    }, 3200);
    return () => window.clearTimeout(timer);
  }, []);
  function changeOpen(value: boolean) {
    try { sessionStorage.setItem(launchSeenKey, "seen"); } catch { /* Device-local preference only. */ }
    setOpen(value);
  }
  function goTo(id: string) { destination.current = id; changeOpen(false); }
  return <Dialog open={open} onOpenChange={changeOpen}>
    <DialogTrigger className="launch-trigger">가맹 모집 시작 · 전국 30개점 <ArrowUpRight size={15}/></DialogTrigger>
    <DialogContent className="franchise-launch-dialog" showCloseButton={false} onCloseAutoFocus={event => {
      const id = destination.current;
      if (!id) return;
      event.preventDefault(); destination.current = null;
      const section = document.getElementById(id);
      section?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
      const heading = section?.querySelector("h2");
      if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({preventScroll:true}); }
    }}>
      <button className="launch-close" onClick={()=>changeOpen(false)} aria-label="가맹 모집 팝업 닫기"><X size={23}/></button>
      <div className="launch-visual"><img src="/images/dongtan.webp" alt="스칼프잇 동탄 직영점"/><span className="launch-brand-symbol"><img src="/brand/scalpit-symbol.jpg" alt="스칼프잇 심볼" width="890" height="890"/></span><b>이제,<br/>점주님과 함께.</b><small>동탄 직영점</small></div>
      <div className="launch-offer"><span className="story-kicker">“스칼프잇은 가맹 안 하나요?”</span><DialogTitle>스칼프잇 가맹 시작.<br/>전국 단 30개점.</DialogTitle><DialogDescription>더 빠르게 시장의 기준이 되기 위해.<br/>같은 기준을 지킬 파트너와 함께합니다.</DialogDescription><div className="launch-revenue"><span>동탄 27평 · 월매출 사례</span><strong>7,200<small>만원</small></strong></div><p className="launch-scope">직영점 사례이며 가맹점의 예상 매출은 아닙니다.</p><button className="button conversion-primary" onClick={()=>goTo("models")}>내 예산으로 시작하기 <ArrowRight size={20}/></button><button className="launch-secondary" onClick={()=>goTo("sales")}>직영점 실적 먼저 보기 <ArrowUpRight size={16}/></button><button className="launch-dismiss" onClick={()=>changeOpen(false)}>닫고 홈페이지 보기</button></div>
    </DialogContent>
  </Dialog>;
}

export function ProofStrip() {
  return <div className="proof-strip" aria-label="스칼프잇 사업 근거">
    <div><strong>4<small>개 직영점</small></strong><span>동탄 · 천안 · 광교 · 압구정</span></div>
    <div><strong>11.6<small>억원</small></strong><span>직영점 총투자 규모</span></div>
    <div><strong>200<small>호점</small></strong><span>본사의 프랜차이즈 오픈 경험</span></div>
    <div><strong>1<small>위</small></strong><span>압구정 본점 · 11개 지역 키워드</span></div>
  </div>;
}

export function BudgetBridge({onChoose}:{onChoose:(model:string)=>void}) {
  return <section className="section budget-bridge" aria-labelledby="budget-bridge-title">
    <div data-reveal><span className="story-kicker">직영점의 숫자에서, 내 사업의 숫자로</span><h2 id="budget-bridge-title">예산별 출점 상담.</h2><p>준비한 자금에 맞춰 개설비와 운영 계획을 검토합니다.</p></div>
    <div className="budget-bridge-actions" data-reveal>{[1,2,3].map(n=><button key={n} onClick={()=>onChoose(`${n}억 모델`)}><span>{n}억 모델</span><ArrowUpRight size={18}/></button>)}<button onClick={()=>onChoose("모델 상담 희망")}><span>예산부터 상담</span><ArrowUpRight size={18}/></button></div>
    <p className="budget-bridge-note">모델 선택 후 상담 내용을 남겨주세요. 상세 비용은 지역·공간 조건에 따라 안내합니다.</p>
  </section>;
}

export function BrandDesire() {
  return <section className="brand-desire" id="difference" aria-labelledby="desire-title">
    <div className="desire-scene" data-scroll-scene><img src="/images/apgujeong-reception.webp" alt="스칼프잇 압구정 본점의 리셉션과 프리미엄 공간" loading="lazy"/><div className="desire-copy" data-reveal><span>갖고 싶은 매장. 운영하고 싶은 브랜드.</span><h2 id="desire-title">이 공간의 고객에서,<br/>이 브랜드의 점주로.</h2><a className="button conversion-primary" href="#visit">압구정 본점 직접 경험하기 <ArrowUpRight size={19}/></a></div><small>스칼프잇 압구정 본점</small></div>
    <div className="section desire-details"><div data-reveal><span className="story-kicker">고객이 돈을 지불할 이유</span><h3>머리를 감는 시간을 넘어,<br/>일부러 찾아오는 경험.</h3><p>두피 케어가 방문의 목적이 되도록.<br/>프로그램, 직원 교육, 공간과 광고를<br/>하나의 경험으로 설계했습니다.</p></div><dl>{[
      ["두피 케어에 집중한 전문점", "헤드스파를 받으러 찾아오는 매장. 상담부터 관리, 예약 시간까지 두피 케어를 중심에 둡니다."],
      ["방치 없는 수기 중심 관리", "수기 중심 관리로 처음부터 끝까지 고객에게 집중합니다. 관리 과정과 고객 응대를 같은 기준으로 교육합니다."],
      ["사진에서 시작되는 방문 욕구", "공간을 보고 궁금해지고, 경험한 뒤 기억에 남도록. 조도와 향, 수건과 베드까지 브랜드의 기준으로 관리합니다."],
    ].map(([title,text])=><div key={title} data-reveal><dt>{title}</dt><dd>{text}</dd></div>)}</dl></div>
  </section>;
}
