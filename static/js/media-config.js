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
  heroMedia: "./static/media/hero-clean.mp4?v=ed249008a5",
  heroPoster: "./static/media/findlab/images/parallel-hero-poster.jpg?v=15e9ff283c",
  overviewImage: "./static/media/findlab/images/findlab-workflow.png?v=3e736bb9a4",

  // Preserve the selected 2:59.5 overview. Edited geometry transitions illustrate
  // configurations; they are not controlled sweeps or online-adaptation evidence.
  mainVideo: "./static/media/research-overview.mp4?v=0f6076383a",
  mainPoster: null, // No separate verified poster supplied for this video.
  environmentGallery: "./static/media/findlab/data/environment-gallery.json?v=f0a958eb05",

  // Additional archived MPPI example, U-Shape / curved, r = 1.75 m, case 02.
  // Presentation titles and speed labels revised; original records and 1× clock retained.
  // Not the exact Fig. 5 episodes. Body clearance excludes articulated legs.
  diagnosisVideo: "./static/media/findlab/video/diagnostic-comparison.mp4?v=d015f8b8bf",
  diagnosisPoster: "./static/media/findlab/images/diagnostic-comparison-poster.jpg?v=90388fe451",
  proposalImage: "./static/media/findlab/images/proposal-comparison.svg?v=e164449487",

  // Revised F/A/L presentation labels; original 24 s recorded episodes retained.
  // Illustrative ANYmal-C / DWA case 04. The displayed F episode is distinct
  // from the LLM input episode; these outcomes do not establish a failure cause.
  pairedVideo: "./static/media/findlab/video/paired-setting-example.mp4?v=f2ba7719b8",
  pairedPoster: "./static/media/findlab/images/paired-setting-poster.jpg?v=83de89604e",
  resultsImage: "./static/media/findlab/images/pooled-results.svg?v=83e7078e69",
  resultsData: "./static/media/findlab/data/pooled-results.json?v=72272b6059",

  // Revised presentation titles in the 130 s anonymized GUI walkthrough. Setup and saved results are
  // separate examples; no evaluation, model request, or parameter apply is run.
  // The assistant help header is cropped; provider status and results stay visible.
  tutorialVideo: "./static/media/tool-walkthrough.mp4?v=8a5d4380e8",
  tutorialPoster: "./static/media/findlab/images/tool/inspect.jpg?v=174546e79e",
  tutorialChapters: "./static/media/findlab/data/tool-chapters.json?v=b9e3ed9f8c",
  tutorialTrack: "./static/media/findlab/data/tool-chapters.vtt?v=a6d586c65e",
});
