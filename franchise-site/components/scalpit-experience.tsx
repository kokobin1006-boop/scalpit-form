"use client";

import { useEffect, useRef } from "react";

const chapters = ["why", "results", "profit", "courses", "customers", "marketing", "system", "models", "apply"];

/** Progressive enhancement: the complete page remains readable without JS or motion. */
export function ScalpitExperience() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const site = document.querySelector<HTMLElement>(".f-refined");
    if (!site) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1001px) and (pointer: fine)");
    const hero = site.querySelector<HTMLElement>(".f-hero");
    const header = site.querySelector<HTMLElement>(".f-header");
    const navigation = Array.from(site.querySelectorAll<HTMLAnchorElement>(".f-header nav a"));
    const reveals = Array.from(site.querySelectorAll<HTMLElement>([
      ".f-results>.f-section-head", ".sc-economics-heading", ".f-marketing-intro",
    ].join(",")));
    const scenes = Array.from(site.querySelectorAll<HTMLElement>(".f-chart, .f-zero, .f-hook-answer"));
    let frame = 0;
    let active = "";
    let height = 1;
    let heroHeight = 1;
    let positions: { id: string; top: number }[] = [];
    let disposed = false;

    const measure = () => {
      height = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      heroHeight = hero?.offsetHeight || 1;
      positions = chapters.flatMap(id => {
        const node = document.getElementById(id);
        return node ? [{ id, top: node.getBoundingClientRect().top + window.scrollY }] : [];
      });
      schedule();
    };
    const paint = () => {
      frame = 0;
      if (disposed) return;
      const y = Math.max(0, window.scrollY);
      progress.current?.style.setProperty("transform", `scaleX(${Math.min(1, y / height)})`);
      header?.toggleAttribute("data-sc-scrolled", y > 24);
      const next = positions.filter(item => item.top <= y + window.innerHeight * .35).at(-1)?.id || "";
      if (next !== active) {
        active = next;
        navigation.forEach(link => {
          if (link.hash === `#${active}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
      if (hero && y <= heroHeight + 150) {
        const position = Math.min(1, y / heroHeight);
        const moving = desktop.matches && !preference.matches;
        hero.style.setProperty("--sc-film-y", `${moving ? position * 65 : 0}px`);
        hero.style.setProperty("--sc-film-scale", `${moving ? 1.06 - position * .035 : 1}`);
      }
    };
    function schedule() { if (!frame && !disposed) frame = requestAnimationFrame(paint); }

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          node.dataset.scReveal = "shown";
          node.classList.add("sc-in-view");
          observer?.unobserve(node);
        });
      }, { threshold: .08, rootMargin: "0px 0px -32px 0px" });
      reveals.forEach(node => {
        const rect = node.getBoundingClientRect();
        if (!preference.matches && rect.top > window.innerHeight * .88) node.dataset.scReveal = "ready";
        else node.dataset.scReveal = "shown";
        observer?.observe(node);
      });
      scenes.forEach(node => {
        if (!preference.matches) node.dataset.scScene = "ready";
        observer?.observe(node);
      });
    }
    const onPreference = () => {
      if (preference.matches) {
        reveals.forEach(node => { node.dataset.scReveal = "shown"; });
        scenes.forEach(node => { node.classList.add("sc-in-view"); });
      }
      schedule();
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const node = event.target.closest<HTMLElement>("[data-sc-reveal]");
      if (node) node.dataset.scReveal = "shown";
    };
    const resize = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : undefined;
    resize?.observe(site);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pageshow", measure);
    document.addEventListener("focusin", onFocus);
    preference.addEventListener("change", onPreference);
    desktop.addEventListener("change", onPreference);
    measure();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect(); resize?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pageshow", measure);
      document.removeEventListener("focusin", onFocus);
      preference.removeEventListener("change", onPreference);
      desktop.removeEventListener("change", onPreference);
      reveals.forEach(node => { delete node.dataset.scReveal; node.style.removeProperty("--sc-reveal-delay"); });
      scenes.forEach(node => { delete node.dataset.scScene; node.classList.remove("sc-in-view"); });
      navigation.forEach(link => link.removeAttribute("aria-current"));
      hero?.style.removeProperty("--sc-film-y"); hero?.style.removeProperty("--sc-film-scale");
    };
  }, []);
  return <div className="sc-reading-line" aria-hidden="true"><div ref={progress}/></div>;
}

export function MotionNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const node = useRef<HTMLSpanElement>(null);
  const displayed = useRef(0);
  const entered = useRef(false);
  const format = (number: number) => number.toLocaleString("ko-KR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const formatted = format(value);
  useEffect(() => {
    const element = node.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const finish = () => { cancelAnimationFrame(frame); displayed.current = value; element.textContent = formatted; };
    const animate = () => {
      observer?.disconnect();
      if (preference.matches) { entered.current = true; finish(); return; }
      const from = displayed.current;
      const duration = entered.current ? 620 : 1100;
      entered.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        displayed.current = from + (value - from) * (1 - Math.pow(1 - p, 3));
        element.textContent = displayed.current.toLocaleString("ko-KR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        if (p < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    };
    if (preference.matches || !("IntersectionObserver" in window)) finish();
    else if (entered.current) animate();
    else {
      observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) animate(); }, { threshold: .5 });
      observer.observe(element);
    }
    const onPreference = () => { if (preference.matches) finish(); };
    preference.addEventListener("change", onPreference);
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); preference.removeEventListener("change", onPreference); };
  }, [value, decimals, formatted]);
  return <><span className="sr-only">{formatted}</span><span ref={node} className="sc-number" aria-hidden="true">{formatted}</span></>;
}
