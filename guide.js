// The "All features" guidebook. It lives inside index.html (#guide) and opens over the page like a book.
// Routes: #guide opens it, #guide/<chapter> opens a chapter. Theme and language come from main.js.
(function () {
  const gb = document.getElementById("guide");
  if (!gb) return;
  const root = document.documentElement;
  const GUIDE = l => `https://github.com/panther03/moonshine/blob/main/doc/guide-${l}.md`;
  const TITLE = { en: "All features · Moonshine guidebook", ja: "全機能ガイド · Moonshine" };
  const lang = () => (root.lang === "ja" ? "ja" : "en");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

  const book = gb.querySelector(".gb-book");
  const cover = gb.querySelector(".gb-cover");
  const shadeEl = gb.querySelector(".gb-shade");
  const scrim = gb.querySelector(".gb-scrim");
  const mainBook = document.getElementById("top");
  const outside = [mainBook, document.querySelector(".skip")].filter(Boolean);
  const chapters = [...gb.querySelectorAll(".g-chapter")];
  const tabs = [...gb.querySelectorAll(".tab[data-cat]")];
  const cats = tabs.map(a => a.dataset.cat);
  const content = gb.querySelector(".g-content");
  const byId = id => chapters.find(a => a.dataset.ch === id);

  let current = null;     // the chapter on the open page
  let isOpen = false;
  let pushed = false;     // we added the #guide history entry, so Back can close the book
  let mainTitle = document.title;
  let lastFocus = null, lastOrigin = null;
  let run = 0;            // bumps whenever an open/close starts, so a stale animation stops quietly

  gb.setAttribute("role", "dialog");
  gb.setAttribute("aria-modal", "true");

  const route = () => {
    const m = location.hash.match(/^#guide(?:\/([\w-]+))?$/);
    return m ? (m[1] || "") : null;
  };
  const chapterTitle = a => { const h = a && a.querySelector(`h2 .l-${lang()}`); return h ? h.textContent : ""; };
  function updateTitle() {
    if (!isOpen) return;
    document.title = current ? `${chapterTitle(current)} · ${TITLE[lang()]}` : TITLE[lang()];
  }
  function updateLang() {
    gb.querySelector(".gb-upstream").href = GUIDE(lang());
    updateTitle();
  }

  // ---- page turning between chapters (unchanged from the old features page) ----
  const FLIP_MS = 560;
  let turning = null;
  function endTurn() {
    if (!turning) return;
    const t = turning; turning = null;
    t.anims.forEach(a => a.cancel());
    t.done();
  }
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
    const art = byId(id) || current || chapters[0];
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
    gb.querySelectorAll(".g-group").forEach(g => g.classList.toggle("is-open", g.dataset.cat === cat));
    gb.querySelectorAll(".g-ch").forEach(a => {
      const on = a.dataset.ch === art.dataset.ch;
      a.classList.toggle("is-sel", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    const activeTab = tabs.find(a => a.dataset.cat === cat);
    if (activeTab) {
      const list = activeTab.parentElement;
      const l = activeTab.offsetLeft - list.offsetLeft, r = l + activeTab.offsetWidth;
      if (l < list.scrollLeft || r > list.scrollLeft + list.clientWidth) list.scrollLeft = l - 8;
    }
    const sel = gb.querySelector(".g-ch.is-sel");
    if (sel && matchMedia("(max-width:900px)").matches) {
      const list = sel.closest(".g-list");
      const r = sel.getBoundingClientRect(), lr = list.getBoundingClientRect();
      list.scrollLeft += (r.left + r.width / 2) - (lr.left + lr.width / 2);
    }
    updateTitle();
    if (opts.focus) {
      const top = gb.querySelector(".g-page").offsetTop - gb.querySelector(".gb-book .tabs").offsetHeight;
      if (gb.scrollTop > top + 1) gb.scrollTop = top;
      art.querySelector("h2").focus({ preventScroll: true });
    }
  }

  // Chapter changes replace the history entry, so the browser Back button closes the book.
  function go(id) {
    const url = "#guide/" + id;
    if (location.hash !== url) history.replaceState(pushed ? { gb: 1 } : history.state, "", url);
    show(id, { focus: true });
  }

  // ---- opening and closing the book ----
  const wait = a => a.finished.catch(() => {});
  function originFor(p) {
    const r = book.getBoundingClientRect();
    if (!p) return "50% 30%";
    return `${Math.round(p.x - r.left)}px ${Math.round(p.y - r.top)}px`;
  }
  // ---- the small book button flying up to become the real cover (and back) ----
  const FLY_MS = 640;
  let srcBtn = null;
  const onScreen = el => { const r = el.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth; };
  function bkState(btn) {
    const r = btn.querySelector(".bk-slot").getBoundingClientRect(), cs = getComputedStyle(btn.querySelector(".bk"));
    return { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px", transform: cs.transform, translate: cs.translate, rotate: cs.rotate };
  }
  // Only the visible part of the real cover carries the art, so the flying book lines up with it exactly.
  function coverState() {
    const r = cover.getBoundingClientRect();
    const top = Math.max(r.top, 0), h = Math.max(140, Math.min(r.bottom, innerHeight) - top);
    gb.style.setProperty("--gb-vis", h + "px");
    gb.style.setProperty("--gb-art-top", (top - r.top) + "px");
    return { left: r.left + "px", top: top + "px", width: r.width + "px", height: h + "px", transform: "none", translate: "none", rotate: "none" };
  }
  function makeFlyer(btn) {
    const f = document.createElement("div");
    f.className = "gb-flyer";
    f.setAttribute("aria-hidden", "true");
    f.appendChild(btn.querySelector(".bk").cloneNode(true));
    gb.appendChild(f);
    return f;
  }
  const bookButton = () => (srcBtn && onScreen(srcBtn) ? srcBtn : [...document.querySelectorAll("#top .bookbtn")].find(onScreen)) || null;

  function settle() {
    gb.classList.remove("is-anim", "is-flying");
    gb.querySelectorAll(".gb-flyer").forEach(f => f.remove());
    [book, cover, shadeEl, scrim, ...cover.querySelectorAll(".gb-face")].forEach(el => el.getAnimations().forEach(a => a.cancel()));
  }

  async function open(id, opts = {}) {
    if (isOpen) { show(id, { focus: true }); return; }
    const my = ++run;
    isOpen = true;
    lastFocus = document.activeElement;
    lastOrigin = opts.origin || null;
    mainTitle = document.title;
    settle();
    gb.classList.add("is-open");
    root.classList.add("gb-lock");
    outside.forEach(el => { el.inert = true; });
    gb.scrollTop = 0;
    show(id, { animate: false });
    updateTitle();
    const focusPage = () => current.querySelector("h2").focus({ preventScroll: true });
    if (!opts.animate) { focusPage(); return; }
    if (reduceMotion.matches) {
      await wait(gb.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, easing: "ease-out" }));
      if (my === run) focusPage();
      return;
    }
    // 1. the closed book flies up (from the book button itself when that was clicked); 2. the cover swings open on its spine.
    gb.classList.add("is-anim");
    const o = (duration, easing, delay = 0) => ({ duration, easing, delay, fill: "both" });
    scrim.animate([{ opacity: 0 }, { opacity: 1 }], o(380, "ease-out"));
    let fly, T;
    if (opts.from) {
      srcBtn = opts.from;
      gb.classList.add("is-flying");
      const to = coverState(), from = bkState(srcBtn);
      const flyer = makeFlyer(srcBtn);
      srcBtn.classList.add("is-away");
      fly = flyer.animate([from, to], o(FLY_MS, "cubic-bezier(.32,.08,.2,1)"));
      flyer.querySelector(".bk-pages").animate([{ opacity: 1 }, { opacity: 0 }], o(FLY_MS * .8, "ease-in"));
      flyer.querySelector(".bk").animate([{ filter: getComputedStyle(srcBtn.querySelector(".bk")).filter }, { filter: "drop-shadow(0 20px 40px rgba(0,0,0,.45))" }], o(FLY_MS, "ease-out"));
      T = FLY_MS + 30;
    } else {
      book.style.transformOrigin = originFor(lastOrigin);
      coverState();
      fly = book.animate([{ transform: "scale(.18)", opacity: 0 }, { transform: "scale(.18)", opacity: 1, offset: .15 }, { transform: "none", opacity: 1 }], o(460, "cubic-bezier(.2,.75,.25,1)"));
      T = 420;
    }
    cover.animate([{ transform: "rotateY(0deg)" }, { transform: "rotateY(-180deg)" }], o(820, "cubic-bezier(.5,.05,.3,1)", T));
    cover.querySelectorAll(".gb-face").forEach(f => f.animate([{ opacity: 1 }, { opacity: 1, offset: .55 }, { opacity: 0 }], o(820, "linear", T)));
    const last = shadeEl.animate([{ opacity: .7 }, { opacity: .7, offset: (T - 40) / (T + 820) }, { opacity: 0 }], o(T + 820, "ease-in"));
    await wait(fly);
    if (my !== run) return;
    if (opts.from) { gb.classList.remove("is-flying"); gb.querySelectorAll(".gb-flyer").forEach(f => f.remove()); }
    await wait(last);
    if (my !== run) return;
    settle();
    focusPage();
  }

  async function close(opts = {}) {
    if (!isOpen) return;
    const my = ++run;
    isOpen = false;
    endTurn();
    const finish = () => {
      settle();
      gb.classList.remove("is-open");
      root.classList.remove("gb-lock");
      outside.forEach(el => { el.inert = false; });
      document.title = mainTitle;
      document.querySelectorAll(".bookbtn.is-away").forEach(b => b.classList.remove("is-away"));
      srcBtn = null;
      if (lastFocus && lastFocus.isConnected && opts.restoreFocus !== false) lastFocus.focus({ preventScroll: true });
    };
    if (opts.animate === false) { finish(); return; }
    if (reduceMotion.matches) {
      await wait(gb.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-in", fill: "both" }));
      if (my === run) { finish(); gb.getAnimations().forEach(a => a.cancel()); }
      return;
    }
    settle();
    gb.classList.add("is-anim");
    const target = bookButton();
    if (target) {
      // The cover swings shut, then the closed book shrinks back into its button.
      const o = (duration, easing, delay = 0) => ({ duration, easing, delay, fill: "both" });
      coverState();
      cover.animate([{ transform: "rotateY(-180deg)" }, { transform: "rotateY(0deg)" }], o(700, "cubic-bezier(.55,0,.4,1)"));
      cover.querySelectorAll(".gb-face").forEach(f => f.animate([{ opacity: 0 }, { opacity: 1, offset: .45 }, { opacity: 1 }], o(700, "linear")));
      const shut = shadeEl.animate([{ opacity: 0 }, { opacity: .7 }], o(700, "ease-in"));
      await wait(shut);
      if (my !== run) return;
      target.classList.add("is-away");
      gb.classList.add("is-flying");
      const from = coverState(), to = bkState(target);
      const flyer = makeFlyer(target);
      const back = flyer.animate([from, to], o(FLY_MS, "cubic-bezier(.5,0,.3,1)"));
      flyer.querySelector(".bk-pages").animate([{ opacity: 0 }, { opacity: 1 }], o(FLY_MS, "ease-in", FLY_MS * .2));
      scrim.animate([{ opacity: 1 }, { opacity: 0 }], o(FLY_MS, "ease-in"));
      await wait(back);
      if (my !== run) return;
      finish();
      return;
    }
    // Close back down onto where the book came from when that spot is on screen.
    let p = null;
    if (lastFocus && lastFocus.isConnected && lastFocus.closest("#top")) {
      const r = lastFocus.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) p = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    }
    book.style.transformOrigin = originFor(p || lastOrigin);
    const o = (duration, easing, delay = 0) => ({ duration, easing, delay, fill: "both" });
    cover.animate([{ transform: "rotateY(-180deg)" }, { transform: "rotateY(0deg)" }], o(700, "cubic-bezier(.55,0,.4,1)"));
    cover.querySelectorAll(".gb-face").forEach(f => f.animate([{ opacity: 0 }, { opacity: 1, offset: .45 }, { opacity: 1 }], o(700, "linear")));
    shadeEl.animate([{ opacity: 0 }, { opacity: .7 }], o(700, "ease-in"));
    book.animate([{ transform: "none", opacity: 1 }, { transform: "scale(.18)", opacity: 1, offset: .85 }, { transform: "scale(.18)", opacity: 0 }], o(380, "cubic-bezier(.6,0,.8,.3)", 700));
    const last = scrim.animate([{ opacity: 1 }, { opacity: 0 }], o(360, "ease-in", 720));
    await wait(last);
    if (my !== run) return;
    finish();
  }

  function requestClose() {
    if (!isOpen) return;
    if (pushed && history.state && history.state.gb) { history.back(); return; } // popstate closes it
    pushed = false;
    history.replaceState(null, "", location.pathname + location.search);
    close();
  }

  // ---- wiring ----
  document.addEventListener("click", e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const closer = e.target.closest("[data-gb-close]");
    if (closer) { e.preventDefault(); requestClose(); return; }
    const a = e.target.closest('a[href^="#guide"]');
    if (!a) return;
    const m = a.getAttribute("href").match(/^#guide(?:\/([\w-]+))?$/);
    if (!m) return;
    e.preventDefault();
    if (isOpen) { go(m[1] || current.dataset.ch); return; }
    const id = byId(m[1]) ? m[1] : (current ? current.dataset.ch : chapters[0].dataset.ch);
    history.pushState({ gb: 1 }, "", "#guide/" + id);
    pushed = true;
    const r = a.getBoundingClientRect();
    open(id, { animate: true, from: a.classList.contains("bookbtn") ? a : null, origin: e.detail ? { x: e.clientX, y: e.clientY } : { x: r.left + r.width / 2, y: r.top + r.height / 2 } });
  });

  addEventListener("popstate", () => {
    const r = route();
    if (r === null) { if (isOpen) { pushed = false; close(); } return; }
    pushed = !!(history.state && history.state.gb);
    if (isOpen) { if (!current || current.dataset.ch !== r) show(r, { focus: true }); }
    else open(r, { animate: true });
  });

  document.addEventListener("keydown", e => {
    if (isOpen && e.key === "Escape") { e.preventDefault(); requestClose(); }
  });

  gb.querySelectorAll(".shoulder").forEach(b => b.addEventListener("click", () => {
    const i = cats.indexOf(current.dataset.cat);
    const next = cats[(i + Number(b.dataset.step) + cats.length) % cats.length];
    go(chapters.find(a => a.dataset.cat === next).dataset.ch);
  }));

  // Up/Down (or Left/Right on the mobile strip) move through the chapter list, like the d-pad.
  gb.querySelector(".g-side").addEventListener("keydown", e => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (!(e.key in keys) || !e.target.classList.contains("g-ch")) return;
    e.preventDefault();
    const list = [...gb.querySelectorAll(".g-ch")];
    const n = list[(list.indexOf(e.target) + keys[e.key] + list.length) % list.length];
    go(n.dataset.ch);
    n.focus();
  });

  document.addEventListener("langchange", () => {
    if (isOpen) mainTitle = document.title; // main.js just set the page title in the new language
    updateLang();
  });

  // ---- start ----
  show(chapters[0].dataset.ch, { animate: false });
  updateLang();
  const start = route();
  if (start !== null) {
    // Deep link (index.html#guide/ghosts): open straight away, with a history entry under it so Back closes the book.
    const id = byId(start) ? start : chapters[0].dataset.ch;
    const base = location.pathname + location.search;
    history.replaceState(null, "", base);
    history.pushState({ gb: 1 }, "", base + "#guide/" + id);
    pushed = true;
    open(id, { animate: false });
  }
})();
