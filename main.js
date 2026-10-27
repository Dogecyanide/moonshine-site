// ======================================================================
// TRAILER: paste the YouTube video ID here once the trailer is up.
// e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ use "dQw4w9WgXcQ".
// Leave it empty ("") to show the "Trailer coming soon" card.
const TRAILER_YOUTUBE_ID = "";
// ======================================================================

const REPO = "panther03/moonshine"; // upstream repo whose Releases we link to
const FALLBACK = `https://github.com/${REPO}/releases/latest`;
const DISCORD = "https://discord.gg/72c42Teq3A";

// ---------------------------------------------------------------------
// Translations. English lives in index.html (captured at load);
// Japanese below. Terminology follows doc/guide-ja.md in the repo.
// ---------------------------------------------------------------------
const JA = {
  title: "Moonshine：スーパーマリオサンシャイン練習mod",
  tagline: "スーパーマリオサンシャインの練習用mod",
  sub: "WiiとDolphinで遊べる、スーパーマリオサンシャインのフル機能の練習mod。エミュレーターのような3つのステート、Geckoコードの内蔵、ILシステム、ゴーストとの競走・観察・ダウンロード、最大4人のオンライン対戦、乱数の操作など、まだまだたくさん。<strong>日本版1.0</strong>・<strong>欧州版</strong>・<strong>北米版</strong>に対応。",
  dlMain: "Wii版をダウンロード",
  dlDolphin: "Dolphin版をダウンロード",
  jpOnly: "日本版専用",
  latestRelease: "最新リリース",
  discord: "Discordに参加",
  github: "GitHubで見る",
  fetching: "最新リリースを取得中…",
  welcomeH: "ようこそ",
  chooseH: "ダウンロードを選ぶ",
  chooseLead: "Wii実機は<strong>Launcher</strong>のZIP、Dolphinは<strong>Dolphin</strong>のZIPを選んでください。メニューの言語はゲームの地域ではなく、ダウンロードの種類で決まります。",
  c1tag: "Wii",
  c1h: "English Launcher <span class=\"h-sub\">英語メニュー</span>",
  c1p: "Homebrew Channel用。日本・北米・欧州版に対応。すべて英語で表示します。",
  c2tag: "Wii · おすすめ",
  c2h: "日本語ランチャー <span class=\"h-sub\">日本語メニュー</span>",
  c2p: "日本・北米・欧州版に対応。ランチャーは日本語、ゲーム内メニューは日本版で日本語、北米・欧州版では英語です。",
  c3tag: "Dolphin",
  c3h: "Dolphin <span class=\"h-sub\">英語メニュー</span>",
  c3p: "自分で用意したクリーンなISO用のBPSパッチ。日本・北米・欧州版に対応。",
  c4tag: "Dolphin · 日本語",
  c4h: "Dolphin <span class=\"h-sub\">日本語版</span>",
  c4p: "Moonshineのメニューが日本語で表示されます。日本版のクリーンなISO用のBPSパッチです。",
  allFiles: "すべてのファイルは<a href=\"https://github.com/panther03/moonshine/releases\">GitHub Releases</a>から直接配布されています。",
  notes: "リリースノートを読む →",
  installH: "インストール",
  wiiH: "Wii（実機）",
  wii1: "<strong>English Launcher</strong>か<strong>日本語ランチャー</strong>のZIPをダウンロードします。",
  wii2: "ZIPの中身をSDカードの一番上にコピーします。<code>apps</code>フォルダーの中に<code>moonshine_launcher</code>フォルダーが入ればOKです。",
  wii3: "Homebrew Channelから起動し、ゲーム版と設定を選んだら、あとは楽しむだけ。",
  wiiNote: "更新する場合は、アプリのファイルを置き換え、ランチャーとmodのファイルは同じZIPのものを使ってください。<code>apps/susamune_launcher</code>が残っている場合は、先に<code>apps/moonshine_launcher</code>へ名前を変更します。設定・記録・ゴースト・ステートは<code>/Moonshine data</code>に保存されます。",
  dolH: "Dolphin（エミュレーター）",
  dol1: "<strong>Dolphin</strong>のZIPをダウンロードします。",
  dol2: "<a href=\"https://github.com/Alcaro/Flips/releases\" target=\"_blank\" rel=\"noopener\">Floating IPS</a>などのBPSパッチャーで、対応するBPSパッチを自分のクリーンなISOに適用します。パッチは書き込み前に元のイメージを確認します。",
  dol3: "設定を保存するため、<strong>スロットB</strong>にMoonshine用のメモリーカードを挿してください。スロットAは通常のセーブ用のままです。ゴーストとオンラインにはDolphinの設定がいくつか必要です。ガイドブックの「Dolphin」の章をご覧ください。",
  dol4: "ステートで汚れを正しく保存・読み込みするには、<em>グラフィック設定 → Hacks → Texture Cache Accuracy</em>を<strong>Safe</strong>にします。",
  dolNote: "DolphinもWiiと同等です。Wiiのプレイヤーとのオンライン対戦や Delfino Ghosts を含め、すべての機能をどちらでも使えます。ファイルはメモリーカードに保存するため、容量に限りがあり、SDカードより少し保存に時間がかかります。",
  warn: "Geckoコードを有効にしたままMoonshineを使うことは強くおすすめしません。Moonshineの機能を壊すか、逆に壊される原因になります。Wiiでは、ランチャーの Settings で<strong>GCコントローラ直接接続</strong>（Native Controls、Nintendont の Native Control）をオンにしてください。ゲームキューブ実機には対応していません。",
  featH: "主な機能",
  f1: "3スロット使える<strong>ステート</strong>で、練習を一気に加速。SDカードに保存して後で使うこともできます。",
  f2: "<strong>さらに進化した練習コード</strong>：従来のGeckoコードをすべて移植し、多くを改良しました。タイマー、メタデータ、レベルセレクトなど。",
  f3: "見て、競って、共有できる<strong>ゴースト</strong>。Delfino Ghosts からみんなのゴーストもダウンロードできます！走りを好きな位置まで戻して、ゴーストから操作を引き継ぎ、そのままILを最後まで走ることもできます！",
  f4: "<strong>コマ送り、実機でのTAS、フリーカメラ</strong>（カメラパス付き）。自分好みに使いこなそう。",
  f5: "PBの記録、PB更新時のファンファーレ、実績まで備えた<strong>ILシステム</strong>！",
  f6: "タイマーからマリオの靴の色まで、<strong>すべてをカスタマイズ</strong>。グラデーションやアニメーションも含め、Moonshineのほぼすべてを自分好みにできます。",
  f7: "<strong>オンライン対戦</strong>：IL、Stageloader、ドラフトセットで最大3人の友だちとリアルタイムに競走。画面にはスコアバーも表示されます。WiiとDolphinの間でも遊べます。",
  f8: "速度を落としたプレイやコリジョン表示などの<strong>練習ツール</strong>、どの設定もすぐ見つかるメニュー検索も。",
  guides: "このプロジェクトはAIの支援を受けて開発しています。バグやクラッシュは<a href=\"https://discord.gg/72c42Teq3A\">Discord</a>または<a href=\"https://github.com/panther03/moonshine/issues\">GitHubのIssues</a>で報告してください。クラッシュ報告は<code>Moonshine data</code> &gt; <code>crashes</code>にあります。ガイド：<a href=\"https://github.com/panther03/moonshine/blob/main/doc/guide-ja.md\">日本語</a> · <a href=\"https://github.com/panther03/moonshine/blob/main/doc/guide-en.md\">English</a>",
  allReleases: "すべてのリリース",
  allFeat: "全機能ガイド",
  allFeatMeta: "ガイドブックを開く",
  legal: "Moonshineはファンが制作したmodです。スーパーマリオサンシャインは© Nintendoです。ゲーム本体はご自身でご用意ください。",
  soonTitle: "トレーラー近日公開",
  soonSub: `最新情報は<a href="${DISCORD}">Discord</a>で。`,
  menusEn: "英語メニュー",
  menusJa: "日本語メニュー",
  latestLine: (name, date) => `最新版：${name} · ${date}公開`,
  offline: `GitHubに接続できませんでした。<a href="${FALLBACK}">最新リリースのページ</a>から直接ダウンロードできます。`,
  themeGroup: "テーマ",
  themeLight: "ライトテーマ",
  themeDark: "ダークテーマ",
  skip: "ダウンロードへ移動",
  tabWelcome: "ようこそ",
  tabDownload: "ダウンロード",
  tabInstall: "導入方法",
  tabFeatures: "機能",
  toTop: "トップへ戻る",
  tabsLabel: "セクション",
  prevSection: "前のセクション",
  nextSection: "次のセクション",
  linksLabel: "リンク",
  wiiUsb: "過去にUSBからの読み込みで問題が起きたことがあるため、SDからの読み込みをおすすめします。",
  gHeading: "全機能ガイド",
  gClose: "本を閉じる",
  gDownload: "ダウンロード",
  gBack: "戻る",
  gFullGuide: "GitHubの公式ガイド",
  gVersion: "Moonshine V2.3.3向け。プロジェクトのガイドとリリースノートをもとに書いています。",
  gTabs: "カテゴリー",
  gPrevCat: "前のカテゴリー",
  gNextCat: "次のカテゴリー",
  gChLabel: "章",
  gPnLabel: "前後の章",
  verHist: "バージョン履歴",
  verHistMeta: "各リリースの追加内容",
  booksLabel: "本",
  hHeading: "バージョン履歴：すべてのリリースを新しい順に",
  hGitHub: "GitHubで見る",
  hTabs: "バージョン",
  hPrevCat: "新しいバージョン",
  hNextCat: "古いバージョン",
  hChLabel: "リリース",
  hPnLabel: "新しいリリースと古いリリース",
  faq: "よくある質問",
  faqMeta: "すぐ分かる答え",
  booksTitle: "ガイドブック：",
  creditsH: "クレジット",
  credDev: "開発",
  credJa: "日本語翻訳",
  credTest: "テストプレイ",
  fHeading: "よくある質問",
  fDiscord: "Discordで質問する",
  fTabs: "トピック",
  fPrevCat: "前のトピック",
  fNextCat: "次のトピック",
  fChLabel: "質問",
  fPnLabel: "前後の質問",
  comm: "コミュニティ",
  commMeta: "プレイヤーが作ったサイト",
  cHeading: "コミュニティの作品",
  cTabs: "セクション",
  cPrevCat: "前のセクション",
  cNextCat: "次のセクション",
  cChLabel: "サイト",
  cPnLabel: "前後のサイト",
  cFrame: "埋め込みサイト",
};
const EN_EXTRA = {
  title: document.title,
  soonTitle: "Trailer coming soon",
  soonSub: `Follow along on the <a href="${DISCORD}">Discord</a>.`,
  menusEn: "English menus",
  menusJa: "Japanese menus",
  jpOnly: "JP only",
  latestLine: (name, date) => `Latest: ${name} · released ${date}`,
  offline: `Couldn't reach GitHub. You can still download from the <a href="${FALLBACK}">latest release page</a>.`,
  themeGroup: "Theme",
  themeLight: "Light theme",
  themeDark: "Dark theme",
  tabsLabel: "Sections",
  prevSection: "Previous section",
  nextSection: "Next section",
  linksLabel: "Links",
  gTabs: "Categories",
  gPrevCat: "Previous category",
  gNextCat: "Next category",
  gChLabel: "Chapters",
  gPnLabel: "Previous and next chapter",
  booksLabel: "Books",
  hTabs: "Versions",
  hPrevCat: "Newer versions",
  hNextCat: "Older versions",
  hChLabel: "Releases",
  hPnLabel: "Newer and older release",
  fTabs: "Topics",
  fPrevCat: "Previous topic",
  fNextCat: "Next topic",
  fChLabel: "Questions",
  fPnLabel: "Previous and next question",
  cTabs: "Sections",
  cPrevCat: "Previous section",
  cNextCat: "Next section",
  cChLabel: "Sites",
  cPnLabel: "Previous and next site",
  cFrame: "Embedded site",
};

const EN = { ...EN_EXTRA };
document.querySelectorAll("[data-i18n]").forEach(el => {
  if (!(el.dataset.i18n in EN)) EN[el.dataset.i18n] = el.innerHTML;
});

let lang = "en";
let rel = null; // latest release, once fetched
const t = k => (lang === "ja" ? JA : EN)[k];

function pickLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "ja" || q === "en") return q;
  try { const s = localStorage.getItem("lang"); if (s === "ja" || s === "en") return s; } catch (e) {}
  return (navigator.language || "").toLowerCase().startsWith("ja") ? "ja" : "en";
}

function setLang(l, remember) {
  lang = l;
  document.documentElement.lang = l;
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = t(el.dataset.i18n);
    if (typeof v === "string") el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  document.querySelectorAll("[data-i18n-title]").forEach(el => el.setAttribute("title", t(el.dataset.i18nTitle)));
  document.querySelectorAll(".lang-toggle button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
  if (remember) {
    try { localStorage.setItem("lang", l); } catch (e) {}
    const u = new URL(location.href);
    if (u.searchParams.has("lang")) { u.searchParams.set("lang", l); history.replaceState(null, "", u); }
  }
  // The menu keeps one row selected: the recommended launcher for this language.
  document.querySelectorAll(".row.dl").forEach((r, i) => r.classList.toggle("is-default", i === (l === "ja" ? 1 : 0)));
  renderTrailer();
  renderRelease();
  document.dispatchEvent(new CustomEvent("langchange", { detail: l }));
}

function renderTrailer() {
  const slot = document.getElementById("trailer-slot");
  const id = TRAILER_YOUTUBE_ID.trim();
  if (id) {
    if (slot.querySelector("iframe")) return;
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`;
    f.title = "Moonshine trailer";
    f.loading = "lazy";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.allowFullscreen = true;
    slot.appendChild(f);
  } else {
    slot.classList.add("soon");
    slot.innerHTML = `<div class="soon-inner"><div class="soon-sun"></div><p class="soon-title">${t("soonTitle")}</p><p class="soon-sub">${t("soonSub")}</p></div>`;
  }
}

const fmtSize = b => (b / 1048576).toFixed(1) + " MB";

function renderRelease() {
  const info = document.getElementById("release-info");
  if (rel === false) { info.innerHTML = t("offline"); return; }
  if (!rel) return; // still fetching; the fetching text is already translated
  const zips = (rel.assets || []).filter(a => /\.zip$/i.test(a.name));
  const find = key => zips.find(a => a.name.toLowerCase().includes(key.toLowerCase()));
  const date = new Date(rel.published_at).toLocaleDateString(lang === "ja" ? "ja-JP" : "en-GB",
    { year: "numeric", month: lang === "ja" ? "long" : "short", day: "numeric" });
  info.textContent = t("latestLine")(rel.name || rel.tag_name, date);
  document.getElementById("notes-link").href = rel.html_url;

  // Download cards on the page, plus the download links in the guidebook (.g-dl).
  document.querySelectorAll("a[data-asset]").forEach(card => {
    const a = find(card.dataset.asset);
    if (!a) return; // keep fallback link to the release page
    card.href = a.browser_download_url;
    const file = card.querySelector(".file");
    if (file) file.textContent = `${rel.tag_name} · ${fmtSize(a.size)}`;
    else card.title = `${a.name} (${rel.tag_name}, ${fmtSize(a.size)})`;
  });

  // Main button: in Japanese, prefer the Japanese-menus launcher.
  const order = lang === "ja"
    ? [["JAPANESE-MENUS_Launcher", "menusJa"], ["ENGLISH-MENUS_Launcher", "menusEn"]]
    : [["ENGLISH-MENUS_Launcher", "menusEn"], ["JAPANESE-MENUS_Launcher", "menusJa"]];
  let main = null, label = "";
  for (const [k, l] of order) { main = find(k); if (main) { label = t(l); break; } }
  if (!main) main = find("Launcher") || zips[0];
  if (main) {
    document.getElementById("dl-main").href = main.browser_download_url;
    document.getElementById("dl-main-meta").textContent =
      [rel.tag_name, label, fmtSize(main.size)].filter(Boolean).join(" · ");
  }

  // Dolphin button: English menus BPS (all regions), or the Japanese-menus BPS (JP 1.0 only) in Japanese.
  const dolOrder = lang === "ja"
    ? [["JAPANESE-MENUS_Dolphin", ["menusJa", "jpOnly"]], ["ENGLISH-MENUS_Dolphin", ["menusEn"]]]
    : [["ENGLISH-MENUS_Dolphin", ["menusEn"]], ["JAPANESE-MENUS_Dolphin", ["menusJa", "jpOnly"]]];
  let dol = null, dolLabels = [];
  for (const [k, ls] of dolOrder) { dol = find(k); if (dol) { dolLabels = ls.map(t); break; } }
  if (!dol) dol = find("Dolphin");
  if (dol) {
    document.getElementById("dl-dolphin").href = dol.browser_download_url;
    document.getElementById("dl-dolphin-meta").textContent =
      [rel.tag_name, ...dolLabels, fmtSize(dol.size)].filter(Boolean).join(" · ");
  }
}

document.querySelectorAll(".lang-toggle button").forEach(b =>
  b.addEventListener("click", () => setLang(b.dataset.lang, true)));
setLang(pickLang(), false);

// ---------------------------------------------------------------------
// Theme + background video. The inline script in <head> already chose
// the theme and a clip number (window.__bg) and set the poster.
// Clips live in assets/bg/{light,dark}-{1..5}.{mp4,webm,jpg}.
// ---------------------------------------------------------------------
const CLIP_COUNT = 5;
const THEME_COLOR = { dark: "#1f3326", light: "#36553c" };
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const bgEl = document.getElementById("bg");
let bg = window.__bg || { theme: document.documentElement.dataset.theme || "dark", n: 1 };

function randomClip(exclude) {
  let n;
  do { n = 1 + Math.floor(Math.random() * CLIP_COUNT); } while (CLIP_COUNT > 1 && n === exclude);
  return n;
}

// Clips do not loop: when one ends, a different random clip from the same
// theme crossfades in. The next clip is preloaded in a second, hidden <video>.
let bgGen = 0;

function makeClip(n) {
  const base = `assets/bg/${bg.theme}-${n}`;
  const v = document.createElement("video");
  v.muted = true; v.defaultMuted = true; v.loop = false; v.autoplay = false; v.playsInline = true;
  v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("disablepictureinpicture", "");
  v.preload = "auto"; v.tabIndex = -1;
  v.poster = `${base}.jpg`;
  for (const [ext, type] of [["webm", 'video/webm; codecs="vp9"'], ["mp4", "video/mp4"]]) {
    const s = document.createElement("source");
    s.src = `${base}.${ext}`; s.type = type; v.appendChild(s);
  }
  v.dataset.n = n;
  return v;
}

function dropClip(v) {
  if (!v) return;
  v.pause(); v.querySelectorAll("source").forEach(s => s.remove()); v.removeAttribute("src"); v.load(); v.remove();
}

function startClip(v, gen) {
  let next = null, switching = false;
  const prepare = () => {
    if (next || gen !== bgGen) return;
    next = makeClip(randomClip(Number(v.dataset.n)));
    bgEl.appendChild(next); // stacked on top, invisible until it plays
    next.load();
  };
  const handOff = () => {
    if (switching || gen !== bgGen) return;
    switching = true;
    if (!next) prepare();
    const n = next;
    n.addEventListener("playing", () => {
      if (gen !== bgGen) return;
      bg.n = Number(n.dataset.n);
      document.documentElement.style.setProperty("--poster", `url(assets/bg/${bg.theme}-${bg.n}.jpg)`);
      n.classList.add("on");
      setTimeout(() => dropClip(v), 900);
      startClip(n, gen);
    }, { once: true });
    n.addEventListener("error", () => { if (gen === bgGen) { dropClip(n); v.currentTime = 0; v.play().catch(() => {}); } }, { once: true });
    const p = n.play(); if (p) p.catch(() => {});
  };
  v.addEventListener("timeupdate", () => {
    if (!v.duration || !isFinite(v.duration)) return;
    const left = v.duration - v.currentTime;
    if (left < 6) prepare();
    if (left < 0.9) handOff();
  });
  v.addEventListener("ended", handOff);
}

function renderBackground() {
  const gen = ++bgGen;
  const base = `assets/bg/${bg.theme}-${bg.n}`;
  document.documentElement.style.setProperty("--poster", `url(${base}.jpg)`);
  bgEl.querySelectorAll("video").forEach(dropClip);
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduceMotion.matches || saveData) return; // poster only
  const v = makeClip(bg.n);
  v.autoplay = true;
  v.addEventListener("playing", () => v.classList.add("on"), { once: true });
  bgEl.appendChild(v);
  startClip(v, gen);
  const p = v.play(); if (p) p.catch(() => {});
}

function applyTheme(theme, remember) {
  const changed = theme !== bg.theme;
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = THEME_COLOR[theme];
  document.querySelectorAll(".theme-toggle button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.themeSet === theme)));
  if (remember) { try { localStorage.setItem("theme", theme); } catch (e) {} }
  if (changed) { bg = { theme, n: randomClip() }; }
  return changed;
}

document.querySelectorAll(".theme-toggle button").forEach(b =>
  b.addEventListener("click", () => { if (applyTheme(b.dataset.themeSet, true)) renderBackground(); }));

// Follow the OS setting live until the visitor picks a theme themselves.
matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => {
  let saved = null; try { saved = localStorage.getItem("theme"); } catch (err) {}
  if (saved || new URLSearchParams(location.search).get("theme")) return;
  if (applyTheme(e.matches ? "light" : "dark", false)) renderBackground();
});
reduceMotion.addEventListener("change", renderBackground);

applyTheme(bg.theme, false);
renderBackground();

(async function fetchRelease() {
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers: { Accept: "application/vnd.github+json" } });
    if (!r.ok) throw new Error(r.status);
    rel = await r.json();
  } catch (e) {
    rel = false;
  }
  renderRelease();
})();

// ---------------------------------------------------------------------
// Tab strip: highlight the section in view, L/R step between sections.
// ---------------------------------------------------------------------
const tabs = [...document.querySelectorAll("#top .tab")];
const tabSections = tabs.map(a => document.querySelector(a.getAttribute("href")));
let activeTab = -1;
function setTab(i) {
  if (i === activeTab) return;
  activeTab = i;
  tabs.forEach((a, j) => {
    a.classList.toggle("is-active", j === i);
    if (j === i) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
  });
  const a = tabs[i];
  if (a) {
    const list = a.parentElement;
    const l = a.offsetLeft - list.offsetLeft, r = l + a.offsetWidth;
    if (l < list.scrollLeft || r > list.scrollLeft + list.clientWidth)
      list.scrollTo({ left: l - 8, behavior: reduceMotion.matches ? "auto" : "smooth" });
  }
}
function updateTab() {
  const nav = document.querySelector("#top .tabs");
  const line = nav.getBoundingClientRect().bottom + 24;
  let i = 0;
  tabSections.forEach((sec, j) => { if (sec && sec.getBoundingClientRect().top <= line) i = j; });
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) i = tabs.length - 1;
  setTab(i);
}
let tabTick = false;
addEventListener("scroll", () => {
  if (tabTick) return; tabTick = true;
  requestAnimationFrame(() => { tabTick = false; updateTab(); });
}, { passive: true });
addEventListener("resize", updateTab);
updateTab();
document.querySelectorAll("#top .shoulder").forEach(b => b.addEventListener("click", () => {
  const i = Math.max(0, Math.min(tabs.length - 1, activeTab + Number(b.dataset.step)));
  tabSections[i].scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" });
  setTab(i);
}));

// One beat for every looping sprite. CSS animations each start their own
// clock when they appear (tab switched, book opened, language toggled), so
// pin them all to the page timeline's origin; they then flip frames together.
// Hover wiggles are left alone, and reduced motion has no loops to sync.
(() => {
  if (!document.getAnimations) return;
  const BEAT = new Set(["pose", "lean", "pianta", "bk-hop"]);
  const align = el => {
    for (const a of el.getAnimations({ subtree: true }))
      if (BEAT.has(a.animationName) && a.startTime !== 0) a.startTime = 0;
  };
  document.addEventListener("animationstart", e => { if (BEAT.has(e.animationName)) align(e.target); }, true);
  align(document.documentElement);
})();

// Keep the teal sidebar a self-contained scroll area on desktop: its height
// tracks the space left under its sticky top (header + tabs when stuck, or the
// natural page offset before that), so the panel fills to the bottom of the
// screen and the Community book is reachable without scrolling the whole page.
// Mobile hides the sidebar, so this is a no-op there.
(() => {
  const side = document.querySelector(".sidebar");
  if (!side) return;
  const wide = matchMedia("(min-width:901px)");
  const page = document.querySelector(".page");
  const sync = () => {
    if (!wide.matches) { side.style.height = ""; return; }
    const top = Math.max(0, Math.round(side.getBoundingClientRect().top));
    const pageBot = page ? page.getBoundingClientRect().bottom : innerHeight;
    const h = Math.max(0, Math.min(innerHeight, Math.round(pageBot)) - top);
    side.style.height = h + "px";
  };
  addEventListener("scroll", sync, { passive: true });
  addEventListener("resize", sync);
  wide.addEventListener("change", sync);
  sync();
})();
