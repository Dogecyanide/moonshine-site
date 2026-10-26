// All features page. Theme, language and background follow main.js and share its saved choices.
const DISCORD = "https://discord.gg/72c42Teq3A";
const GUIDE = l => `https://github.com/panther03/moonshine/blob/main/doc/guide-${l}.md`;
const root = document.documentElement;

const JA = {
  title: "全機能ガイド · Moonshine",
  heading: "全機能ガイド",
  skip: "本文へ移動",
  home: "Moonshineのトップページ",
  version: "Moonshine V2.3.3向け。プロジェクトのガイドとリリースノートをもとに書いています。",
  download: "ダウンロード",
  back: "トップページへ戻る",
  fullGuide: "GitHubの公式ガイド",
  toTop: "トップへ戻る",
  legal: "Moonshineはファンが制作したmodです。スーパーマリオサンシャインは© Nintendoです。ゲーム本体はご自身でご用意ください。",
  themeGroup: "テーマ",
  themeLight: "ライトテーマ",
  themeDark: "ダークテーマ",
  tabsLabel: "カテゴリー",
  prevCat: "前のカテゴリー",
  nextCat: "次のカテゴリー",
  chLabel: "章",
  pnLabel: "前後の章",
  linksLabel: "リンク",
};
const EN = {
  title: "All features · Moonshine guidebook",
  themeGroup: "Theme",
  themeLight: "Light theme",
  themeDark: "Dark theme",
  tabsLabel: "Categories",
  prevCat: "Previous category",
  nextCat: "Next category",
  chLabel: "Chapters",
  pnLabel: "Previous and next chapter",
  linksLabel: "Links",
  home: "Moonshine home page",
};
document.querySelectorAll("[data-i18n]").forEach(el => {
  if (!(el.dataset.i18n in EN)) EN[el.dataset.i18n] = el.innerHTML;
});

let lang = root.lang === "ja" ? "ja" : "en";
const t = k => (lang === "ja" ? JA : EN)[k];

const chapters = [...document.querySelectorAll(".g-chapter")];
const tabs = [...document.querySelectorAll(".tab[data-cat]")];
const cats = tabs.map(a => a.dataset.cat);
let current = null;

function chapterTitle(a) {
  const h = a.querySelector(`h2 .l-${lang}`);
  return h ? h.textContent : "";
}

function setLang(l, remember) {
  lang = l;
  root.lang = l;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = t(el.dataset.i18n);
    if (typeof v === "string") el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.i18nAria)));
  document.querySelectorAll("[data-i18n-title]").forEach(el => el.setAttribute("title", t(el.dataset.i18nTitle)));
  document.querySelectorAll(".lang-toggle button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
  document.getElementById("full-guide").href = GUIDE(l);
  if (remember) {
    try { localStorage.setItem("lang", l); } catch (e) {}
    const u = new URL(location.href);
    if (u.searchParams.has("lang")) { u.searchParams.set("lang", l); history.replaceState(history.state, "", u); }
  }
  updateTitle();
}

function updateTitle() {
  document.title = current ? `${chapterTitle(current)} · ${t("title")}` : t("title");
}

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
const content = document.querySelector(".g-content");
const FLIP_MS = 560;
let turning = null; // { anims, done }

function endTurn() {
  if (!turning) return;
  const t = turning; turning = null;
  t.anims.forEach(a => a.cancel());
  t.done();
}

// Turn the page. Forward: the current sheet lifts at its right edge and turns over the spine,
// showing its blank back. Backward: the previous sheet turns back in from the left onto the stack.
function turnPage(from, to, dir) {
  endTurn();
  const ease = "cubic-bezier(.42,.08,.32,1)";
  const anims = [];
  let done;
  if (reduceMotion.matches) {
    from.classList.add("is-under");
    to.classList.add("is-leaf");
    anims.push(to.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: "ease-out" }));
    done = () => { from.classList.remove("is-under"); to.classList.remove("is-leaf"); };
  } else {
    content.classList.add("is-turning");
    const leaf = dir > 0 ? from : to, under = dir > 0 ? to : from;
    leaf.classList.add("is-leaf");
    under.classList.add("is-under");
    let k = [
      { transform: "rotateY(0deg)", offset: 0 },
      { transform: "rotateY(-95deg)", offset: .55 },
      { transform: "rotateY(-180deg)", offset: 1 },
    ];
    // Opacity lives on the faces: opacity on the sheet itself would flatten the 3D and show the front mirrored.
    let fade = [{ opacity: 1 }, { opacity: 1, offset: .7 }, { opacity: 0 }];
    let shade = [{ opacity: 0 }, { opacity: .85, offset: .5 }, { opacity: 1 }];
    let cast = [{ opacity: .55 }, { opacity: .35, offset: .5 }, { opacity: 0 }];
    if (dir < 0) {
      k = k.slice().reverse().map(f => ({ ...f, offset: 1 - f.offset }));
      fade = fade.slice().reverse().map((f, i, a) => ({ opacity: f.opacity, offset: i / (a.length - 1) }));
      fade[1].offset = .3;
      shade = shade.slice().reverse().map((f, i, a) => ({ opacity: f.opacity, offset: i / (a.length - 1) }));
      cast = [{ opacity: 0 }, { opacity: .35, offset: .5 }, { opacity: .55, offset: .9 }, { opacity: 0 }];
    }
    const o = { duration: FLIP_MS, easing: ease, fill: "both" };
    anims.push(leaf.animate(k, o));
    anims.push(leaf.querySelector(".g-shade").animate(shade, o));
    leaf.querySelectorAll(".g-face").forEach(f => anims.push(f.animate(fade, o)));
    anims.push(under.querySelector(".g-shade").animate(cast.map(f => ({ ...f, background: "linear-gradient(90deg,rgba(20,15,5,.4),rgba(20,15,5,.05) 75%,rgba(20,15,5,0))" })), o));
    done = () => {
      leaf.classList.remove("is-leaf"); under.classList.remove("is-under");
      content.classList.remove("is-turning");
    };
  }
  const t = { anims, done };
  turning = t;
  anims[0].finished.then(() => { if (turning === t) endTurn(); }, () => {});
}

function show(id, opts = {}) {
  const art = chapters.find(a => a.id === id) || chapters[0];
  const prev = current;
  current = art;
  if (prev !== art) {
    endTurn();
    chapters.forEach(a => { a.classList.toggle("is-cur", a === art); a.removeAttribute("hidden"); });
    art.querySelector(".g-scroll").scrollTop = 0;
    if (prev && opts.animate !== false) turnPage(prev, art, chapters.indexOf(art) > chapters.indexOf(prev) ? 1 : -1);
  }
  const cat = art.dataset.cat;
  tabs.forEach(a => {
    const on = a.dataset.cat === cat;
    a.classList.toggle("is-active", on);
    if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
  });
  document.querySelectorAll(".g-group").forEach(g => g.classList.toggle("is-open", g.dataset.cat === cat));
  document.querySelectorAll(".g-ch").forEach(a => {
    const on = a.dataset.ch === art.id;
    a.classList.toggle("is-sel", on);
    if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
  });
  const activeTab = tabs.find(a => a.dataset.cat === cat);
  if (activeTab) activeTab.scrollIntoView({ block: "nearest", inline: "nearest" });
  const sel = document.querySelector(".g-ch.is-sel");
  if (sel && matchMedia("(max-width:900px)").matches) {
    const list = sel.closest(".g-list");
    const r = sel.getBoundingClientRect(), lr = list.getBoundingClientRect();
    list.scrollLeft += (r.left + r.width / 2) - (lr.left + lr.width / 2);
  }
  updateTitle();
  if (opts.focus) {
    const h = art.querySelector("h2");
    const top = document.querySelector(".g-page").getBoundingClientRect().top + scrollY - document.querySelector(".tabs").offsetHeight;
    if (scrollY > top + 1) scrollTo({ top, behavior: "auto" });
    h.focus({ preventScroll: true });
  }
}

function go(id, push = true) {
  if (push && location.hash !== "#" + id) history.pushState({ id }, "", "#" + id);
  show(id, { focus: true });
}

document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const id = a.getAttribute("href").slice(1);
  if (!chapters.some(c => c.id === id)) return;
  e.preventDefault();
  go(id);
});
addEventListener("popstate", () => {
  const id = location.hash.slice(1);
  if (chapters.some(c => c.id === id) || id === "") show(id, { focus: true });
});
addEventListener("hashchange", () => {
  const id = location.hash.slice(1);
  if (chapters.some(c => c.id === id) && (!current || current.id !== id)) show(id, { focus: true });
});

function stepCat(d) {
  const i = cats.indexOf(current.dataset.cat);
  const next = cats[(i + d + cats.length) % cats.length];
  go(chapters.find(a => a.dataset.cat === next).id);
}
document.querySelectorAll(".shoulder").forEach(b => b.addEventListener("click", () => stepCat(Number(b.dataset.step))));

// Up/Down (or Left/Right on the mobile strip) move through the chapter list, like the d-pad.
document.querySelector(".g-side").addEventListener("keydown", e => {
  const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
  if (!(e.key in keys) || !e.target.classList.contains("g-ch")) return;
  e.preventDefault();
  const list = [...document.querySelectorAll(".g-ch")];
  const i = list.indexOf(e.target);
  const n = list[(i + keys[e.key] + list.length) % list.length];
  go(n.dataset.ch);
  document.querySelector(`.g-ch[data-ch="${n.dataset.ch}"]`).focus();
});

document.querySelectorAll(".lang-toggle button").forEach(b =>
  b.addEventListener("click", () => setLang(b.dataset.lang, true)));

// ---- theme + background video (same clips and saved choice as the main page) ----
const CLIP_COUNT = 5;
const THEME_COLOR = { dark: "#1f3326", light: "#36553c" };
const bgEl = document.getElementById("bg");
let bg = window.__bg || { theme: root.dataset.theme || "dark", n: 1 };

function randomClip(exclude) {
  let n;
  do { n = 1 + Math.floor(Math.random() * CLIP_COUNT); } while (CLIP_COUNT > 1 && n === exclude);
  return n;
}
function renderBackground() {
  const base = `assets/bg/${bg.theme}-${bg.n}`;
  root.style.setProperty("--poster", `url(${base}.jpg)`);
  bgEl.querySelectorAll("video").forEach(v => { v.pause(); v.removeAttribute("src"); v.load(); v.remove(); });
  const saveData = navigator.connection && navigator.connection.saveData;
  if (reduceMotion.matches || saveData) return;
  const v = document.createElement("video");
  v.muted = true; v.defaultMuted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
  v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("disablepictureinpicture", "");
  v.preload = "auto"; v.tabIndex = -1; v.poster = `${base}.jpg`;
  for (const [ext, type] of [["webm", 'video/webm; codecs="vp9"'], ["mp4", "video/mp4"]]) {
    const s = document.createElement("source");
    s.src = `${base}.${ext}`; s.type = type; v.appendChild(s);
  }
  v.addEventListener("playing", () => v.classList.add("on"), { once: true });
  bgEl.appendChild(v);
  const p = v.play(); if (p) p.catch(() => {});
}
function applyTheme(theme, remember) {
  const changed = theme !== bg.theme;
  root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = THEME_COLOR[theme];
  document.querySelectorAll(".theme-toggle button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.themeSet === theme)));
  if (remember) { try { localStorage.setItem("theme", theme); } catch (e) {} }
  if (changed) bg = { theme, n: randomClip() };
  return changed;
}
document.querySelectorAll(".theme-toggle button").forEach(b =>
  b.addEventListener("click", () => { if (applyTheme(b.dataset.themeSet, true)) renderBackground(); }));
matchMedia("(prefers-color-scheme: light)").addEventListener("change", e => {
  let saved = null; try { saved = localStorage.getItem("theme"); } catch (err) {}
  if (saved || new URLSearchParams(location.search).get("theme")) return;
  if (applyTheme(e.matches ? "light" : "dark", false)) renderBackground();
});
reduceMotion.addEventListener("change", renderBackground);

applyTheme(bg.theme, false);
renderBackground();
show(location.hash.slice(1), { animate: false });
setLang(lang, false);
if (chapters.some(c => c.id === location.hash.slice(1))) history.replaceState({ id: current.id }, "", location.href);
