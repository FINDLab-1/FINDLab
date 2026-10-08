(() => {
  "use strict";

  const media = window.FIND_LAB_MEDIA || {};
  const staticRoot = new URL("./static/", document.baseURI);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const loopToggle = document.querySelector(".loop-toggle");
  const players = new Map();

  // Preserve the project path, including GitHub Pages' /FINDLab/ prefix.
  function assetURL(path, base = document.baseURI) {
    if (typeof path !== "string" || !path.trim()) return null;
    try {
      const url = new URL(path, base);
      return url.origin === staticRoot.origin && url.pathname.startsWith(staticRoot.pathname) ? url : null;
    } catch {
      return null;
    }
  }
  const bundleRoot = assetURL(media.assetRoot);
  const bundleURL = (path) => bundleRoot ? assetURL(path, bundleRoot.href) : null;
  const isImage = (url) => url && /\.(gif|png|jpe?g|webp|svg)$/i.test(url.pathname);

  // Hidden tabs and mobile-hidden diagrams do not initiate asset downloads.
  const pending = new WeakMap();
  const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      pending.get(entry.target)?.();
      pending.delete(entry.target);
    });
  }, { rootMargin: "240px" }) : null;

  function whenNear(element, load) {
    if (!observer) return load();
    pending.set(element, load);
    observer.observe(element);
  }

  function show(frame, element) {
    element.hidden = false;
    frame.replaceChildren(element);
    frame.dataset.state = "ready";
    frame.removeAttribute("role");
    frame.removeAttribute("aria-label");
  }

  function mountImage(frame, url, label) {
    if (!frame || !isImage(url)) return;
    whenNear(frame, () => {
      const img = new Image();
      img.alt = label;
      img.decoding = "async";
      img.addEventListener("load", () => {
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
        frame.style.setProperty("--media-ratio", `${img.width} / ${img.height}`);
        show(frame, img);
      }, { once: true });
      // Leave the reserved frame untouched on failure: no broken image icon.
      img.addEventListener("error", () => img.remove(), { once: true });
      img.src = url.href;
    });
  }

  async function readData(key) {
    const url = assetURL(media[key]);
    if (!url || !/\.json$/i.test(url.pathname)) return null;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch(url, { signal: controller.signal, credentials: "same-origin" });
      return response.ok ? await response.json() : null;
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  function mountVideo(key, label, posterKey, id) {
    const frame = document.querySelector(`[data-media="${key}"]`);
    const url = assetURL(media[key]);
    if (!frame || !url || !/\.(mp4|webm)$/i.test(url.pathname)) return null;
    const hero = key === "heroMedia";
    const emptyLabel = frame.getAttribute("aria-label");
    const video = document.createElement("video");
    video.id = id;
    video.hidden = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.setAttribute("aria-label", label);
    frame.append(video);
    if (hero) {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
    }

    let started = false;
    let failed = false;
    let metadataReady = false;
    let manualPlay = false;
    let posterStarted = false;
    let posterImage = null;
    let resolveReady;
    const ready = new Promise((resolve) => { resolveReady = resolve; });

    function syncToggle() {
      if (!hero || !loopToggle) return;
      loopToggle.textContent = video.paused ? "Play loop" : "Pause loop";
      loopToggle.dataset.paused = String(video.paused);
    }

    function showPoster() {
      if (!posterImage || failed) return;
      show(frame, posterImage);
      // Retain the target of aria-controls without exposing empty controls.
      video.hidden = true;
      frame.append(video);
      if (hero && loopToggle) loopToggle.hidden = false;
      syncToggle();
    }

    function loadPoster() {
      const poster = assetURL(media[posterKey]);
      if (posterStarted || !isImage(poster)) return;
      posterStarted = true;
      const img = new Image();
      img.alt = label;
      img.addEventListener("load", () => {
        if (failed) return;
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
        posterImage = img;
        video.poster = poster.href;
        if (hero && reduceMotion.matches && !manualPlay) showPoster();
      }, { once: true });
      img.src = poster.href;
    }

    function load() {
      loadPoster();
      if (started || failed) return ready;
      started = true;
      video.autoplay = hero && !reduceMotion.matches && !manualPlay;
      if (key === "tutorialVideo") {
        const trackURL = assetURL(media.tutorialTrack);
        if (trackURL && /\.vtt$/i.test(trackURL.pathname)) {
          const track = document.createElement("track");
          track.kind = "chapters";
          track.label = "Chapters";
          track.srclang = "en";
          track.src = trackURL.href;
          video.append(track);
        }
      }
      video.src = url.href;
      return ready;
    }

    video.addEventListener("loadedmetadata", () => {
      if (failed) return;
      metadataReady = true;
      video.width = video.videoWidth;
      video.height = video.videoHeight;
      frame.style.setProperty("--media-ratio", `${video.videoWidth} / ${video.videoHeight}`);
      video.controls = !hero;
      // Metadata is sufficient to expose a working player; do not wait for
      // loadeddata, which metadata-only loading may never fire before Play.
      if (hero && reduceMotion.matches && !manualPlay) showPoster();
      else show(frame, video);
      if (hero && loopToggle) {
        loopToggle.hidden = false;
        syncToggle();
        if (!reduceMotion.matches && !manualPlay) video.play().catch(syncToggle);
      }
      resolveReady(video);
    }, { once: true });

    video.addEventListener("error", () => {
      failed = true;
      video.pause();
      video.controls = false;
      frame.replaceChildren();
      delete frame.dataset.state;
      frame.setAttribute("role", "img");
      frame.setAttribute("aria-label", emptyLabel);
      if (hero && loopToggle) loopToggle.hidden = true;
      if (key === "tutorialVideo") document.querySelectorAll("[data-chapter]").forEach((button) => { button.disabled = true; });
      resolveReady(null);
    }, { once: true });

    video.addEventListener("play", () => {
      players.forEach((player) => { if (player.video !== video) player.video.pause(); });
      syncToggle();
    });
    video.addEventListener("pause", syncToggle);

    if (hero && loopToggle) {
      const togglePlayback = () => {
        if (!video.paused) return video.pause();
        manualPlay = true;
        load();
        if (metadataReady) show(frame, video);
        video.play().catch(syncToggle);
      };
      loopToggle.addEventListener("click", togglePlayback);
      video.addEventListener("click", togglePlayback);
      reduceMotion.addEventListener("change", (event) => {
        if (!event.matches) return;
        video.autoplay = false;
        video.pause();
        manualPlay = false;
        loadPoster();
        showPoster();
      });
    }

    whenNear(frame, () => {
      if (hero && reduceMotion.matches) loadPoster();
      else load();
    });
    const player = { video, load };
    players.set(key, player);
    return player;
  }

  const imageSlots = {
    overviewImage: "Configure factors, measure outcomes and termination locations, inspect synchronized diagnostics, and separately evaluate a bounded adjustment.",
    proposalImage: "ANYmal-C / DWA: A uses aggregate outcomes and proposes a planning obstacle envelope of 0.65 m; L adds diagnostic plots and a separate execution summary and proposes 0.45 m, from F at 0.55 m. Restricted corrective motion is a hypothesis, not an established cause.",
    resultsImage: "Descriptive pooled success on selected Nova Carter conditions. MPPI: F 0%, A 1.25%, L 18.75%. DWA: F 25%, A 30%, L 40%. RL-PPO: F 2.11%, A 12.11%, L 22.11%. Compare inputs within each method; counts follow in the table.",
  };
  Object.entries(imageSlots).forEach(([key, label]) => mountImage(document.querySelector(`[data-media="${key}"]`), assetURL(media[key]), label));
  mountVideo("heroMedia", "Recorded episodes visualized together in static Isaac Sim scenes", "heroPoster", "hero-video");
  mountVideo("mainVideo", "Research Overview", "mainPoster", "research-video");
  mountVideo("diagnosisVideo", "Additional recorded MPPI diagnostic comparison: Nova Carter timeout and ANYmal-C collision", "diagnosisPoster", "diagnosis-video");
  mountVideo("pairedVideo", "Illustrative recorded ANYmal-C DWA episodes: F and A collide; L reaches the goal", "pairedPoster", "paired-video");
  const tutorial = mountVideo("tutorialVideo", "Using FIND-Lab", "tutorialPoster", "tutorial-video");

  document.querySelectorAll('[role="tablist"]').forEach((list) => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    function activate(selected) {
      tabs.forEach((tab) => {
        const active = tab === selected;
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute("aria-controls"));
        if (!panel) return;
        panel.hidden = !active;
        if (!active) panel.querySelectorAll("video").forEach((video) => video.pause());
      });
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", (event) => {
        let next;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return; // Native buttons handle Enter and Space.
        event.preventDefault();
        tabs[next].focus();
        activate(tabs[next]);
      });
    });
  });

  readData("environmentGallery").then((data) => {
    if (!Array.isArray(data?.panels)) return;
    document.querySelectorAll("[data-environment]").forEach((grid) => {
      const panel = data.panels.find((item) => item.id === grid.dataset.environment);
      if (!Array.isArray(panel?.items)) return;
      grid.querySelectorAll("[data-setting]").forEach((frame) => {
        const item = panel.items[Number(frame.dataset.setting)];
        if (item && typeof item.alt === "string") mountImage(frame, bundleURL(item.image), item.alt);
      });
    });
  });

  // The HTML table is a source-checked snapshot, retained if JSON is unavailable.
  // Refresh it atomically from the same supplied counts, without deriving claims.
  readData("resultsData").then((data) => {
    if (!Array.isArray(data?.rows)) return;
    const cells = [...document.querySelectorAll(".results-table td[data-input]")];
    const rows = cells.map((cell) => data.rows.find((row) => row.method === cell.parentElement.dataset.method && row.input === cell.dataset.input));
    if (!rows.every((row) => row && Number.isInteger(row.successes) && Number.isInteger(row.episodes) && row.episodes > 0 && row.successes >= 0 && row.successes <= row.episodes && Number.isFinite(row.success_rate_percent) && Math.abs(row.successes / row.episodes * 100 - row.success_rate_percent) < 0.000001)) return;
    const format = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });
    cells.forEach((cell, index) => {
      const row = rows[index];
      cell.querySelector(".result-count").textContent = `${row.successes}/${row.episodes}`;
      cell.querySelector(".result-rate").textContent = `(${format.format(row.success_rate_percent)}%)`;
    });
  });

  readData("tutorialChapters").then((data) => {
    if (!tutorial || !Array.isArray(data?.chapters)) return;
    const buttons = [...document.querySelectorAll("[data-chapter]")];
    const chapters = [];
    buttons.forEach((button) => {
      const chapter = data.chapters.find((item) => item.id === button.dataset.chapter);
      if (!chapter || !Number.isFinite(chapter.start_s) || chapter.start_s < 0 || typeof chapter.label !== "string") return;
      chapters.push({ button, start: chapter.start_s });
      const minutes = String(Math.floor(chapter.start_s / 60)).padStart(2, "0");
      const seconds = String(Math.floor(chapter.start_s % 60)).padStart(2, "0");
      button.querySelector(".chapter-time").textContent = `${minutes}:${seconds}`;
      button.querySelector(".chapter-label").textContent = chapter.label;
      mountImage(button.querySelector(".chapter-thumbnail"), bundleURL(chapter.poster), "");
      button.disabled = Boolean(tutorial.video.error);
      button.addEventListener("click", async () => {
        const video = await tutorial.load();
        if (!video) return;
        video.currentTime = Math.min(chapter.start_s, Math.max(0, video.duration - 0.1));
        video.play().catch(() => { /* Native controls remain available. */ });
      });
    });
    tutorial.video.addEventListener("timeupdate", () => {
      const active = chapters.filter((chapter) => chapter.start <= tutorial.video.currentTime).at(-1);
      chapters.forEach(({ button }) => {
        if (button === active?.button) button.setAttribute("aria-current", "true");
        else button.removeAttribute("aria-current");
      });
    });
  });
})();
