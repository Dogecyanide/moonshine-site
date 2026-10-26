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
  title: "Moonshine — スーパーマリオサンシャイン練習mod",
  tagline: "スーパーマリオサンシャインの練習用mod",
  sub: "Nintendont経由のWii実機でエミュレーターのようなステート、GCT generatorの練習コードを内蔵、ILシステム、ゴーストなど多数の機能を搭載。<strong>日本版1.0</strong>・<strong>北米版</strong>・<strong>欧州版</strong>に対応。",
  dlMain: "Wii版をダウンロード",
  latestRelease: "最新リリース",
  discord: "Discordに参加",
  github: "GitHubで見る",
  fetching: "最新リリースを取得中…",
  trailerH: "トレーラー",
  chooseH: "ダウンロードを選ぶ",
  chooseLead: "Wii実機は<strong>Launcher</strong>のZIP、Dolphinは<strong>Dolphin</strong>のZIPを選んでください。メニューの言語はゲームの地域ではなく、ダウンロードの種類で決まります。",
  c1tag: "Wii",
  c1h: "ランチャー — 英語メニュー",
  c1p: "Homebrew Channel用。日本・北米・欧州版に対応。すべて英語で表示します。",
  c2tag: "Wii · おすすめ",
  c2h: "ランチャー — 日本語メニュー",
  c2p: "日本・北米・欧州版に対応。ランチャーは日本語、ゲーム内メニューは日本版で日本語、北米・欧州版では英語です。",
  c3tag: "Dolphin",
  c3h: "Dolphin — 英語メニュー",
  c3p: "自分で用意したクリーンなISO用のBPSパッチ。日本・北米・欧州版に対応。",
  c4tag: "Dolphin · 日本語",
  c4h: "Dolphin — 日本語メニュー",
  c4p: "日本版のクリーンなISO用のBPSパッチ。日本語メニューです。",
  allFiles: "すべてのファイルは<a href=\"https://github.com/panther03/moonshine/releases\">GitHub Releases</a>から直接配布されています。",
  notes: "リリースノートを読む →",
  installH: "インストール",
  wiiH: "Wii（実機）",
  wii1: "<strong>Launcher</strong>のZIPをダウンロードします。",
  wii2: "ZIP内の<code>apps</code>フォルダーをSDカードの一番上にコピーします。ランチャーの場所は<code>/apps/moonshine_launcher/boot.dol</code>です。",
  wii3: "Homebrew Channelから起動し、SD・USB・実ディスクから日本・北米・欧州版のサンシャインを選びます。",
  wiiNote: "更新する場合は、アプリのファイルを置き換え、ランチャーとmodのファイルは同じZIPのものを使ってください。<code>apps/susamune_launcher</code>が残っている場合は、先に<code>apps/moonshine_launcher</code>へ名前を変更します。設定・記録・ゴースト・ステートは<code>/Moonshine data</code>に保存されます。",
  dolH: "Dolphin（エミュレーター）",
  dol1: "<strong>Dolphin</strong>のZIPをダウンロードします。",
  dol2: "<a href=\"https://github.com/Alcaro/Flips/releases\" target=\"_blank\" rel=\"noopener\">Floating IPS</a>などのBPSパッチャーで、対応するBPSパッチを自分のクリーンなISOに適用します。パッチは書き込み前に元のイメージを確認します。",
  dol3: "設定を保存するため、<strong>スロットB</strong>にメモリーカードを挿してください。",
  dol4: "ステートで汚れを正しく保存・読み込みするには、<em>グラフィック設定 → Hacks → Texture Cache Accuracy</em>を<strong>Safe</strong>にします。",
  dolNote: "SDステートとTASファイルのメニューにはWiiランチャーが必要です。Dolphinではメモリ内の3スロットを使えます。",
  warn: "Geckoコードを有効にしたままMoonshineを使うことは強くおすすめしません。Moonshineの機能を壊すか、逆に壊される原因になります。ゲームキューブ実機には対応していません。",
  featH: "主な機能",
  f1: "<strong>ステート</strong> — 圧縮された3つのスロット。Wiiでは名前を付けてSDに保存できます。",
  f2: "<strong>コマ送り・フリーカメラ</strong>とTASプロジェクト。",
  f3: "<strong>練習コードを内蔵</strong> — タイマー、メタデータ、入力表示、レベルセレクト、ワープホイールなど。",
  f4: "<strong>ILシステム</strong> — ステージごとのPB、PB更新時のファンファーレ、Any%のドルピックタウン区間。ワープ一覧としても使えます。",
  f5: "<strong>ゴースト</strong>と競走できます。",
  f6: "<strong>自由にカスタマイズ</strong> — ボタン割り当てや、HUD要素の文字・位置・色・大きさ。",
  guides: "AIの力を借りて作られたソフトウェアです。自己責任でご利用ください。詳しくは<a href=\"https://github.com/panther03/moonshine/blob/main/doc/guide-ja.md\">日本語ガイド</a> · <a href=\"https://github.com/panther03/moonshine/blob/main/doc/guide-en.md\">English guide</a>へ。",
  allReleases: "すべてのリリース",
  legal: "Moonshineはファンが制作したmodです。スーパーマリオサンシャインは© Nintendoです。ゲーム本体はご自身でご用意ください。",
  soonTitle: "トレーラー近日公開",
  soonSub: `最新情報は<a href="${DISCORD}">Discord</a>で。`,
  menusEn: "英語メニュー",
  menusJa: "日本語メニュー",
  latestLine: (name, date) => `最新版：${name} · ${date}公開`,
  offline: `GitHubに接続できませんでした — <a href="${FALLBACK}">最新リリースを開く</a>。`,
};
const EN_EXTRA = {
  title: document.title,
  soonTitle: "Trailer coming soon",
  soonSub: `Follow along on the <a href="${DISCORD}">Discord</a>.`,
  menusEn: "English menus",
  menusJa: "Japanese menus",
  latestLine: (name, date) => `Latest: ${name} · released ${date}`,
  offline: `Couldn't reach GitHub — <a href="${FALLBACK}">open the latest release</a>.`,
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
  document.querySelectorAll(".lang-toggle button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
  if (remember) {
    try { localStorage.setItem("lang", l); } catch (e) {}
    const u = new URL(location.href);
    if (u.searchParams.has("lang")) { u.searchParams.set("lang", l); history.replaceState(null, "", u); }
  }
  renderTrailer();
  renderRelease();
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

  document.querySelectorAll(".dl[data-asset]").forEach(card => {
    const a = find(card.dataset.asset);
    if (!a) return; // keep fallback link to the release page
    card.href = a.browser_download_url;
    card.querySelector(".file").textContent = `${rel.tag_name} · ${fmtSize(a.size)}`;
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
}

document.querySelectorAll(".lang-toggle button").forEach(b =>
  b.addEventListener("click", () => setLang(b.dataset.lang, true)));
setLang(pickLang(), false);

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
