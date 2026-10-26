// ======================================================================
// TRAILER: paste the YouTube video ID here once the trailer is up.
// e.g. for https://www.youtube.com/watch?v=dQw4w9WgXcQ use "dQw4w9WgXcQ".
// Leave it empty ("") to show the "Trailer coming soon" card.
const TRAILER_YOUTUBE_ID = "";
// ======================================================================

const REPO = "panther03/moonshine"; // upstream repo whose Releases we link to
const FALLBACK = `https://github.com/${REPO}/releases/latest`;

(function trailer() {
  const slot = document.getElementById("trailer-slot");
  const id = TRAILER_YOUTUBE_ID.trim();
  if (id) {
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?rel=0`;
    f.title = "Moonshine trailer";
    f.loading = "lazy";
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.allowFullscreen = true;
    slot.appendChild(f);
  } else {
    slot.classList.add("soon");
    slot.innerHTML = '<div class="soon-inner"><div class="soon-sun"></div><p class="soon-title">Trailer coming soon</p><p class="soon-sub">Follow along on the <a href="https://discord.gg/72c42Teq3A">Discord</a>.</p></div>';
  }
})();

function fmtSize(b) { return (b / 1048576).toFixed(1) + " MB"; }

(async function release() {
  const info = document.getElementById("release-info");
  try {
    const r = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers: { Accept: "application/vnd.github+json" } });
    if (!r.ok) throw new Error(r.status);
    const rel = await r.json();
    const zips = (rel.assets || []).filter(a => /\.zip$/i.test(a.name));
    const find = key => zips.find(a => a.name.toLowerCase().includes(key.toLowerCase()));
    const date = new Date(rel.published_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    const name = rel.name || rel.tag_name;
    info.textContent = `Latest: ${name} · released ${date}`;
    document.getElementById("notes-link").href = rel.html_url;

    document.querySelectorAll(".dl[data-asset]").forEach(card => {
      const a = find(card.dataset.asset);
      if (!a) return; // keep fallback link to the release page
      card.href = a.browser_download_url;
      card.querySelector(".file").textContent = `${rel.tag_name} · ${fmtSize(a.size)}`;
    });

    // Main button: English launcher, else any launcher, else first zip.
    const main = find("ENGLISH-MENUS_Launcher") || find("Launcher") || zips[0];
    if (main) {
      document.getElementById("dl-main").href = main.browser_download_url;
      document.getElementById("dl-main-meta").textContent = `${rel.tag_name} · English menus · ${fmtSize(main.size)}`;
    }
  } catch (e) {
    info.innerHTML = `Couldn't reach GitHub — <a href="${FALLBACK}">open the latest release</a>.`;
  }
})();
