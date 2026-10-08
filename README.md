# FIND-Lab

Anonymous FIND-Lab project page for double-anonymous peer review. The site uses static HTML, the existing bundled Bulma stylesheet, custom CSS, and plain JavaScript. There is no build step or application dependency.

## Page structure

`index.html` contains the title and resources, clean recorded hero, full Abstract and three takeaways, Research Overview, Factor-Controlled Environments, Outcomes and Termination Locations, Nearby Termination Locations / Different Behaviors, a testable adjustment, Quantitative Re-evaluation, and Using FIND-Lab. The author line remains **Anonymous Authors for IEEE ICRA 2027 submission**.

The main reading path is **1 Configure → 2 Measure → 3 Inspect → 4 Propose & test**, with matching navigation anchors and section markers. The short Measure section distinguishes runtime outcomes from last-valid-pose termination locations. Quantitative re-evaluation continues the fourth stage.

**Video** links to `#research-overview`. **Paper** and **Code** remain disabled until anonymous release destinations are verified. There are no external video players, fonts, analytics, or model calls. The existing template attribution is retained.

Edit layout in `static/css/index.css` and behavior in `static/js/index.js`. Desktop media use up to 1120 px and prose up to 760 px. Mobile shows individual environment images, a text workflow, HTML proposal comparisons, and the results table instead of shrinking long diagrams.

## Media and data

All replaceable paths are in **`static/js/media-config.js`**. Use project-relative URLs under `./static/`; unsupported, external, empty, or null paths are ignored. JSON image paths resolve against `assetRoot`, not the JSON file's `data/` directory. Keep absent or unverified resources null.

| Configuration key | Resource |
| --- | --- |
| `heroMedia`, `heroPoster` | Existing clean 15 s loop and supplied still poster |
| `overviewImage` | Workflow PNG exported from the adjacent SVG, at its actual 1600 × 610 ratio |
| `mainVideo`, `mainPoster` | Existing 179.5 s overview; no separate poster supplied |
| `environmentGallery` | Five environment kinds, six sweeps, three archived initial views each |
| `diagnosisVideo`, `diagnosisPoster` | Additional 32 s MPPI diagnostic comparison |
| `proposalImage` | ANYmal-C / DWA aggregate and diagnostic input comparison |
| `pairedVideo`, `pairedPoster` | Recorded 24 s F/A/L example |
| `resultsImage`, `resultsData` | Supplied pooled chart and exact Table V counts |
| `tutorialVideo`, `tutorialPoster` | 130 s anonymized GUI walkthrough with revised presentation titles |
| `tutorialChapters`, `tutorialTrack` | Chapter JSON and VTT: 6, 56, 82, 112 seconds |

Public assets reside under `static/media/findlab/{images,video,data}`. The workflow PNG is exported from its adjacent SVG. The 32 s diagnostic comparison, 24 s recorded setting comparison, and 130 s tutorial have revised presentation copy exported from their existing sources. Recorded trajectories, outcomes, timing, and numerical data are preserved. The hero and 179.5 s research overview remain unchanged; the latter has contextual page captions because its current edit project was not identified. Existing media paths are retained and content hashes version the URLs; private production material is excluded. Unused triptych WebPs remain available because the gallery JSON references them; the page uses the individual setting images.

Environment descriptions and labels in HTML are a snapshot of `environment-gallery.json`, with images selected through that JSON. The accessible results table is a source-checked snapshot of `pooled-results.json` / `.csv`; JavaScript refreshes the cells from the JSON after validating counts and percentages. If those datasets change, update their corresponding HTML snapshots. Presentation copy may be regenerated from its source; keep numerical data, saved GUI result fields, recorded trajectories, timing, and outcomes unchanged.

## Interpretation and interaction

- The hero visualizes separately recorded episodes in static Isaac Sim scenes. It is a presentation replay, not a new live parallel evaluation. It has a supplied poster, a visible Play/Pause button, and click-to-toggle playback. Reduced motion shows a static poster until explicit Play.
- Straight varies width; Single-Bend and S-Bend vary bend θ at fixed 1.2 m width; Recovery Pocket varies initial heading ψ₀; U-Shape varies angular spacing d or curved radius r. The gallery shows selected initial configurations, not outcomes or live geometry changes.
- The MPPI diagnostic comparison is an additional archived U-Shape / curved case, not the exact manuscript Fig. 5 pair. Body clearance excludes articulated legs and does not determine the runtime contact outcome.
- The ANYmal-C / DWA proposals are hypotheses. Their planning obstacle envelope is distinct from physical robot dimensions and diagnostic body clearance. The F episode in the recorded comparison is distinct from the LLM input episode.
- Pooled results are descriptive, in-sample results on 29 selected Nova Carter conditions. Compare A/L within each method. F is historical; PPO A/L include training; identical proposals may share executions.
- The tool's configuration demonstration and saved result are separate examples. Chapter buttons seek after metadata is ready and support native Enter/Space activation. The tutorial’s assistant help header is cropped from its existing screenshot, while provider status, the empty report and validation state remain visible. The assistant-comparison option is outside the reported study. No evaluation, model request, or parameter application is executed by the page or walkthrough.

Environment tabs use roving keyboard focus, arrow/Home/End selection, and native Enter/Space activation. Hidden panels pause any contained videos. Only the hero autoplays. Off-screen media load near the viewport; video players appear at `loadedmetadata` rather than depending on `loadeddata`. Missing files retain a quiet media frame with no broken image or empty video controls. Image and video dimensions determine their rendered aspect ratios.

Keep author names, affiliations, personal profiles, private paths, and identifying metadata out of public assets. Inspect content as well as metadata before adding a new asset. The `noindex` directive reduces discovery; it does not restrict access.

## Configure Git before editing

Use these settings in this repository only:

```sh
git config --local user.name "FINDLab-1"
git config --local user.email "327827369+FINDLab-1@users.noreply.github.com"
git config --local user.useConfigOnly true
git config --local core.hooksPath .githooks
git config --local credential.username FINDLab-1
```

The commit hook checks both author and committer identities. The push hook also checks outgoing history and the authenticated GitHub account. Authenticate as `FINDLab-1` over HTTPS before publishing. Hooks are a local safeguard and must be enabled in every clone; they do not guarantee anonymity of future content or erase previously published copies.

## Preview locally

Run this command in the repository root (Node.js is required for this preview command):

```sh
npx --yes http-server . -a 127.0.0.1 -p 8000 -c-1
```

Open `http://localhost:8000/`.

This preview server supports HTTP byte-range requests, so the MP4 seek bar works locally. No build step is needed.

## Publish with GitHub Pages

Upload this folder's contents, including `.nojekyll`, to the root of `FINDLab-1/FINDLab`.
In **Settings → Pages**, select **Deploy from a branch**, choose the branch containing these files, select **/(root)**, and save.

With the default project-site address, the published site will be at `https://findlab-1.github.io/FINDLab/` after deployment succeeds.

See [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Credits

The [Nerfies website template](https://github.com/nerfies/nerfies.github.io) is licensed under [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Its attribution and license notice are retained in the page footer. Bundled third-party assets retain their license notices.
