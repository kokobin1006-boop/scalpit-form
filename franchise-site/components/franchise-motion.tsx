"use client";

import { useEffect, useRef, useState } from "react";

const chapters = [
  ["intro", "가맹 모집"], ["sales", "직영점 매출"], ["profit", "마진율 공개"],
  ["marketing", "본사 마케팅"], ["support", "본사 지원"], ["difference", "브랜드 경험"],
  ["models", "창업비용"], ["meeting", "상담 신청"],
];

export function CountUp({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const formatted = value.toLocaleString("ko-KR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const finish = () => { cancelAnimationFrame(frame); node.textContent = formatted; };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      if (preference.matches) return finish();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1300);
        const current = value * (1 - Math.pow(1 - progress, 4));
        node.textContent = current.toLocaleString("ko-KR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(node);
    const onPreference = () => { if (preference.matches) finish(); };
    preference.addEventListener("change", onPreference);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener("change", onPreference); };
  }, [value, decimals, formatted]);
  return <><span className="sr-only">{formatted}</span><span ref={ref} aria-hidden="true" className="animated-number">{formatted}</span></>;
}

export function FranchiseMotion() {
  const [active, setActive] = useState("intro");
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-scene]"));
    const sections = chapters.map(([id]) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-visible", "true");
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -36px 0px" });
      reveals.forEach(el => {
        if (!preference.matches) el.setAttribute("data-motion-ready", "true");
        observer?.observe(el);
      });
    }
    const paint = () => {
      frame = 0;
      const height = window.innerHeight;
      const scrollable = document.documentElement.scrollHeight - height;
      const fraction = scrollable > 0 ? window.scrollY / scrollable : 0;
      progressRef.current?.style.setProperty("transform", `scaleX(${Math.min(1, Math.max(0, fraction))})`);
      let current = "intro";
      sections.forEach(el => { if (el.getBoundingClientRect().top <= height * .45) current = el.id; });
      setActive(current);
      scenes.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > height) return;
        const position = Math.max(0, Math.min(1, (height - rect.top) / (height + rect.height)));
        const reduced = preference.matches;
        el.style.setProperty("--scene-y", `${reduced ? 0 : (position - .5) * 48}px`);
        el.style.setProperty("--scene-inset", `${reduced ? 0 : Math.max(0, 6 * (1 - position / .48))}%`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const onPreference = () => {
      if (preference.matches) reveals.forEach(el => el.setAttribute("data-visible", "true"));
      schedule();
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      event.target.closest("[data-reveal]")?.setAttribute("data-visible", "true");
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("focusin", onFocus);
    preference.addEventListener("change", onPreference);
    paint();
    return () => {
      observer?.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule);
      document.removeEventListener("focusin", onFocus); preference.removeEventListener("change", onPreference);
      reveals.forEach(el => { el.removeAttribute("data-motion-ready"); el.removeAttribute("data-visible"); });
    };
  }, []);
  return <><div className="reading-progress" aria-hidden="true"><div ref={progressRef}/></div><nav className="chapter-nav" aria-label="페이지 구간 이동">{chapters.map(([id, label], index) => <a key={id} href={`#${id}`} aria-label={label} aria-current={active === id ? "location" : undefined}><span>{label}</span><i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i></a>)}</nav></>;
}
