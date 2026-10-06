/** Local reading state only. No analytics, storage of personal data, or scroll interception. */
export function watchFranchiseJourney(onQuickContact: (visible: boolean) => void, onInvite: () => void) {
  if (!("IntersectionObserver" in window)) return () => {};
  const sessionKey = "scalpit_launch_seen";
  let offered = false;
  try { offered = Boolean(sessionStorage.getItem(sessionKey)); } catch {}
  let disposed = false;
  let inviteTimer = 0;
  let boundaryVisible = false;
  const visibleActions = new Set<Element>();
  const stages = [
    { selector: ".sc-profit-spread", visible: new Set<Element>(), read: false, timer: 0 },
    { selector: ".f-marketing-intro, .f-ranking, .f-funnel", visible: new Set<Element>(), read: false, timer: 0 },
  ];
  const markOffered = () => {
    offered = true;
    window.clearTimeout(inviteTimer);
    try { sessionStorage.setItem(sessionKey, "1"); } catch {}
  };
  const onscreen = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return rect.bottom > 80 && rect.top < window.innerHeight;
  };
  const canOffer = () => {
    if (disposed || offered || document.hidden || !boundaryVisible || !stages.every(stage => stage.read)) return false;
    if (document.querySelector('.f-header nav.open, [role="dialog"]')) return false;
    if (document.activeElement?.closest('a, button, input, select, textarea, summary, [contenteditable="true"], [role="region"]')) return false;
    if (Array.from(document.querySelectorAll<HTMLVideoElement>("video[controls]")).some(video => !video.paused && onscreen(video))) return false;
    return true;
  };
  const scheduleInvite = () => {
    window.clearTimeout(inviteTimer);
    if (!canOffer()) return;
    // Wait until scrolling/interaction stops; never open over a control or playing film.
    inviteTimer = window.setTimeout(() => {
      if (!canOffer()) return;
      markOffered();
      onInvite();
    }, 1600);
  };
  const trackDwell = () => {
    stages.forEach(stage => {
      if (document.hidden || !stage.visible.size) { window.clearTimeout(stage.timer); stage.timer = 0; }
      else if (!stage.read && !stage.timer) {
        stage.timer = window.setTimeout(() => {
          stage.timer = 0;
          if (disposed || document.hidden || !stage.visible.size) return;
          stage.read = true;
          scheduleInvite();
        }, 6000);
      }
    });
    scheduleInvite();
  };
  const evidence = new IntersectionObserver(entries => {
    entries.forEach(entry => stages.forEach(stage => {
      if (!entry.target.matches(stage.selector)) return;
      if (entry.isIntersecting) stage.visible.add(entry.target);
      else stage.visible.delete(entry.target);
    }));
    trackDwell();
  }, { threshold: .15, rootMargin: "-80px 0px -10% 0px" });
  stages.forEach(stage => document.querySelectorAll(stage.selector).forEach(node => evidence.observe(node)));

  const boundary = new IntersectionObserver(entries => {
    boundaryVisible = entries.some(entry => entry.isIntersecting);
    scheduleInvite();
  }, { threshold: .2, rootMargin: "-80px 0px -15% 0px" });
  const nextChapter = document.querySelector(".f-system-head");
  if (nextChapter) boundary.observe(nextChapter);

  // Let the CTA in the page lead when it is visible; the dock fills the gaps.
  const primaryActions = document.querySelectorAll('.f-hero, #apply, .sc-profit-main a, .f-model-grid button, .f-budget-consult>a, .f-limit-copy>a, .f-store-visit a');
  primaryActions.forEach(node => { if (onscreen(node)) visibleActions.add(node); });
  const updateQuickContact = () => onQuickContact(visibleActions.size === 0);
  const actionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) visibleActions.add(entry.target);
      else visibleActions.delete(entry.target);
    });
    updateQuickContact();
  }, { threshold: 0, rootMargin: "-80px 0px 0px 0px" });
  primaryActions.forEach(node => actionObserver.observe(node));
  updateQuickContact();

  const onIntent = (event: Event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('a[href="#apply"], .f-model-grid button, #apply')) markOffered();
    scheduleInvite();
  };
  window.addEventListener("scroll", scheduleInvite, { passive: true });
  document.addEventListener("pointerdown", scheduleInvite);
  document.addEventListener("keydown", scheduleInvite);
  document.addEventListener("click", onIntent);
  document.addEventListener("focusin", onIntent);
  document.addEventListener("visibilitychange", trackDwell);
  return () => {
    disposed = true;
    window.clearTimeout(inviteTimer);
    stages.forEach(stage => window.clearTimeout(stage.timer));
    evidence.disconnect(); boundary.disconnect(); actionObserver.disconnect();
    window.removeEventListener("scroll", scheduleInvite);
    document.removeEventListener("pointerdown", scheduleInvite);
    document.removeEventListener("keydown", scheduleInvite);
    document.removeEventListener("click", onIntent);
    document.removeEventListener("focusin", onIntent);
    document.removeEventListener("visibilitychange", trackDwell);
  };
}
