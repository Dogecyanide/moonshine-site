# Deploying the Moonshine site (GitHub Pages, free)

Static site with no build step: `index.html`, `style.css`, `main.js`, `assets/`.
`preview-*.png` and this file don't need to be published, but they do no harm.

**Never push this to the upstream repo (panther03/moonshine) or its `main` branch.**

## Option A (recommended): a separate repo, e.g. `Dogecyanide/moonshine-site`
1. Create an empty public repo `moonshine-site` on github.com/Dogecyanide.
2. From this folder:
   ```
   git init -b main
   git add index.html style.css main.js assets DEPLOY.md
   git commit -m "Moonshine site"
   git remote add origin https://github.com/Dogecyanide/moonshine-site.git
   git push -u origin main
   ```
3. In the repo, go to Settings → Pages → Build and deployment → Source: **Deploy from a branch**, Branch: `main` / `(root)` → Save.
4. After about a minute the site is live at `https://dogecyanide.github.io/moonshine-site/`.
   (If you name the repo `dogecyanide.github.io`, it's served at `https://dogecyanide.github.io/` instead.)

## Option B: a `gh-pages` branch on your fork (Dogecyanide/susamune)
```
git -C <fork checkout> switch --orphan gh-pages
# copy the site files in, then:
git add index.html style.css main.js assets && git commit -m "Moonshine site"
git push fork gh-pages          # "fork" = Dogecyanide/susamune, NOT origin
```
Then Settings → Pages → Branch: `gh-pages` / `(root)`. URL: `https://dogecyanide.github.io/susamune/`.
Do this from a separate clone or worktree so you don't disturb your working tree.

## Custom domain (optional)
Settings → Pages → Custom domain. Add a `CNAME` DNS record pointing at `dogecyanide.github.io`, then tick "Enforce HTTPS".

## Setting the trailer
Open `main.js`. At the top:
```js
const TRAILER_YOUTUBE_ID = "";
```
Put the video ID in the quotes. For `https://www.youtube.com/watch?v=AbCdEfGhIjK` (or `https://youtu.be/AbCdEfGhIjK`), the ID is `AbCdEfGhIjK`.
Commit and push, and Pages redeploys automatically. While the ID is empty, a "Trailer coming soon" card is shown.

## How the download button stays current
`main.js` calls `https://api.github.com/repos/panther03/moonshine/releases/latest` and picks the asset whose name contains:
- `ENGLISH-MENUS_Launcher` (the main "Download for Wii" button and the first card)
- `JAPANESE-MENUS_Launcher`, `ENGLISH-MENUS_Dolphin` and `JAPANESE-MENUS_Dolphin` (the other cards)

If the API is unreachable or rate-limited (60 requests per hour per visitor IP), or an asset name changes, every link falls back to `https://github.com/panther03/moonshine/releases/latest`.
Keep that naming pattern in future release ZIPs, or update the `data-asset` keys in `index.html`.
To point at a different repo, change `REPO` in `main.js` and the hard-coded links in `index.html`.

## Local preview
`python3 -m http.server 8000` in this folder, then open http://localhost:8000.
