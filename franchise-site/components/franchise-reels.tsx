"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

const reels = [
  { branch: "압구정 로데오", id: "Dda0Fujq_AA", image: "apgujeong-space.webp", detail: "65평 · 압구정 본점", kind: "매장 미리보기" },
  { branch: "광교", id: "Ddaz5P9qumT", image: "gwanggyo.webp", detail: "50평 · 광교 직영점", kind: "매장 미리보기" },
  { branch: "천안", id: "Ddazk2Dq0Ew", image: "cheonan.webp", detail: "30평 · 천안 직영점", kind: "매장 미리보기" },
  { branch: "동탄", id: "DdazZFMqbFR", image: "dongtan.webp", detail: "27평 · 동탄 직영점", kind: "매장 미리보기" },
  { branch: "스칼프잇 콘텐츠 01", id: "DcgN4W8CpYh", image: "apgujeong-ritual.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 02", id: "DbXxXP-yQ30", image: "apgujeong-reception.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 03", id: "Db27_pny8Ci", image: "apgujeong-ritual.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 04", id: "DctLr8UBxRc", image: "apgujeong-reception.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 05", id: "DcknCM3C6qj", image: "gwanggyo.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 06", id: "DbvFDUQx9pQ", image: "dongtan.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 07", id: "Dbpjb2lpwCm", image: "cheonan.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 08", id: "DbnR0i1TBxf", image: "apgujeong-space.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 09", id: "DbfxF6MJGRK", image: "apgujeong-ritual.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 10", id: "DbfPZ2cJ1W-", image: "apgujeong-reception.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 11", id: "DbIcWaQgs0m", image: "gwanggyo.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 12", id: "DbKp4nvB2D6", image: "dongtan.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 13", id: "DbP_kcPSYoK", image: "cheonan.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 14", id: "DbaUTsvvvXj", image: "apgujeong-space.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
  { branch: "스칼프잇 콘텐츠 15", id: "Db29jk4Nc-j", image: "apgujeong-ritual.webp", detail: "SCALPIT · BRAND CONTENT", kind: "브랜드 콘텐츠" },
];

function ReelRail({ items, label }: { items: typeof reels; label: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { if (preference.matches) setPlaying(false); };
    change(); preference.addEventListener("change", change);
    const observer = new IntersectionObserver(entries => setVisible(entries.some(entry => entry.isIntersecting)), {threshold:.15});
    if (root.current) observer.observe(root.current);
    return () => { preference.removeEventListener("change", change); observer.disconnect(); };
  }, []);

  useEffect(() => {
    if (!api) return;
    const sync = () => setCurrent(api.selectedScrollSnap());
    sync(); api.on("select", sync); api.on("reInit", sync);
    return () => { api.off("select", sync); api.off("reInit", sync); };
  }, [api]);

  useEffect(() => {
    if (!api || !playing || hovered || focused || !visible) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      if (api.canScrollNext()) api.scrollNext(); else api.scrollTo(0);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [api, playing, hovered, focused, visible]);

  function move(direction:number) {
    setPlaying(false);
    if (direction > 0) api?.scrollNext(); else api?.scrollPrev();
  }
  return <div ref={root}>
    <Carousel setApi={setApi} opts={{align:"start",containScroll:"trimSnaps"}} className="reels-carousel" aria-label={label} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);}}>
      <CarouselContent className="reels-track">
        {items.map((reel,index)=><CarouselItem key={reel.id} className="reel-slide" aria-label={`${index+1} / ${items.length} · ${reel.branch}`}>
          <a className="reel-card" href={`https://www.instagram.com/reel/${reel.id}/`} target="_blank" rel="noopener noreferrer" onClick={()=>setPlaying(false)} aria-label={`${reel.branch} Instagram 영상 보기 · 새 창`}>
            <img src={`/images/${reel.image}`} alt="" loading="lazy"/>
            <span className="reel-topline">{reel.kind}</span><span className="reel-play" aria-hidden="true"><Play size={23} fill="currentColor"/></span>
            <span className="reel-caption"><small>{reel.detail}</small><strong>{reel.branch}</strong><span>Instagram 릴스 보기 <ArrowUpRight size={17}/></span></span>
          </a>
        </CarouselItem>)}
      </CarouselContent>
      <div className="reels-controls"><span className="reels-instruction">카드를 누르면 Instagram에서 영상이 열립니다.</span><div><button onClick={()=>setPlaying(value=>!value)} aria-label={playing ? "영상 카드 자동 넘김 일시정지" : "영상 카드 자동 넘김 시작"}>{playing ? <Pause size={17}/> : <Play size={17}/>}</button><button onClick={()=>move(-1)} disabled={!api?.canScrollPrev()} aria-label="이전 영상 카드"><ArrowLeft size={20}/></button><button onClick={()=>move(1)} disabled={!api?.canScrollNext()} aria-label="다음 영상 카드"><ArrowRight size={20}/></button><span className="sr-only" aria-live={playing ? "off" : "polite"}>영상 목록 화면 {current+1}</span></div></div>
    </Carousel>
  </div>;
}

const groups = [
  { id: "stores", label: "직영점 둘러보기", items: reels.filter(reel=>reel.kind === "매장 미리보기") },
  { id: "content", label: "브랜드 콘텐츠", items: reels.filter(reel=>reel.kind === "브랜드 콘텐츠") },
];

export function BranchReels() {
  return <div className="branch-reels" id="branch-reels">
    <div className="reels-heading"><div><span className="story-kicker">공간에서 콘텐츠까지</span><h3>고객의 눈길을 끄는 브랜드.<br/>영상으로 확인하세요.</h3></div><p>직영점 4곳의 공간과<br/>스칼프잇을 알리는 브랜드 콘텐츠.</p></div>
    <Tabs defaultValue="stores" className="reels-tabs">
      <TabsList className="reels-tab-list" aria-label="영상 종류 선택">
        {groups.map(group=><TabsTrigger key={group.id} value={group.id}>{group.label}<span>{group.items.length}</span></TabsTrigger>)}
      </TabsList>
      {groups.map(group=><TabsContent key={group.id} value={group.id} className="reels-tab-panel"><ReelRail items={group.items} label={group.label}/></TabsContent>)}
    </Tabs>
    <div className="reels-to-visit"><span>영상으로 본 공간을 직접 경험하세요.</span><a href="#visit" className="editorial-text-link">압구정 본점 체험 안내 <ArrowUpRight size={18}/></a></div>
  </div>;
}
