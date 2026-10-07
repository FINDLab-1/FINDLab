/*
 * The only place to edit document and media paths.
 * Use a relative URL inside ./static/ after checking the actual content and
 * metadata for anonymity. Leave unavailable or unverified assets as null.
 * Videos are local MP4/WebM files; heroMedia also accepts GIF/PNG/JPEG/WebP.
 * No external players, tracking scripts, or media-generation steps are used.
 */
window.FIND_LAB_MEDIA = Object.freeze({
  // Existing anonymous manuscript, copied without modification.
  paper: "./static/papers/find-lab.pdf",

  // User-selected findlab_hero.gif, copied unchanged: a 12-second infinite loop
  // of recorded ANYmal-C / DWA / S-Bend 10-degree runs under F/A/L settings.
  // The original 0.55 m and aggregate-input 0.65 m envelopes end in collision;
  // the added-diagnostic-input 0.45 m envelope reaches the goal in this example.
  // Speed and clearance traces follow each run's recorded time. This is an
  // illustrative case, not the originally planned Fig. 5 MPPI comparison.
  // Do not identify F as the LLM input episode or imply guaranteed improvement.
  heroMedia: "./static/media/hero.gif",

  // An existing overview image matching Fig. 1 of the current manuscript.
  // No figure is extracted from the PDF to fill this slot.
  overviewImage: null,

  // User-selected research overview (2:59.5), copied without re-encoding from
  // FINDLab_graphs_synced.mp4. Includes motivation, the benchmark pipeline,
  // environment demonstrations, success-rate plots, and LLM adjustment examples.
  // Table II: one factor at a time across five environment kinds.
  // Straight: passage width. Single-Bend/S-Bend: bend, width fixed at 1.2 m.
  // Recovery Pocket: initial heading. U-Shape: angular spacing or curved radius.
  // Fig. 4: success rates and observed boundaries tied to configured margins.
  // Fig. 5: distinct behaviors despite similar termination locations.
  // Figs. 6-7 / Table V: diagnostic inputs, proposals, and re-evaluation.
  // Fig. 7 shows individual episodes; F is NOT the episode supplied to the LLM.
  // Table V's descriptive pooled results are limited to the selected Nova Carter
  // conditions; they do not establish causes or guarantee improvement per case.
  // Geometry transitions labeled as edits illustrate environment configurations;
  // they are not factor-sweep or online-adaptation evidence.
  mainVideo: "./static/media/research-overview.mp4",

  // User-selected findlab_tool_walkthrough.mp4, copied unchanged (2:10).
  // Edited GUI captures cover environment/task setup, inspection of saved
  // results and their linked plots, and preparing a question in LLM Assistance.
  // The saved result is separate from the setup demonstration; this recording
  // does not launch evaluation, a provider request, or parameter application.
  tutorialVideo: "./static/media/tool-walkthrough.mp4",
});
