(() => {
  const video = document.querySelector('[data-coach-demo]');
  if (!video) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let userPaused = false;
  let policyPause = false;

  function pauseForPolicy() {
    if (!video.paused) {
      policyPause = true;
      video.pause();
    }
  }

  function syncPlayback() {
    if (!visible || document.hidden) {
      pauseForPolicy();
    } else if (!reducedMotion.matches && !userPaused && video.paused) {
      // Native controls remain available if the browser disallows autoplay.
      video.play().catch(() => {});
    }
  }

  video.muted = true;
  video.autoplay = !reducedMotion.matches;
  if (reducedMotion.matches) pauseForPolicy();
  video.addEventListener('pause', () => {
    if (policyPause) policyPause = false;
    else userPaused = true;
  });
  video.addEventListener('play', () => {
    userPaused = false;
    if (!visible || document.hidden) pauseForPolicy();
  });
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
    syncPlayback();
  }, { threshold: [0, 0.15] }).observe(video);
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', () => {
    video.autoplay = !reducedMotion.matches;
    if (reducedMotion.matches) pauseForPolicy();
    else syncPlayback();
  });
})();
