(() => {
  "use strict";

  const media = window.FIND_LAB_MEDIA || {};
  const staticRoot = new URL("./static/", document.baseURI);
  const loopToggle = document.querySelector(".loop-toggle");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Keep resources on this site, under its existing project-relative static path.
  function assetURL(path) {
    if (typeof path !== "string" || !path.trim()) return null;
    try {
      const url = new URL(path, document.baseURI);
      if (url.origin !== staticRoot.origin || !url.pathname.startsWith(staticRoot.pathname)) return null;
      return url;
    } catch {
      return null;
    }
  }

  const slots = {
    heroMedia: {
      label: "Recorded Nova Carter and ANYmal-C runs replayed together in 15 static configurations across Straight, Single-Bend, S-Bend, Recovery Pocket, and U-Shape environments. The camera zooms from a single run to the full grid.",
    },
    overviewImage: {
      label: "FIND-Lab overview: controlled passage environments, robot platforms and navigation methods, outcomes, termination locations, behavioral time series, and parameter proposals for re-evaluation.",
    },
    mainVideo: { label: "Research Overview" },
    tutorialVideo: { label: "Using FIND-Lab" },
  };

  Object.entries(slots).forEach(([key, slot]) => {
    const frame = document.querySelector(`[data-media="${key}"]`);
    const url = assetURL(media[key]);
    // A missing asset produces no img/video element, request, or empty controls.
    if (!frame || !url) return;

    const emptyLabel = frame.getAttribute("aria-label");
    const isVideo = /\.(mp4|webm)$/i.test(url.pathname);
    const isImage = /\.(gif|png|jpe?g|webp)$/i.test(url.pathname);
    const isHero = key === "heroMedia";
    if (key === "overviewImage" ? !isImage : !isVideo && !(isHero && isImage)) return;

    function show(element) {
      frame.replaceChildren(element);
      frame.dataset.state = "ready";
      frame.removeAttribute("role");
      frame.removeAttribute("aria-label");
    }

    function clear() {
      frame.replaceChildren();
      delete frame.dataset.state;
      frame.setAttribute("role", "img");
      frame.setAttribute("aria-label", emptyLabel);
      if (isHero) loopToggle.hidden = true;
    }

    if (isImage) {
      const img = new Image();
      img.alt = slot.label;
      img.decoding = "async";
      img.addEventListener("load", () => show(img), { once: true });
      img.addEventListener("error", clear);
      img.src = url.href;
      return;
    }

    const video = document.createElement("video");
    video.setAttribute("aria-label", slot.label);
    video.preload = "metadata";
    video.playsInline = true;
    if (isHero) {
      video.id = "hero-video";
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.autoplay = !reduceMotion.matches;
      const syncToggle = () => {
        loopToggle.textContent = video.paused ? "Play loop" : "Pause loop";
        loopToggle.dataset.paused = String(video.paused);
      };
      const togglePlayback = () => {
        if (video.paused) video.play().catch(syncToggle);
        else video.pause();
      };
      loopToggle.addEventListener("click", togglePlayback);
      video.addEventListener("click", togglePlayback);
      video.addEventListener("play", syncToggle);
      video.addEventListener("pause", syncToggle);
      reduceMotion.addEventListener("change", (event) => {
        if (event.matches) video.pause();
      });
    }
    // Keep the player detached until a frame is ready: no broken controls or
    // loading spinner, including when a configured file is missing or invalid.
    video.addEventListener("loadeddata", () => {
      video.controls = !isHero;
      show(video);
      if (isHero) {
        loopToggle.hidden = false;
        loopToggle.textContent = video.paused ? "Play loop" : "Pause loop";
        loopToggle.dataset.paused = String(video.paused);
        if (!reduceMotion.matches) video.play().catch(() => {
          loopToggle.textContent = "Play loop";
          loopToggle.dataset.paused = "true";
        });
      }
    }, { once: true });
    video.addEventListener("error", clear);
    video.src = url.href;
  });
})();
