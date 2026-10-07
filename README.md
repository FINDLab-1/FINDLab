# FIND-Lab

Anonymous FIND-Lab project page for double-anonymous peer review. This is a static HTML/CSS page using the existing bundled Bulma stylesheet and plain JavaScript; it has no build step or package dependencies.

Published at <https://findlab-1.github.io/FINDLab/>.

## Edit the page

- Keep author names, affiliations, personal profiles, acknowledgments, and identifying logos withheld during review.
- Edit the five page areas in `index.html`: title/resources, Abstract, recorded parameter comparison/diagnosis flow/overview image, Research Overview, and Using FIND-Lab.
- Review images and videos for identifying text, faces, logos, paths, and metadata before adding them to `static/`.
- Enable a resource button only after checking its destination, account identity, repository history, and downloadable file metadata. Use `target="_blank" rel="noopener noreferrer"` for external links.
- Adjust the page styles in `static/css/index.css`.
- The search-engine indexing directive reduces discovery; it does not restrict access.

## Header resources and media paths

The header shows **Paper**, **Code**, and **Video** as disabled light-gray pill buttons in the original compact style. Their destinations are intentionally unset in `index.html`. Embedded media does not enable these header resources.

The manuscript's Abstract appears between the header and the GIF, with paragraph breaks for readability and its self-referential project-page URL omitted. The previous introduction below the GIF is removed to avoid repeating the abstract; the diagnosis flow and overview image slot follow the GIF.

Set embedded media paths in **`static/js/media-config.js`** only. Use a project-relative path inside `./static/` after reviewing the actual asset, not just its filename. Keep unavailable or unverified assets `null`. No media is generated or extracted by the page.

| Key | Intended resource | Current value |
| --- | --- | --- |
| `heroMedia` | Recorded ANYmal-C / DWA setting comparison, 12-second GIF loop | `./static/media/hero.gif` |
| `overviewImage` | Existing overview image matching the current Fig. 1 | `null` |
| `mainVideo` | User-selected research overview, 2:59.5 | `./static/media/research-overview.mp4` |
| `tutorialVideo` | Edited GUI walkthrough with saved diagnostic records, 2:10 | `./static/media/tool-walkthrough.mp4` |

The configuration comments describe the intended content and the manuscript's interpretation limits. The environment factors follow Table II; Fig. 7 contains individual re-evaluation episodes, distinct from the diagnostic input episode, and Table V reports descriptive pooled results only for its selected conditions.

The research overview is an unchanged copy of the supplied `FINDLab_graphs_synced.mp4`. Its edited geometry transitions illustrate configurations; they should not be described as online adaptation or the paper's controlled factor sweeps. Videos support MP4/WebM; the hero also supports GIF/PNG/JPEG/WebP. The overview image supports GIF/PNG/JPEG/WebP. Text alternatives are maintained in `static/js/index.js`.

The hero is an unchanged copy of the user-selected `findlab_hero.gif`: an illustrative ANYmal-C / DWA comparison under original and proposed settings, rather than the initially planned MPPI comparison. The caption and text alternative describe the supplied footage. The tutorial is an unchanged copy of `findlab_tool_walkthrough.mp4`. It uses edited GUI captures and saved results; it does not show a new evaluation, provider request, or parameter application being run. No new media was generated for the page.

The hero and both video areas reserve a 16:9 ratio; the overview image reserves 2:1. Empty areas contain no player or broken image. Missing or invalid assets leave the area blank. The supplied GIF repeats using its embedded loop setting. An MP4/WebM hero uses muted inline looping playback with a pause button, and reduced-motion preferences suppress its autoplay. All assets are served from the same site, with no external video embeds, fonts, or analytics.

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
