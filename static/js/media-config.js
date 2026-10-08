/*
 * Public assets only: project-relative, same-origin URLs under ./static/.
 * Replace paths here; null leaves a quiet, correctly sized empty frame.
 * JSON image paths resolve against assetRoot, not the data/ directory.
 * Paper and Code remain disabled until their anonymous release is verified.
 */
window.FIND_LAB_MEDIA = Object.freeze({
  assetRoot: "./static/media/findlab/",

  // Unchanged 15 s clean replay: separately recorded episodes in static scenes.
  // This is not a live parallel evaluation or an online-adaptation experiment.
  heroMedia: "./static/media/hero-clean.mp4",
  heroPoster: "./static/media/findlab/images/parallel-hero-poster.jpg",
  overviewImage: "./static/media/findlab/images/findlab-workflow.png",

  // Preserve the selected 2:59.5 overview. Edited geometry transitions illustrate
  // configurations; they are not controlled sweeps or online-adaptation evidence.
  mainVideo: "./static/media/research-overview.mp4",
  mainPoster: null, // No separate verified poster supplied for this video.
  environmentGallery: "./static/media/findlab/data/environment-gallery.json",

  // Additional archived MPPI example, curved U radius 1.75 m, case 02.
  // Not the exact Fig. 5 episodes. Body clearance excludes articulated legs.
  diagnosisVideo: "./static/media/findlab/video/diagnostic-comparison.mp4",
  diagnosisPoster: "./static/media/findlab/images/diagnostic-comparison-poster.jpg",
  proposalImage: "./static/media/findlab/images/proposal-comparison.svg",

  // Illustrative ANYmal-C / DWA case 04. The displayed F episode is distinct
  // from the LLM input episode; these outcomes do not establish a failure cause.
  pairedVideo: "./static/media/findlab/video/paired-setting-example.mp4",
  pairedPoster: "./static/media/findlab/images/paired-setting-poster.jpg",
  resultsImage: "./static/media/findlab/images/pooled-results.svg",
  resultsData: "./static/media/findlab/data/pooled-results.json",

  // Preserve the 130 s anonymized GUI walkthrough. Setup and saved results are
  // separate examples; no evaluation, model request, or parameter apply is run.
  tutorialVideo: "./static/media/tool-walkthrough.mp4",
  tutorialPoster: "./static/media/findlab/images/tool/inspect.jpg",
  tutorialChapters: "./static/media/findlab/data/tool-chapters.json",
  tutorialTrack: "./static/media/findlab/data/tool-chapters.vtt",
});
