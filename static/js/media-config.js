/*
 * The only place to edit embedded media paths.
 * Header resources are disabled placeholders in index.html until release URLs
 * are ready. Loading embedded media does not activate those resources.
 * Use a relative URL inside ./static/ after checking the actual content and
 * metadata for anonymity. Leave unavailable or unverified assets as null.
 * Videos are local MP4/WebM files; heroMedia also accepts GIF/PNG/JPEG/WebP.
 * No external players, tracking scripts, or media-generation steps are used.
 */
window.FIND_LAB_MEDIA = Object.freeze({
  // User-selected findlab_parallel_hero.gif, copied unchanged: a 15-second
  // infinite loop, from a Nova Carter close-up to a grid of 15 configurations
  // across five environment families with 9 Nova Carter and 6 ANYmal-C robots.
  // Separately recorded episodes are replayed together at their original 1x
  // timestamps; each scene keeps its static geometry and terminal poses hold.
  // This is a recorded-state visualization, not a new live parallel evaluation,
  // an online-adaptation experiment, or an all-success demonstration.
  // The version suffix ensures browsers fetch the replacement GIF.
  heroMedia: "./static/media/hero.gif?v=476c3581",

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
