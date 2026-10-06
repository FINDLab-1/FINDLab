# FINDLab

Anonymous FINDLab project page for double-anonymous peer review.

Published at <https://findlab-1.github.io/FINDLab/>.

## Edit the page

- Keep author names, affiliations, personal profiles, acknowledgments, and identifying logos withheld during review.
- Add the project description and abstract in `index.html`.
- Review images and videos for identifying text, faces, logos, paths, and metadata before adding them to `static/`.
- Enable a resource button only after checking its destination, account identity, repository history, and downloadable file metadata. Use `target="_blank" rel="noopener noreferrer"` for external links.
- Adjust the page styles in `static/css/index.css`.
- The search-engine indexing directive reduces discovery; it does not restrict access.

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

Run this command in the repository root:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://localhost:8000/`.

## Publish with GitHub Pages

Upload this folder's contents, including `.nojekyll`, to the root of `FINDLab-1/FINDLab`.
In **Settings → Pages**, select **Deploy from a branch**, choose the branch containing these files, select **/(root)**, and save.

With the default project-site address, the published site will be at `https://findlab-1.github.io/FINDLab/` after deployment succeeds.

See [GitHub's publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Credits

The [Nerfies website template](https://github.com/nerfies/nerfies.github.io) is licensed under [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Its attribution and license notice are retained in the page footer. Bundled third-party assets retain their license notices.
