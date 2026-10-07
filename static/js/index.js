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

  function setResource(key, href) {
    const link = document.querySelector(`[data-resource="${key}"]`);
    if (!link) return;
    if (href) {
      link.href = href;
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
    } else {
      link.removeAttribute("href");
      link.setAttribute("aria-disabled", "true");
      link.tabIndex = -1;
    }
  }

  const slots = {
    heroMedia: {
      label: "Recorded ANYmal-C DWA runs in S-Bend at 10 degrees under original, aggregate-input, and added-diagnostic-input settings, with each run's speed and clearance traces.",
    },
    overviewImage: {
      label: "FIND-Lab overview: controlled passage environments, robot platforms and navigation methods, outcomes, termination locations, behavioral time series, and parameter proposals for re-evaluation.",
    },
    mainVideo: { label: "Research Overview", section: "#research-overview" },
    tutorialVideo: { label: "Using FIND-Lab", section: "#using-find-lab" },
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
      if (slot.section) setResource(key, slot.section);
    }

    function clear() {
      frame.replaceChildren();
      delete frame.dataset.state;
      frame.setAttribute("role", "img");
      frame.setAttribute("aria-label", emptyLabel);
      setResource(key, null);
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
      };
      loopToggle.addEventListener("click", () => {
        if (video.paused) video.play().catch(syncToggle);
        else video.pause();
      });
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
        if (!reduceMotion.matches) video.play().catch(() => {
          loopToggle.textContent = "Play loop";
        });
      }
    }, { once: true });
    video.addEventListener("error", clear);
    video.src = url.href;
  });

  const paper = assetURL(media.paper);
  if (paper) {
    // A stale PDF path leaves its link disabled instead of sending readers to 404.
    fetch(paper.href, { method: "HEAD", credentials: "omit", referrerPolicy: "no-referrer" })
      .then((response) => {
        if (response.ok && response.headers.get("content-type")?.includes("application/pdf")) {
          setResource("paper", paper.href);
        }
      })
      .catch(() => setResource("paper", null));
  }
})();
