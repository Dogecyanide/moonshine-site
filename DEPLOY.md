# Deploying the Moonshine site (GitHub Pages, free)

Static site with no build step to deploy: `index.html`, `style.css`, `main.js`, `guide.js`, `assets/`. (The books inside `index.html` are generated ahead of time, see below.)
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

## The two books (All features and Version history)
Both books are plain HTML inside `index.html`, written there by scripts that live outside this repo, in `/workspace/guide/` on the build box:
- `build.py` writes the guidebook between `<!-- GUIDE:START -->` and `<!-- GUIDE:END -->` (content in `content1.py` to `content5.py`), and then calls `build_history.py`.
- `build_history.py` writes the Version history book between `<!-- HISTORY:START -->` and `<!-- HISTORY:END -->`, and its cover into every `<!--hcover-->` slot. It reads the GitHub releases from `releases.json` and the summaries from `history_content.py`.
- `guide.js` runs both books (open, close, page flips, `#guide/<chapter>` and `#history/<version>` links).

After a new Moonshine release:
1. `python3 /workspace/guide/build_history.py --fetch` downloads the release list again and rebuilds both books. The new release gets a chapter straight away, with its title, date and files, and the script prints a warning that it has no summary yet.
2. Add a `rel("<exact tag>", name_en=..., name_ja=..., en=..., ja=...)` entry at the top of `history_content.py` (newest first, no em or en dashes), then run `python3 /workspace/guide/build.py`.
3. Commit `index.html` and push.

The top tabs group releases by minor version from V2.0 on (V2.3, V2.2, ...), then V1.x, the V1.0 release candidates and V0.x; a new minor version gets its own tab automatically. Dates are shown in Amsterdam time.

## Local preview
`python3 -m http.server 8000` in this folder, then open http://localhost:8000.

## Menu theme assets

The look copies Moonshine's in-game "Delfino guidebook" menu (`src/menu_theme.cpp`, `include/susamune/menu_palette.h`).

- `assets/menu/`: paper tiles tinted from `guide_back`, the MOONSHINE heading decoded from `src/menu_subtitle_title.cpp`, and two-frame sprite strips (palm, fish, ship, gloved hand, tab icons) built from the menu's artwork, which is extracted from Super Mario Sunshine (© Nintendo). `tab-pad.png` frame 2 is Moonshine's own `controller-pose2` icon.
- Frames swap with CSS `steps()` at the menu's cadence (about 0.75 s per pose, 0.375 s for the hand) and hold still under `prefers-reduced-motion`.
- `assets/fonts/`: M PLUS Rounded 1c (Medium, ExtraBold), subset to the characters the site uses. SIL Open Font License 1.1, see `assets/fonts/OFL.txt`.
