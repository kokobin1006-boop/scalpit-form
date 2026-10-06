"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export function BrandFilm() {
  const film = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const video = film.current;
    if (!video) return;
    let disposed = false;
    let visible = true;
    let pending = false;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (disposed) return;
      if (document.hidden || !visible || pausedByUser.current || preference.matches) { video.pause(); return; }
      if (pending || !video.paused) return;
      video.muted = true; video.defaultMuted = true; video.playsInline = true;
      pending = true;
      void video.play().catch(() => {}).finally(() => { pending = false; });
    };
    video.muted = true; video.defaultMuted = true;
    video.setAttribute("muted", ""); video.setAttribute("playsinline", "");
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.01 }) : undefined;
    observer?.observe(video);
    for (const event of ["loadeddata", "canplay"]) video.addEventListener(event, sync);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("pageshow", sync);
    document.addEventListener("pointerdown", sync, { passive: true });
    document.addEventListener("keydown", sync);
    preference.addEventListener("change", sync);
    const retry = window.setTimeout(sync, 1200);
    sync();
    return () => {
      disposed = true; window.clearTimeout(retry); observer?.disconnect();
      for (const event of ["loadeddata", "canplay"]) video.removeEventListener(event, sync);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("pageshow", sync);
      document.removeEventListener("pointerdown", sync);
      document.removeEventListener("keydown", sync);
      preference.removeEventListener("change", sync);
      video.pause();
    };
  }, []);
  function togglePlayback() {
    const video = film.current;
    if (!video) return;
    if (!video.paused) { pausedByUser.current = true; video.pause(); }
    else { pausedByUser.current = false; video.muted = true; void video.play().catch(() => {}); }
  }
  return <>
    <figure className="f-hero-visual f-brand-film" aria-hidden="true">
      <img src="/video/scalpit-brand-poster.webp" alt="" fetchPriority="high" />
      <video ref={film} autoPlay muted loop playsInline preload="auto" poster="/video/scalpit-brand-poster.webp" tabIndex={-1}
        className={ready ? "is-ready" : ""}
        onPlaying={() => { setPlaying(true); setReady(true); }} onPause={() => setPlaying(false)}
        onError={() => { setReady(false); setPlaying(false); }}>
        <source src="/video/scalpit-brand-film-mobile.mp4" media="(max-width: 700px)" type="video/mp4" />
        <source src="/video/scalpit-brand-film.mp4" type="video/mp4" />
      </video>
    </figure>
    <div className="f-brand-film-control"><span>SCALPIT — BRAND FILM</span>
      <button type="button" onClick={togglePlayback} aria-label={playing ? "배경 영상 일시정지" : "배경 영상 재생"}>
        {playing ? <Pause size={15} /> : <Play size={15} />}
      </button>
    </div>
  </>;
}
