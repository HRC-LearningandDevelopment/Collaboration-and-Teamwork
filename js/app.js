/* =========================================================================
   Course engine — plain JS, no build step.
   State lives in localStorage under COURSE_CONFIG.storageKey and is saved
   on every interaction, so a mid-activity refresh never loses work.
   ========================================================================= */
(function () {
  "use strict";
  const C = window.COURSE, CFG = window.COURSE_CONFIG;
  const KEY = CFG.storageKey;
  const INTERACTIVE = new Set(["form", "reflect", "bucket", "sequence", "match", "flip", "hotspot", "sim", "profiles", "quiz", "video", "rewrite", "heatmap", "crossword", "wordsearch", "jeopardy", "story", "styleassess", "netmap", "appreciate", "plan"]);
  const PAIR_COLORS = ["#1270A0", "#157A72", "#7A4BB5", "#C2410C", "#2F5D8A", "#A3366B"];

  /* ---------------- State ---------------- */
  function blank() {
    return { v: 2, name: "", role: null, fn: null, blocks: {}, mods: {}, finals: {}, passedAt: {},
      time: { total: 0 }, created: Date.now(), last: "#/welcome" };
  }
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) { const s = Object.assign(blank(), JSON.parse(raw)); if (typeof s.passedAt !== "object" || !s.passedAt) s.passedAt = {}; return s; } } catch (e) { /* corrupt or blocked */ }
    return blank();
  }
  let S = load();
  let storageOK = true;
  let saveTimer = null;
  function writeNow() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); storageOK = true; }
    catch (e) { storageOK = false; }
  }
  function save(immediate) { clearTimeout(saveTimer); if (immediate) writeNow(); else saveTimer = setTimeout(writeNow, 200); }
  window.addEventListener("beforeunload", () => writeNow());
  window.addEventListener("pagehide", () => writeNow());
  const bs = (id) => S.blocks[id] || (S.blocks[id] = {});

  /* ---------------- DOM helper ---------------- */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return el;
  }
  const $ = (sel, root) => (root || document).querySelector(sel);
  function shuffle(arr, avoidIdentity) {
    const a = arr.slice();
    for (let tries = 0; tries < 10; tries++) {
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      if (!avoidIdentity || a.some((x, i) => x !== arr[i])) break;
    }
    return a;
  }
  function msg(kind, html) { return h("div", { class: "msg " + kind, role: kind === "bad" ? "alert" : "status", html }); }
  function fmtTime(sec) {
    const m = Math.round(sec / 60);
    if (m < 1) return "Under 1 min";
    if (m < 60) return m + " min";
    return Math.floor(m / 60) + " h " + (m % 60) + " min";
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  /* ---------------- Course structure helpers ---------------- */
  /* ---------------- Profile + variant resolution ---------------- */
  const pk = () => (S.role && S.fn ? S.role + "_" + S.fn : null);
  const hasProfile = () => !!pk();
  const profileLabel = () => hasProfile() ? C.roles[S.role].name + " \u00b7 " + C.functions[S.fn].short : "";
  function res(x) {
    if (Array.isArray(x)) return x.map(res);
    if (x && typeof x === "object") {
      if (x.__v) {
        const r = S.role || "tl", f = S.fn || "ops";
        const k = [r + "_" + f, f, r, "all"].find((k) => x[k] !== undefined);
        return res(k ? x[k] : undefined);
      }
      const o = {}; for (const k in x) o[k] = res(x[k]); return o;
    }
    return x;
  }
  const hasVCache = new WeakMap();
  function hasV(x) {
    if (!x || typeof x !== "object") return false;
    if (hasVCache.has(x)) return hasVCache.get(x);
    const r = !!x.__v || (Array.isArray(x) ? x.some(hasV) : Object.values(x).some(hasV));
    hasVCache.set(x, r); return r;
  }
  function matchOnly(o) { const p = pk(); return [].concat(o).some((k) => k === "all" || k === S.role || k === S.fn || k === p); }
  // Resolved blocks for a screen, cached per profile. Tailored blocks get a per-profile state key.
  const blockCache = new WeakMap();
  function blocksOf(scr) {
    const p = pk() || "none", c = blockCache.get(scr);
    if (c && c.p === p) return c.list;
    const list = scr.blocks.map((raw) => { const b = res(raw); return { raw, b, key: b.id ? (hasV(raw) ? b.id + "@" + p : b.id) : null }; })
      .filter((x) => !x.b.only || matchOnly(x.b.only));
    blockCache.set(scr, { p, list }); return list;
  }
  const T = (v) => res(v); // resolve a single value (titles, summaries)
  const pathName = (r) => C.roles[r].path || C.roles[r].name + " path";

  const modById = (id) => C.modules.find((m) => m.id === id);
  const foundationMods = () => C.modules.filter((m) => m.part === "foundation");
  const trackMods = () => (hasProfile() ? C.modules.filter((m) => m.track === S.role) : []);
  const pathMods = () => foundationMods().concat(trackMods());
  const reqBlocks = (m) => m.screens.flatMap((s) => blocksOf(s).filter((x) => INTERACTIVE.has(x.b.type)));
  const isDone = (x) => !!(S.blocks[x.key] && S.blocks[x.key].done);
  const modPct = (m) => { const r = reqBlocks(m); return r.length ? r.filter(isDone).length / r.length : 1; };
  const modDone = (m) => modPct(m) >= 1;
  const screenOpen = (scr) => blocksOf(scr).filter((x) => INTERACTIVE.has(x.b.type) && !isDone(x)).map((x) => x.b);
  const allPathDone = () => hasProfile() && pathMods().every(modDone);
  const finalQs = () => res(C.finalCheck.questions).filter((q) => q.track === "all" || q.track === S.role);
  const Fin = () => { const p = pk() || "none"; return S.finals[p] || (S.finals[p] = { answers: {}, submitted: false, score: null, best: null, attempts: 0 }); };
  const passed = () => hasProfile() && Fin().best != null && Fin().best >= C.finalCheck.passMark;

  /* ---------------- Time tracking ---------------- */
  // Counts only while the tab is visible and the learner was active in the last
  // 5 minutes. Any gap > 15 s between ticks (sleep, throttled background tab) is discarded.
  let lastTick = Date.now(), lastActive = Date.now();
  ["pointerdown", "keydown", "scroll", "touchstart", "input"].forEach((ev) =>
    window.addEventListener(ev, () => { lastActive = Date.now(); }, { passive: true, capture: true }));
  document.addEventListener("visibilitychange", () => { lastTick = Date.now(); if (!document.hidden) lastActive = Date.now(); });
  setInterval(() => {
    const now = Date.now(), d = now - lastTick; lastTick = now;
    if (document.hidden || d > 15000 || now - lastActive > 5 * 60 * 1000) return;
    S.time.total += d / 1000; save(); updateFoot();
  }, 5000);

  /* ---------------- Routing ---------------- */
  function parseHash() {
    const p = (location.hash || "").replace(/^#\/?/, "").split("/");
    if (p[0] === "m" && modById(p[1])) return { page: "module", mod: p[1], screen: Math.max(0, parseInt(p[2] || "0", 10) || 0) };
    if (p[0] === "path") return { page: "welcome" };
    if (["welcome", "final", "cert"].includes(p[0])) return { page: p[0] };
    return null;
  }
  function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
  window.addEventListener("hashchange", render);

  // Ordered list of nav pages used by Continue
  function sequenceHashes() {
    const list = ["#/welcome"];
    foundationMods().forEach((m) => list.push("#/m/" + m.id + "/0"));
    trackMods().forEach((m) => list.push("#/m/" + m.id + "/0"));
    list.push("#/final", "#/cert");
    return list;
  }
  function nextAfterModule(m) {
    const list = sequenceHashes(), i = list.indexOf("#/m/" + m.id + "/0");
    return list[i + 1] || "#/final";
  }
  function prevBeforeModule(m) {
    const list = sequenceHashes(), i = list.indexOf("#/m/" + m.id + "/0");
    const prev = list[i - 1] || "#/welcome";
    const pm = prev.match(/^#\/m\/([^/]+)/);
    return pm ? "#/m/" + pm[1] + "/" + (modById(pm[1]).screens.length - 1) : prev;
  }

  /* ---------------- Shell: nav ---------------- */
  function markerEl(pct) { const i = h("i"); i.style.height = Math.round(pct * 100) + "%"; return h("span", { class: "marker", "aria-hidden": "true" }, i); }
  function navItem(label, hash, pct, current, locked) {
    return h("button", { class: "nav-item" + (locked ? " locked" : ""), "aria-current": current ? "page" : null,
      onclick: () => { document.body.classList.remove("nav-open"); go(hash); } },
      markerEl(pct), h("span", null, label), locked ? h("span", { class: "lock" }, "Locked") : null);
  }
  function renderNav(route) {
    const nav = $("#nav"); nav.innerHTML = "";
    const cur = (p, id) => route.page === p && (!id || route.mod === id);
    nav.append(h("div", { class: "nav-group" }, h("div", { class: "nav-group-label" }, "Start"),
      navItem("Welcome and profile", "#/welcome", hasProfile() ? 1 : 0, cur("welcome"))));
    nav.append(h("div", { class: "nav-group" }, h("div", { class: "nav-group-label" }, "Part 1: the foundation"),
      foundationMods().map((m) => navItem(T(m.title), "#/m/" + m.id + "/" + resumeScreen(m), hasProfile() ? modPct(m) : 0, cur("module", m.id), !hasProfile()))));
    const g2 = h("div", { class: "nav-group" }, h("div", { class: "nav-group-label" }, hasProfile() ? "Part 2: " + pathName(S.role) : "Part 2: your path"));
    if (hasProfile()) trackMods().forEach((m) => g2.append(navItem(T(m.title), "#/m/" + m.id + "/" + resumeScreen(m), modPct(m), cur("module", m.id))));
    else g2.append(h("div", { class: "nav-note" }, "Choose your role and function on the Welcome page to see your modules."));
    nav.append(g2);
    const fpct = passed() ? 1 : hasProfile() && Fin().submitted ? 0.5 : 0;
    nav.append(h("div", { class: "nav-group" }, h("div", { class: "nav-group-label" }, "Wrap-up"),
      navItem("Final check", "#/final", fpct, cur("final"), !allPathDone()),
      navItem("Certificate and answers", "#/cert", passed() ? 1 : 0, cur("cert"))));
    updateFoot();
  }
  function resumeScreen(m) { const s = (S.mods[m.id] && S.mods[m.id].screen) || 0; return Math.min(s, m.screens.length - 1); }
  function updateFoot() {
    const f = $("#foot"); if (!f) return;
    const pm = pathMods(); const done = pm.filter(modDone).length;
    f.innerHTML = "";
    [h("div", null, h("strong", null, fmtTime(S.time.total)), " invested"),
      hasProfile() ? h("div", { class: "foot-profile" }, h("strong", null, profileLabel()), " ", h("button", { onclick: () => { document.body.classList.remove("nav-open"); go("#/welcome"); setTimeout(() => { const el = document.getElementById("profile"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 60); } }, "Change")) : null,
      h("div", null, hasProfile() ? `${done} of ${pm.length} modules complete` : "Choose your profile to begin"),
      storageOK ? null : h("div", { style: "color:#F3B2AD" }, "Progress can't be saved in this browser (private mode or storage blocked)."),
      h("button", { onclick: resetAll }, "Reset my progress")].forEach((el) => { if (el) f.append(el); });
  }
  function resetAll() {
    if (!confirm("Erase all progress, answers, and reflections saved in this browser? This can't be undone.")) return;
    localStorage.removeItem(KEY); S = blank(); location.hash = "#/welcome"; render();
  }

  /* ---------------- Main render ---------------- */
  let lastRouteKey = "";
  let flash = "";
  function render() {
    let route = parseHash();
    if (!route) { location.replace(S.last && S.last !== location.hash ? S.last : "#/welcome"); return; }
    if (route.page === "module") {
      const m = modById(route.mod);
      if (!hasProfile() || (m.track !== "all" && m.track !== S.role)) {
        flash = !hasProfile() ? "Choose your role and function first, so the course can be built for you."
          : "“" + T(m.title) + "” is part of " + pathName(m.track) + ", the path for " + C.roles[m.track].plural + ". You're on " + pathName(S.role) + "; change your role below to open it.";
        location.replace("#/welcome"); return; }
      route.screen = Math.min(route.screen, m.screens.length - 1);
      const ms = S.mods[m.id] || (S.mods[m.id] = { screen: 0 });
      ms.screen = Math.max(ms.screen || 0, route.screen);
    }
    S.last = location.hash; save();
    renderNav(route);
    const card = $("#card"); card.innerHTML = "";
    const pages = { welcome: pageWelcome, module: pageModule, final: pageFinal, cert: pageCert };
    pages[route.page](card, route);
    const key = JSON.stringify(route);
    if (key !== lastRouteKey) { window.scrollTo(0, 0); lastRouteKey = key; const h1 = $("#card h1"); if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); } }
  }

  function hero(kicker, title, sub, compact) {
    return h("header", { class: "hero" + (compact ? " compact" : "") },
      h("p", { class: "hero-kicker" }, kicker), h("h1", null, title), sub ? h("p", { class: "hero-sub" }, sub) : null);
  }

  /* ---------------- Scenario briefing (memorable running story) ---------------- */
  function initials(name) {
    const w = name.replace(/^The /, "").split(/\s+/).filter((x) => /^[A-Za-z]/.test(x) && !/^(of|and)$/i.test(x));
    return (w.length > 1 ? w[0][0] + w[1][0] : w[0].slice(0, 2)).toUpperCase();
  }
  function briefingEl(compact) {
    if (!hasProfile()) return h("div");
    const p = C.profiles[pk()];
    return h("section", { class: "briefing" + (compact ? " compact" : ""), "aria-label": "Your scenario" },
      h("p", { class: "brief-kicker" }, profileLabel() + " \u00b7 your scenario"),
      h("h3", null, p.change),
      h("p", { class: "brief-tag" }, p.tagline),
      h("p", { class: "brief-body" }, p.scenario),
      h("p", { class: "brief-cast-label" }, p.castLabel || (S.role === "tl" ? "Your team" : "Your leaders and stakeholders")),
      h("div", { class: "cast" }, p.cast.map((c) => h("div", { class: "castcard" },
        h("span", { class: "avatar", "aria-hidden": "true" }, initials(c.name)),
        h("div", null, h("b", null, c.name), h("small", null, c.role), compact ? null : h("span", { class: "note" }, c.note))))));
  }

  /* ---------------- Page: welcome + profile ---------------- */
  function pageWelcome(card) {
    card.append(hero((hasProfile() ? profileLabel() : C.audience) + " \u00b7 About " + C.minutes + " minutes", C.title, C.subtitle));
    const body = h("div", { class: "body" });
    if (flash) { body.append(msg("bad", esc(flash))); flash = ""; }
    body.append(
      h("p", { class: "lead" }, C.welcome.lead),
      h("p", { html: "This course builds itself around <strong>your role and your function</strong>. Every scenario, example, and decision you practice reflects the work you actually do. Your progress saves automatically in this browser, so you can stop and come back at any time." }));

    // Name
    const nameMsg = h("div", { id: "name-msg" });
    const input = h("input", { type: "text", id: "learner-name", autocomplete: "name", value: S.name || "", "aria-describedby": "name-msg" });
    const saveName = () => {
      const v = input.value.trim(); nameMsg.innerHTML = "";
      if (!v) { nameMsg.append(msg("bad", "Enter your name so it can appear on your certificate.")); input.focus(); return; }
      S.name = v; save(true); nameMsg.append(msg("ok", "Saved. Your certificate will read <strong>" + esc(v) + "</strong>."));
    };
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") saveName(); });
    body.append(h("div", { class: "panel" },
      h("label", { class: "field-label", for: "learner-name" }, "Your name, as it should appear on your certificate"),
      h("div", { class: "row" }, input, h("button", { class: "btn", onclick: saveName }, "Save name")), nameMsg));

    // Profile
    const profMsg = h("div", { id: "profile-msg" });
    const pick = (kind, id) => { S[kind] = id; save(true); const y = window.scrollY; render(); window.scrollTo(0, y); };
    const choice = (kind, id, title, label, meta) => h("button", { class: "path", type: "button", "aria-pressed": S[kind] === id ? "true" : "false", "data-pick": kind + ":" + id, onclick: () => pick(kind, id) },
      h("span", { class: "tick", "aria-hidden": "true" }), meta ? h("p", { class: "meta" }, meta) : null, h("h3", null, title), h("p", null, label));
    const roleMods = (r) => C.modules.filter((m) => m.track === r).length;
    body.append(h("section", { id: "profile", class: "profile-picker", "aria-labelledby": "profile-h" },
      h("h2", { id: "profile-h" }, "Build your course"),
      h("p", { class: "step-label" }, h("span", { class: "num" }, "1"), "Your role"),
      h("div", { class: "paths", role: "group", "aria-label": "Your role" },
        Object.entries(C.roles).map(([id, r]) => choice("role", id, r.name, r.label, (r.path ? r.path + " \u00b7 " : "") + roleMods(id) + " path modules after the shared foundation"))),
      h("p", { class: "step-label" }, h("span", { class: "num" }, "2"), "Your function"),
      h("div", { class: "paths", role: "group", "aria-label": "Your function" },
        Object.entries(C.functions).map(([id, f]) => choice("fn", id, f.name, f.label))),
      profMsg));

    if (hasProfile()) {
      body.append(h("p", { class: "preview-label" }, "Here's the story you'll lead through the whole course:"), briefingEl(true),
        h("p", { class: "muted", style: "font-size:15px;margin-top:12px" }, "You can change your profile at any time from the menu. Your work for each profile is saved separately."));
    }

    body.append(h("h2", null, "How it works"),
      h("ol", { class: "steps" }, C.welcome.steps.map((t, i) => h("li", null, h("span", { class: "num" }, String(i + 1)),
        h("div", { html: t.replace("{path}", hasProfile() ? "<strong>" + esc(pathName(S.role)) + "</strong>, built for " + esc(profileLabel()).replace(" \u00b7 ", " in ") : "your role and function") })))),
      h("p", { class: "muted" }, C.welcome.note));
    const started = hasProfile() && Object.keys(S.blocks).some((k) => k.endsWith("@" + pk()) || !k.includes("@"));
    body.append(h("div", { class: "footer-nav" }, h("span"),
      h("button", { class: "btn", id: "start-btn", onclick: () => {
        profMsg.innerHTML = "";
        const missing = [!S.role && "your role", !S.fn && "your function"].filter(Boolean);
        if (missing.length) { profMsg.append(msg("bad", "Choose " + missing.join(" and ") + " to build your course.")); document.getElementById("profile").scrollIntoView({ behavior: "smooth" }); return; }
        const lm = (S.last || "").match(/^#\/m\/([^/]+)/), lmod = lm && modById(lm[1]);
        if (started && lmod && (lmod.track === "all" || lmod.track === S.role)) return go(S.last);
        const next = pathMods().find((m) => !modDone(m));
        go(next ? "#/m/" + next.id + "/" + resumeScreen(next) : "#/final");
      } }, started ? "Continue where you left off" : "Start my course")));
    card.append(body);
  }

  function moduleList(mods) {
    return h("ul", { class: "modlist" }, mods.map((m) => h("li", null, markerEl(modPct(m)),
      h("div", { class: "grow" }, h("b", null, T(m.title)), h("small", null, T(m.summary))),
      h("span", { class: "pct" }, Math.round(modPct(m) * 100) + "%"))));
  }

  /* ---------------- Page: module screen ---------------- */
  function pageModule(card, route) {
    const m = modById(route.mod), idx = route.screen, scr = m.screens[idx];
    const group = m.part === "foundation" ? foundationMods() : trackMods();
    const pos = group.indexOf(m) + 1;
    const kicker = (m.part === "foundation" ? "Part 1: the foundation" : pathName(S.role)) + " \u00b7 " + C.functions[S.fn].short + " \u00b7 " +
      (m.capstone ? "Capstone" : "Module " + pos + " of " + group.filter((x) => !x.capstone).length) + " \u00b7 About " + m.minutes + " min";
    const hd = hero(kicker, T(m.title), null, true);
    const bars = h("div", { class: "bars", "aria-hidden": "true" });
    m.screens.forEach((s, i) => bars.append(h("span", { class: i === idx ? "here" : screenOpen(s).length === 0 && (S.mods[m.id].screen >= i) ? "done" : (S.mods[m.id].screen >= i ? "seen" : "") })));
    hd.append(bars, h("p", { class: "bars-label" }, "Screen " + (idx + 1) + " of " + m.screens.length + ": " + T(scr.title)));
    card.append(hd);

    const body = h("div", { class: "body" });
    if (idx === 0) body.append(h("p", { class: "lead" }, T(m.summary)));
    body.append(h("h2", null, T(scr.title)));
    for (const x of blocksOf(scr)) body.append(renderBlock(x, () => onBlockChange(m)));

    const gate = h("div", { class: "gate-msg" });
    const isLast = idx === m.screens.length - 1;
    const backHash = idx > 0 ? "#/m/" + m.id + "/" + (idx - 1) : prevBeforeModule(m);
    body.append(h("div", { class: "footer-nav" },
      h("button", { class: "btn ghost", onclick: () => go(backHash) }, "Back"),
      h("button", { class: "btn", id: "continue-btn", onclick: () => {
        const open = screenOpen(scr);
        gate.innerHTML = "";
        if (open.length) {
          const first = open[0], t = first.title || labelFor(first);
          gate.append(msg("bad", "Finish <strong>" + esc(t) + "</strong> to continue." + (open.length > 1 ? " " + (open.length - 1) + " more activity on this screen is still open." : "")));
          const el = document.getElementById("blk-" + first.id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        go(isLast ? nextAfterModule(m) : "#/m/" + m.id + "/" + (idx + 1));
      } }, isLast ? (m.part === "foundation" && m === foundationMods().slice(-1)[0] ? "Finish Part 1" : "Finish module") : "Continue"),
      gate));
    card.append(body);
  }
  function labelFor(b) {
    return { reflect: "the reflection", form: "the form", video: "the video", quiz: "the check for understanding", plan: "your action plan" }[b.type] || "the activity";
  }
  function onBlockChange(m) {
    // refresh nav markers without re-rendering the page
    renderNav(parseHash() || { page: "module", mod: m.id });
    const g = $(".gate-msg"); if (g) g.innerHTML = "";
  }

  /* ---------------- Block dispatcher ---------------- */
  function renderBlock(x, changed) {
    const b = x.b;
    switch (b.type) {
      case "briefing": return briefingEl(false);
      case "p": return h("p", { html: b.html });
      case "announce": return h("blockquote", { class: "announce", html: b.html });
      case "list": return h("ul", { class: "prose" }, b.items.map((i) => h("li", { html: i })));
      case "callout": return h("aside", { class: "callout " + (b.tone || "") }, h("h3", null, b.title), h("p", { html: b.html }));
      case "concepts": return conceptsEl(b);
      case "accordion": return accordionEl(b);
      case "puzzle": return puzzleEl(b);
      case "compare": return h("div", { class: "compare" }, b.cols.map((c, i) => h("div", { class: "compare-col" + (i === b.cols.length - 1 ? " good" : "") },
        h("h3", null, c.title), h("ul", { class: "prose" }, c.items.map((t) => h("li", { html: t }))))));
      case "table": return h("div", { class: "table-wrap" }, h("table", null,
        h("thead", null, h("tr", null, b.head.map((c) => h("th", { scope: "col" }, c)))),
        h("tbody", null, b.rows.map((r) => h("tr", null, r.map((c) => h("td", { html: c })))))));
      default: {
        const fn = R[b.type];
        if (!fn) return h("p", null, "[Unknown block: " + b.type + "]");
        const st = bs(x.key);
        const ctx = {
          save: () => save(),
          complete: () => { if (!st.done) { st.done = true; st.doneAt = Date.now(); } save(true); changed(); },
          undo: () => { if (st.done) { st.done = false; save(true); changed(); } }
        };
        return fn(b, st, ctx);
      }
    }
  }

  /* Shared activity frame */
  function shell(b, typeLabel, st) {
    const el = h("section", { class: "activity" + (st.done ? " is-done" : ""), id: "blk-" + b.id, "aria-labelledby": "t-" + b.id });
    const chip = h("span", { class: "chip-done", hidden: st.done ? null : true }, "Completed");
    el.append(h("div", { class: "act-head" },
      h("div", null, typeLabel ? h("p", { class: "act-type" }, typeLabel) : null, h("h3", { id: "t-" + b.id }, b.title || "")), chip));
    if (b.prompt) el.append(h("p", { class: "act-prompt" }, b.prompt));
    const inner = h("div"); el.append(inner);
    const keyBox = h("div");
    el.append(keyBox);
    const showDone = (initial) => {
      if (initial !== true && !el.classList.contains("is-done")) { el.classList.add("just-done"); setTimeout(() => el.classList.remove("just-done"), 1400); }
      el.classList.add("is-done"); chip.hidden = false;
      if (b.key && !keyBox.firstChild) keyBox.append(h("div", { class: "keypoints" }, h("h4", null, "Coaching key points"),
        h("ul", null, b.key.map((k) => h("li", null, k)))));
    };
    const hideDone = () => { el.classList.remove("is-done"); chip.hidden = true; keyBox.innerHTML = ""; };
    if (st.done) showDone(true);
    return { el, inner, showDone, hideDone };
  }

  const R = {};

  /* ---------- Reflection ---------- */
  R.reflect = function (b, st, ctx) {
    const sh = shell({ id: b.id, title: "Reflect" }, null, st);
    const out = h("div");
    const ta = h("textarea", { id: "ta-" + b.id, rows: 4, "aria-label": b.prompt }, st.text || "");
    ta.value = st.text || "";
    ta.addEventListener("input", () => { st.text = ta.value; ctx.save(); if (!ta.value.trim() && st.done) { ctx.undo(); sh.hideDone(); } });
    sh.inner.append(h("p", { class: "act-prompt", style: "margin-bottom:12px;color:var(--text)" }, b.prompt), ta,
      h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => {
        out.innerHTML = "";
        if (ta.value.trim().length < 3) { out.append(msg("bad", "Write at least a sentence before saving. This reflection is part of your PDF.")); ta.focus(); return; }
        st.text = ta.value; ctx.complete(); sh.showDone(); out.append(msg("ok", "Reflection saved."));
      } }, "Save reflection")), out);
    return sh.el;
  };

  /* ---------- Multi-field form ---------- */
  R.form = function (b, st, ctx) {
    const sh = shell(b, "Your work", st);
    st.values = st.values || {};
    const out = h("div");
    if (b.intro) sh.inner.append(h("p", { class: "act-prompt" }, b.intro));
    const fieldEls = {};
    for (const f of b.fields) {
      const ta = h("textarea", { id: b.id + "-" + f.id, rows: 2 });
      ta.value = st.values[f.id] || "";
      ta.addEventListener("input", () => { st.values[f.id] = ta.value; wrap.classList.remove("missing"); ctx.save(); });
      const wrap = h("div", { class: "field" }, h("label", { class: "field-label", for: b.id + "-" + f.id }, f.label),
        f.prompt ? h("span", { class: "hint" }, f.prompt) : null, ta);
      fieldEls[f.id] = wrap; sh.inner.append(wrap);
    }
    sh.inner.append(h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => {
      out.innerHTML = "";
      const need = b.minFilled || b.fields.length;
      const missing = b.fields.filter((f) => !(st.values[f.id] || "").trim());
      missing.forEach((f) => fieldEls[f.id].classList.add("missing"));
      if (b.fields.length - missing.length < need) {
        out.append(msg("bad", "Complete every field before saving. Still empty: " + missing.map((f) => "<strong>" + esc(f.label) + "</strong>").join(", ") + ". Short answers are fine."));
        const first = fieldEls[missing[0].id].querySelector("textarea"); if (first) first.focus();
        return;
      }
      ctx.complete(); sh.showDone(); out.append(msg("ok", "Saved. This will be included in your PDF."));
    } }, b.saveLabel || "Save")), out);
    return sh.el;
  };

  /* ---------- Bucket sort (tap-to-place everywhere, drag with mouse/pen) ---------- */
  R.bucket = function (b, st, ctx) {
    const sh = shell(b, "Sort into groups", st);
    st.place = st.place || {};
    if (!st.order) { st.order = shuffle(b.items.map((i) => i.id), true); ctx.save(); }
    let selected = null;
    const out = h("div");
    const itemById = (id) => b.items.find((i) => i.id === id);
    function place(itemId, bucketId) {
      if (st.done) return;
      if (bucketId) st.place[itemId] = bucketId; else delete st.place[itemId];
      st.wrong = (st.wrong || []).filter((x) => x !== itemId);
      selected = null; out.innerHTML = ""; ctx.save(); draw();
    }
    function chip(id) {
      const it = itemById(id);
      const cls = "bchip" + (selected === id ? " selected" : "") + ((st.wrong || []).includes(id) ? " wrong" : "") + (st.done ? " right" : "");
      const el = h("button", { class: cls, type: "button", "data-item": id, "aria-pressed": selected === id ? "true" : "false" }, it.text);
      if (st.done) { el.disabled = true; return el; }
      el.addEventListener("click", (e) => { if (el._dragged) { el._dragged = false; return; } e.stopPropagation(); selected = selected === id ? null : id; draw(); });
      el.addEventListener("pointerdown", (e) => startDrag(e, el, id));
      return el;
    }
    function startDrag(e, el, id) {
      if (e.pointerType === "touch" || e.button !== 0) return; // touch uses tap-to-place
      const sx = e.clientX, sy = e.clientY; let ghost = null, over = null;
      const move = (ev) => {
        if (!ghost) {
          if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < 6) return;
          ghost = el.cloneNode(true); ghost.classList.add("drag-ghost"); ghost.style.width = el.offsetWidth + "px"; document.body.append(ghost); el.classList.add("dragging");
        }
        ghost.style.left = ev.clientX - 20 + "px"; ghost.style.top = ev.clientY - 16 + "px";
        const t = document.elementFromPoint(ev.clientX, ev.clientY);
        const zone = t && t.closest("[data-zone]");
        if (over && over !== zone) over.classList.remove("target");
        over = zone && sh.el.contains(zone) ? zone : null; if (over) over.classList.add("target");
      };
      const up = () => {
        window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up);
        if (!ghost) return;
        ghost.remove(); el.classList.remove("dragging"); el._dragged = true;
        if (over) { over.classList.remove("target"); place(id, over.dataset.zone === "pool" ? null : over.dataset.zone); }
      };
      window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
    }
    function zoneClick(zoneId) { if (selected) place(selected, zoneId); }
    function draw() {
      sh.inner.innerHTML = "";
      const pool = h("div", { class: "pool", "data-zone": "pool", "aria-label": "Items to sort" });
      pool.addEventListener("click", () => { if (selected && st.place[selected]) place(selected, null); });
      st.order.filter((id) => !st.place[id]).forEach((id) => pool.append(chip(id)));
      const grid = h("div", { class: "buckets", "data-n": b.buckets.length });
      for (const bk of b.buckets) {
        const z = h("div", { class: "bucket" + (selected ? " armed" : ""), "data-zone": bk.id, role: "button", tabindex: st.done ? null : "0",
          "aria-label": "Place in " + bk.label },
          h("div", { class: "bucket-label" }, bk.label));
        z.addEventListener("click", (e) => { if (e.target.closest(".bchip")) return; zoneClick(bk.id); });
        z.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target === z) { e.preventDefault(); zoneClick(bk.id); } });
        st.order.filter((id) => st.place[id] === bk.id).forEach((id) => z.append(chip(id)));
        grid.append(z);
      }
      const left = st.order.filter((id) => !st.place[id]).length;
      sh.inner.append(
        h("p", { class: "muted", style: "font-size:15px;margin:0 0 10px" }, st.done ? "All items sorted correctly." :
          "Select an item, then select the group it belongs in. On a computer you can also drag items." + (selected ? " Item selected: choose a group." : "")),
        pool, grid);
      if (!st.done) sh.inner.append(h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => {
        out.innerHTML = "";
        if (left) { out.append(msg("bad", "Place every item before checking. " + left + " still in the pool.")); return; }
        st.attempts = (st.attempts || 0) + 1;
        const wrong = b.items.filter((i) => ![].concat(i.bucket).includes(st.place[i.id])).map((i) => i.id);
        if (!wrong.length) { st.wrong = []; ctx.complete(); sh.showDone(); draw(); out.append(msg("ok", "All " + b.items.length + " sorted correctly" + (st.attempts > 1 ? " (attempt " + st.attempts + ")." : " on the first try."))); return; }
        wrong.forEach((id) => delete st.place[id]); st.wrong = wrong; ctx.save(); draw();
        out.append(msg("bad", (b.items.length - wrong.length) + " of " + b.items.length + " correct. The highlighted items went back to the pool. Think about which group fits them best and try again."));
      } }, "Check my sorting")), out);
      else sh.inner.append(out);
    }
    draw();
    return sh.el;
  };

  /* ---------- Sequence ---------- */
  R.sequence = function (b, st, ctx) {
    const sh = shell(b, "Put in order", st);
    const correct = b.items.map((i) => i.id);
    if (!st.order) { st.order = shuffle(correct, true); ctx.save(); }
    const out = h("div");
    let marks = null;
    function move(i, d) { const j = i + d; if (j < 0 || j >= st.order.length) return; [st.order[i], st.order[j]] = [st.order[j], st.order[i]]; marks = null; out.innerHTML = ""; ctx.save(); draw(i + d); }
    function draw(focusIdx) {
      sh.inner.innerHTML = "";
      const list = h("ol", { class: "seq" });
      st.order.forEach((id, i) => {
        const it = b.items.find((x) => x.id === id);
        const cls = st.done ? "right" : marks ? (marks[i] ? "right" : "wrong") : "";
        const li = h("li", { class: cls, "data-id": id },
          h("span", { class: "pos", "aria-hidden": "true" }, i + 1),
          h("span", { class: "txt" }, h("b", null, it.text), it.detail ? h("small", null, it.detail) : null),
          st.done ? null : h("span", { class: "moves" },
            h("button", { class: "iconbtn", type: "button", "aria-label": "Move " + it.text + " up", disabled: i === 0 ? true : null, onclick: () => move(i, -1) }, "\u2191"),
            h("button", { class: "iconbtn", type: "button", "aria-label": "Move " + it.text + " down", disabled: i === st.order.length - 1 ? true : null, onclick: () => move(i, 1) }, "\u2193")));
        if (!st.done) enableDrag(li, list);
        list.append(li);
      });
      sh.inner.append(h("p", { class: "muted", style: "font-size:15px;margin:0 0 6px" }, st.done ? "Correct order." : "Use the arrows to reorder. On a computer you can also drag an item."), list);
      if (!st.done) sh.inner.append(h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => {
        st.attempts = (st.attempts || 0) + 1;
        marks = st.order.map((id, i) => id === correct[i]);
        const n = marks.filter(Boolean).length;
        out.innerHTML = "";
        if (n === correct.length) { ctx.complete(); sh.showDone(); draw(); out.append(msg("ok", "That's the right order.")); return; }
        ctx.save(); draw();
        out.append(msg("bad", n + " of " + correct.length + " are in the right position (shown in green). Move the others and check again."));
      } }, "Check my order")), out);
      else sh.inner.append(out);
      if (focusIdx != null) { const btns = list.children[focusIdx] && list.children[focusIdx].querySelectorAll(".iconbtn"); if (btns && btns.length) (btns[0].disabled ? btns[1] : btns[0]).focus(); }
    }
    function enableDrag(li, list) {
      li.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "touch" || e.button !== 0 || e.target.closest("button")) return;
        const sy = e.clientY; let dragging = false;
        const mv = (ev) => {
          if (!dragging && Math.abs(ev.clientY - sy) < 6) return;
          dragging = true; li.style.opacity = ".6";
          const sibs = [...list.children].filter((c) => c !== li);
          const after = sibs.find((c) => { const r = c.getBoundingClientRect(); return ev.clientY < r.top + r.height / 2; });
          if (after) list.insertBefore(li, after); else list.append(li);
        };
        const up = () => {
          window.removeEventListener("pointermove", mv); window.removeEventListener("pointerup", up);
          li.style.opacity = "";
          if (dragging) { st.order = [...list.children].map((c) => c.dataset.id); marks = null; out.innerHTML = ""; ctx.save(); draw(); }
        };
        window.addEventListener("pointermove", mv); window.addEventListener("pointerup", up);
      });
    }
    draw();
    return sh.el;
  };

  /* ---------- Matching with lines ---------- */
  R.match = function (b, st, ctx) {
    const sh = shell(b, "Match the pairs", st);
    st.pairs = st.pairs || {};
    if (!st.rorder) { st.rorder = shuffle(b.right.map((r) => r.id), true); ctx.save(); }
    let sel = null, marks = null;
    const out = h("div");
    const leftIdx = (lid) => b.left.findIndex((l) => l.id === lid);
    const pairOfRight = (rid) => Object.keys(st.pairs).find((l) => st.pairs[l] === rid);
    let wrapEl, svg;
    function pick(side, id) {
      if (st.done) return;
      out.innerHTML = ""; marks = null;
      if (side === "L") { sel = sel === id ? null : id; draw(); return; }
      if (!sel) { const l = pairOfRight(id); if (l) { delete st.pairs[l]; ctx.save(); } draw(); return; } // tap a paired right with nothing selected: unpair
      const prev = pairOfRight(id); if (prev) delete st.pairs[prev];
      st.pairs[sel] = id; sel = null; ctx.save(); draw();
    }
    function item(side, obj) {
      const lid = side === "L" ? obj.id : pairOfRight(obj.id);
      const paired = side === "L" ? !!st.pairs[obj.id] : !!lid;
      const n = lid ? leftIdx(lid) : -1;
      let cls = "mitem";
      if (paired) cls += " paired";
      if (sel === obj.id && side === "L") cls += " selected";
      if (st.done) cls += " right"; else if (marks && paired && lid in marks) cls += marks[lid] ? " right" : " wrong";
      const badge = h("span", { class: "badge", "aria-hidden": "true" }, paired ? String(n + 1) : (side === "L" ? String(leftIdx(obj.id) + 1) : ""));
      if (paired) badge.style.background = PAIR_COLORS[n % PAIR_COLORS.length];
      else if (side === "L") { badge.style.color = "var(--muted)"; }
      const label = side === "L" ? obj.text : obj.text;
      const el = h("button", { class: cls, type: "button", "data-side": side, "data-id": obj.id, disabled: st.done ? true : null,
        "aria-pressed": sel === obj.id ? "true" : "false",
        "aria-label": (paired ? "Paired with " + (n + 1) + ". " : "") + label, onclick: () => pick(side, obj.id) }, badge, label);
      return el;
    }
    function drawLines() {
      if (!svg || !wrapEl.isConnected) return;
      svg.innerHTML = "";
      if (getComputedStyle(svg).display === "none") return; // single-column layout: badges carry the pairing
      const base = wrapEl.getBoundingClientRect();
      for (const [lid, rid] of Object.entries(st.pairs)) {
        const le = wrapEl.querySelector('[data-side="L"][data-id="' + lid + '"]'), re = wrapEl.querySelector('[data-side="R"][data-id="' + rid + '"]');
        if (!le || !re) continue;
        const a = le.getBoundingClientRect(), c = re.getBoundingClientRect();
        if (c.left < a.right) continue; // columns stacked: no sensible line
        const x1 = a.right - base.left, y1 = a.top + a.height / 2 - base.top, x2 = c.left - base.left, y2 = c.top + c.height / 2 - base.top;
        const dx = (x2 - x1) / 2;
        const n = leftIdx(lid);
        const color = st.done ? "#157A72" : marks && lid in marks ? (marks[lid] ? "#157A72" : "#B3261E") : PAIR_COLORS[n % PAIR_COLORS.length];
        const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("d", `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`);
        p.setAttribute("fill", "none"); p.setAttribute("stroke", color); p.setAttribute("stroke-width", "2.5"); p.setAttribute("stroke-linecap", "round");
        svg.append(p);
        [[x1, y1], [x2, y2]].forEach(([x, y]) => { const ci = document.createElementNS("http://www.w3.org/2000/svg", "circle"); ci.setAttribute("cx", x); ci.setAttribute("cy", y); ci.setAttribute("r", "4.5"); ci.setAttribute("fill", color); svg.append(ci); });
      }
    }
    function draw() {
      sh.inner.innerHTML = "";
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("class", "lines"); svg.setAttribute("aria-hidden", "true");
      wrapEl = h("div", { class: "match" }, svg,
        h("div", { class: "match-col" }, h("h4", null, "Select one of these"), b.left.map((l) => item("L", l))),
        h("div", { class: "match-col" }, h("h4", null, "Then its match"), st.rorder.map((rid) => item("R", b.right.find((r) => r.id === rid)))));
      const nPaired = Object.keys(st.pairs).length;
      sh.inner.append(h("p", { class: "muted", style: "font-size:15px;margin:0 0 12px" }, st.done ? "All pairs matched." :
        (sel ? "Now select its match on the right." : "Select an item on the left, then its match on the right. Select a matched item on the right to undo it.") + " " + nPaired + " of " + b.left.length + " paired."), wrapEl);
      if (!st.done) sh.inner.append(h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => {
        out.innerHTML = "";
        const missing = b.left.length - Object.keys(st.pairs).length;
        if (missing) { out.append(msg("bad", "Match every item before checking. " + missing + " still unmatched.")); return; }
        st.attempts = (st.attempts || 0) + 1;
        marks = {}; b.left.forEach((l) => { marks[l.id] = st.pairs[l.id] === b.pairs[l.id]; });
        const wrong = Object.keys(marks).filter((k) => !marks[k]);
        if (!wrong.length) { marks = null; ctx.complete(); sh.showDone(); draw(); out.append(msg("ok", "All pairs are correct.")); return; }
        draw();
        out.append(msg("bad", (b.left.length - wrong.length) + " of " + b.left.length + " pairs are correct. Incorrect pairs are shown in red and have been cleared. Rematch them and check again."));
        wrong.forEach((k) => delete st.pairs[k]); ctx.save();
        setTimeout(() => { if (!st.done) { marks = null; draw(); } }, 1600);
      } }, "Check my matches")), out);
      else sh.inner.append(out);
      requestAnimationFrame(drawLines);
    }
    const ro = new ResizeObserver(() => drawLines());
    draw();
    requestAnimationFrame(() => { if (wrapEl) ro.observe(sh.el); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawLines);
    return sh.el;
  };

  /* ---------- Flip cards ---------- */
  R.flip = function (b, st, ctx) {
    const sh = shell(b, "Explore", st);
    st.seen = st.seen || [];
    const count = h("p", { class: "muted", style: "font-size:15px;margin:0 0 12px" });
    const upd = () => { count.textContent = st.done ? "All " + b.cards.length + " cards explored." : st.seen.length + " of " + b.cards.length + " explored. Select a card to flip it."; };
    const grid = h("div", { class: "flips" });
    b.cards.forEach((c, i) => {
      const card = h("button", { class: "flip", type: "button", "aria-pressed": "false", "aria-label": c.front + ". Select to flip." },
        h("span", { class: "flip-inner" },
          h("span", { class: "flip-face flip-front" }, st.seen.includes(i) ? h("span", { class: "seen-dot" }) : null,
            h("span", null, h("b", null, c.front), c.sub ? h("small", null, c.sub) : null), h("span", { class: "flip-hint" }, "Select to flip")),
          h("span", { class: "flip-face flip-back", html: c.back })));
      card.addEventListener("click", () => {
        const on = card.classList.toggle("flipped"); card.setAttribute("aria-pressed", on ? "true" : "false");
        if (on && !st.seen.includes(i)) {
          st.seen.push(i); ctx.save();
          const front = card.querySelector(".flip-front"); if (!front.querySelector(".seen-dot")) front.prepend(h("span", { class: "seen-dot" }));
          if (st.seen.length === b.cards.length) { ctx.complete(); sh.showDone(); }
          upd();
        }
      });
      grid.append(card);
    });
    upd(); sh.inner.append(count, grid);
    return sh.el;
  };

  /* ---------- Hotspot / scavenger hunt ---------- */
  R.hotspot = function (b, st, ctx) {
    const sh = shell(b, "Find it", st);
    st.found = st.found || []; st.missed = st.missed || [];
    const fb = h("div", { "aria-live": "polite" });
    const counter = h("span", { class: "hs-counter" });
    const upd = () => { counter.textContent = "Found " + st.found.length + " of " + b.find; };
    const d = b.doc;
    function clickSeg(key, seg, el) {
      fb.innerHTML = "";
      if (seg.target) {
        if (!st.found.includes(key)) { st.found.push(key); el.classList.add("found"); }
        fb.append(msg("ok", "<strong>Found one.</strong> " + esc(seg.fb)));
        if (st.found.length >= b.find && !st.done) { ctx.complete(); sh.showDone(); fb.append(msg("ok", "You found all " + b.find + ".")); }
      } else {
        if (!st.missed.includes(key)) st.missed.push(key);
        el.classList.add("miss");
        fb.append(msg("info", "<strong>Not this one.</strong> " + esc(seg.fb) + (st.done ? "" : " Keep looking.")));
      }
      ctx.save(); upd();
    }
    const cls = (key) => (st.found.includes(key) ? " found" : st.missed.includes(key) ? " miss" : "");
    let bodyEl;
    if (d.kind === "message") {
      bodyEl = h("div", { class: "doc-body" });
      d.segments.forEach((s, i) => { const k = "s" + i; const el = h("button", { class: "seg" + cls(k), type: "button" }, s.t); el.onclick = () => clickSeg(k, s, el); bodyEl.append(el, " "); });
    } else if (d.kind === "tiles") {
      bodyEl = h("div", { class: "tiles" });
      d.tiles.forEach((t, i) => { const k = "t" + i; const el = h("button", { class: "tile" + cls(k), type: "button" }, h("small", null, t.label), h("b", null, t.value)); el.onclick = () => clickSeg(k, t, el); bodyEl.append(el); });
    } else {
      bodyEl = h("div", { class: "table-wrap", style: "margin:0;border:0;border-radius:0" }, h("table", null,
        h("thead", null, h("tr", null, d.head.map((c) => h("th", { scope: "col" }, c)))),
        h("tbody", null, d.rows.map((r, ri) => h("tr", null, r.map((c, ci) => {
          if (typeof c === "string") return h("td", null, c);
          const k = "c" + ri + "-" + ci; const el = h("button", { class: "cellbtn" + cls(k), type: "button", "aria-label": d.rows[ri][0] + ", " + d.head[ci] + ": " + c.t }, c.t); el.onclick = () => clickSeg(k, c, el);
          return h("td", null, el);
        }))))));
    }
    upd();
    sh.inner.append(h("div", { class: "doc" }, h("div", { class: "doc-head" }, d.heading, counter), bodyEl), fb);
    return sh.el;
  };

  /* ---------- Step runner shared by branching sims and profiles ---------- */
  function runSteps(host, steps, st, ctx, onFinish, opts) {
    st.step = st.step || 0; st.wrong = st.wrong || {};
    let justRight = null;
    function draw() {
      host.innerHTML = "";
      if (opts && opts.track) {
        const tr = h("div", { class: "sim-track", "aria-hidden": "true" });
        steps.forEach((s, i) => tr.append(h("span", { class: i < st.step ? "done" : i === st.step ? "here" : "" })));
        tr.append(h("em", null, st.step >= steps.length ? "Complete" : "Step " + (st.step + 1) + " of " + steps.length + (steps[st.step].label ? ": " + steps[st.step].label : "")));
        host.append(tr);
      }
      if (st.step >= steps.length) { onFinish && onFinish(true); return; }
      const s = steps[st.step], wrongs = st.wrong[st.step] || [];
      if (s.context) host.append(h("p", { style: "margin-bottom:6px" }, s.context));
      if (s.quote) host.append(h("p", { class: "sim-quote" }, s.quote));
      if (s.prompt) host.append(h("p", { class: "sim-quote", style: "font-size:17px" }, s.prompt));
      const fb = h("div", { "aria-live": "polite" });
      const opts2 = h("div", { class: "opts" });
      s.options.forEach((o, oi) => {
        const isWrong = wrongs.includes(oi), isRight = justRight === oi;
        const btn = h("button", { class: "opt" + (isWrong ? " wrong" : "") + (isRight ? " right" : ""), type: "button",
          disabled: isWrong || justRight != null ? true : null }, o.text);
        btn.onclick = () => {
          if (o.correct) { justRight = oi; ctx.save(); draw(); }
          else { (st.wrong[st.step] = st.wrong[st.step] || []).push(oi); lastFb = oi; ctx.save(); draw(); }
        };
        opts2.append(btn);
      });
      host.append(opts2, fb);
      function showFb() {
        fb.innerHTML = "";
        if (justRight != null) {
          fb.append(msg("ok", "<strong>Good choice.</strong> " + esc(s.options[justRight].feedback)),
            h("div", { class: "act-actions" }, h("button", { class: "btn small dark", onclick: () => { st.step++; justRight = null; lastFb = null; ctx.save(); draw(); host.closest(".activity").scrollIntoView({ behavior: "smooth", block: "nearest" }); } },
              st.step === steps.length - 1 ? "Finish" : "Continue")));
        } else if (lastFb != null) {
          fb.append(msg("bad", "<strong>Not the best response.</strong> " + esc(s.options[lastFb].feedback) + " Try another response."));
        }
      }
      showFb();
    }
    let lastFb = null;
    draw();
  }

  /* ---------- Branching simulation ---------- */
  R.sim = function (b, st, ctx) {
    const sh = shell(b, "Branching scenario", st);
    sh.inner.append(h("div", { class: "sim-setup" }, b.setup));
    const host = h("div"); sh.inner.append(host);
    runSteps(host, b.steps, st, ctx, () => {
      const wrongTotal = Object.values(st.wrong || {}).reduce((a, x) => a + x.length, 0);
      host.append(h("p", { style: "font-weight:700;color:var(--ink);margin:4px 0 6px" }, "The strongest response at each step"),
        h("ul", { class: "sim-history" }, b.steps.map((s, i) => h("li", null, h("b", null, (s.label || "Step " + (i + 1)) + ": "), s.options.find((o) => o.correct).text))));
      host.append(msg("ok", "<strong>Scenario complete.</strong> " + (wrongTotal ? "You recovered from " + wrongTotal + " less effective choice" + (wrongTotal > 1 ? "s" : "") + " along the way; that's how the skill is built." : "You chose the strongest response at every step.")),
        h("div", { class: "act-actions" }, h("button", { class: "linkbtn", onclick: () => { st.step = 0; st.wrong = {}; ctx.save(); runAgain(); } }, "Replay this scenario")));
      if (!st.done) { ctx.complete(); } sh.showDone();
    }, { track: true });
    function runAgain() { runSteps(host, b.steps, st, ctx, () => { host.append(msg("ok", "<strong>Scenario complete.</strong>")); }, { track: true }); }
    return sh.el;
  };

  /* ---------- Profiles (diagnose several people) ---------- */
  R.profiles = function (b, st, ctx) {
    const sh = shell(b, "Diagnose", st);
    st.p = st.p || {};
    const isDone = (p) => !!(st.p[p.id] && st.p[p.id].done);
    if (!st.cur) st.cur = (b.profiles.find((p) => !isDone(p)) || b.profiles[0]).id;
    const grid = h("div", { class: "profiles" }), stage = h("div", { class: "pstage" });
    function drawGrid() {
      grid.innerHTML = "";
      b.profiles.forEach((p) => grid.append(h("button", { class: "pcard" + (st.cur === p.id ? " current" : "") + (isDone(p) ? " done" : ""), type: "button",
        "aria-pressed": st.cur === p.id ? "true" : "false", onclick: () => { st.cur = p.id; ctx.save(); drawGrid(); drawStage(); } },
        h("b", null, p.name), h("small", null, p.tag), h("span", { class: "sr-only" }, isDone(p) ? " (done)" : ""))));
    }
    function drawStage() {
      const p = b.profiles.find((x) => x.id === st.cur), ps = st.p[p.id] || (st.p[p.id] = {});
      stage.innerHTML = "";
      stage.append(h("h3", null, p.name), h("p", { class: "sim-quote" }, p.quote));
      const host = h("div"); stage.append(host);
      runSteps(host, p.steps, ps, ctx, () => {
        ps.done = true; ctx.save();
        const next = b.profiles.find((x) => !isDone(x));
        host.append(msg("ok", "<strong>" + esc(p.name) + " diagnosed.</strong>"));
        if (next) host.append(h("div", { class: "act-actions" }, h("button", { class: "btn small dark", onclick: () => { st.cur = next.id; ctx.save(); drawGrid(); drawStage(); } }, "Next: " + next.name)));
        drawGrid();
        if (b.profiles.every(isDone) && !st.done) { ctx.complete(); sh.showDone(); }
      });
    }
    const count = () => b.profiles.filter(isDone).length;
    sh.inner.append(h("p", { class: "muted", style: "font-size:15px;margin:0 0 12px" }, "Select a team member. For each, pick the diagnosis, then the response. Work through all five."), grid, stage);
    drawGrid(); drawStage(); void count;
    return sh.el;
  };

  /* ---------- Quiz (check for understanding) ---------- */
  function quizUI(questions, st, opts) {
    const wrap = h("div"); st.answers = st.answers || {};
    function draw() {
      wrap.innerHTML = "";
      if (st.submitted) {
        const n = questions.filter((q, i) => st.answers[i] === q.answer).length;
        const big = h("b", null, Math.round((n / questions.length) * 100) + "%"); if (st.justSubmitted) { countUp(big, Math.round((n / questions.length) * 100), "%"); st.justSubmitted = false; }
        wrap.append(h("div", { class: "score" }, big, h("span", null, n + " of " + questions.length + " correct" + (opts.scoreNote ? opts.scoreNote(n) : ""))));
      }
      questions.forEach((q, i) => {
        const fs = h("fieldset", null, h("legend", null, (i + 1) + ". " + q.q));
        q.options.forEach((o, oi) => {
          let cls = "";
          if (st.submitted) { if (oi === q.answer) cls = "right"; else if (st.answers[i] === oi) cls = "wrong"; }
          const r = h("input", { type: "radio", name: opts.name + "-" + i, value: oi, disabled: st.submitted ? true : null });
          r.checked = st.answers[i] === oi;
          r.addEventListener("change", () => { st.answers[i] = oi; wrap.querySelectorAll(".q")[i].classList.remove("unanswered"); opts.save(); });
          fs.append(h("label", { class: cls }, r, h("span", null, o)));
        });
        const qd = h("div", { class: "q" }, fs);
        if (st.submitted) qd.append(msg(st.answers[i] === q.answer ? "ok" : "bad", "<strong>" + (st.answers[i] === q.answer ? "Correct." : "Not quite.") + "</strong> " + esc(q.explain)));
        wrap.append(qd);
      });
      const out = h("div");
      if (!st.submitted) {
        wrap.append(h("div", { class: "act-actions" }, h("button", { class: "btn" + (opts.big ? "" : " small"), onclick: () => {
          out.innerHTML = "";
          const missing = questions.map((q, i) => i).filter((i) => st.answers[i] == null);
          if (missing.length) {
            missing.forEach((i) => wrap.querySelectorAll(".q")[i].classList.add("unanswered"));
            out.append(msg("bad", "Answer every question before submitting. Still unanswered: " + missing.map((i) => "question " + (i + 1)).join(", ") + "."));
            wrap.querySelectorAll(".q")[missing[0]].scrollIntoView({ behavior: "smooth", block: "center" });
            return;
          }
          const n = questions.filter((q, i) => st.answers[i] === q.answer).length;
          st.submitted = true; st.attempts = (st.attempts || 0) + 1;
          st.score = Math.round((n / questions.length) * 100); st.best = Math.max(st.best || 0, st.score);
          st.justSubmitted = true; opts.onSubmit(); draw(); wrap.scrollIntoView({ behavior: "smooth", block: "start" });
        } }, opts.submitLabel || "Check my answers")), out);
      } else {
        wrap.append(h("div", { class: "act-actions" }, opts.after ? opts.after() : null,
          h("button", { class: "btn small ghost", onclick: () => { st.submitted = false; st.answers = {}; opts.save(); draw(); } }, "Retake")));
      }
    }
    draw();
    return wrap;
  }
  R.quiz = function (b, st, ctx) {
    const sh = shell({ id: b.id, title: "Check for understanding" }, null, st);
    sh.inner.append(h("p", { class: "act-prompt" }, "Quick retrieval practice. Your score is recorded, and you can retake it."));
    sh.inner.append(quizUI(b.questions, st, { name: b.id, save: ctx.save, onSubmit: () => { ctx.complete(); sh.showDone(); } }));
    return sh.el;
  };

  /* ---------- Video with opt-out ---------- */
  function ytId(url) {
    if (!url || /^\[.*\]$/.test(url.trim())) return null;
    const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : (/^[A-Za-z0-9_-]{11}$/.test(url.trim()) ? url.trim() : null);
  }
  R.video = function (b, st, ctx) {
    const v = CFG.videos[b.videoKey];
    const sh = shell({ id: b.id, title: v.title }, "Video", st);
    const id = ytId(v.url);
    function draw() {
      sh.inner.innerHTML = "";
      const frame = h("div", { class: "video-frame" });
      if (st.optOut) frame.append(h("div", { class: "video-empty" }, "Video hidden. You chose the text summary below."));
      else if (id) frame.append(h("iframe", { src: "https://www.youtube-nocookie.com/embed/" + id + "?rel=0", title: v.title, loading: "lazy",
        allow: "accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen", allowfullscreen: true, referrerpolicy: "strict-origin-when-cross-origin" }));
      else frame.append(h("div", { class: "video-empty" }, "This video link hasn't been set up yet. Use the text summary below."));
      const opt = h("input", { type: "checkbox", id: "opt-" + b.id });
      opt.checked = !!st.optOut;
      opt.addEventListener("change", () => { st.optOut = opt.checked; ctx.save(); draw(); });
      if (!st.optOut) sh.inner.append(frame);
      sh.inner.append(h("label", { class: "check", for: "opt-" + b.id, style: st.optOut ? "margin-top:0" : null }, opt,
        h("span", null, "I can't watch YouTube on this network. Show me a text summary instead.")));
      if (st.optOut || !id) sh.inner.append(h("div", { class: "summary" }, h("h4", null, "Text summary: " + v.title), v.summary.map((p) => h("p", null, p))));
      const rv = h("input", { type: "checkbox", id: "rev-" + b.id });
      rv.checked = !!st.done;
      rv.addEventListener("change", () => {
        st.mode = (st.optOut || !id) ? "summary" : "video";
        if (rv.checked) { ctx.complete(); sh.showDone(); } else { ctx.undo(); sh.hideDone(); }
      });
      sh.inner.append(h("div", { class: "reviewed-box" }, h("label", { class: "check", for: "rev-" + b.id }, rv,
        h("span", null, h("strong", null, (st.optOut || !id) ? "I've read the summary." : "I've watched the video."), " Required to continue."))));
    }
    draw();
    return sh.el;
  };

  /* ---------- Rewrite with model reveal ---------- */
  R.rewrite = function (b, st, ctx) {
    const sh = shell(b, "Rewrite", st);
    st.items = st.items || {};
    b.items.forEach((it, i) => {
      const s = st.items[i] || (st.items[i] = { text: "", revealed: false });
      const out = h("div");
      const ta = h("textarea", { rows: 3, "aria-label": "Your rewrite of: " + it.original }); ta.value = s.text || "";
      ta.addEventListener("input", () => { s.text = ta.value; ctx.save(); });
      const showModel = () => out.append(h("div", { class: "model" }, h("b", null, "Model answer: "), it.model, h("br"), h("span", { class: "muted", style: "font-size:15px" }, "Why it works: " + it.why)));
      const btn = h("button", { class: "btn small", onclick: () => {
        out.innerHTML = "";
        if (!ta.value.trim()) { out.append(msg("bad", "Write your version first, then compare it with the model.")); ta.focus(); return; }
        s.revealed = true; ctx.save(); showModel(); btn.remove();
        if (b.items.every((_, j) => st.items[j] && st.items[j].revealed) && !st.done) { ctx.complete(); sh.showDone(); }
      } }, "Compare with model answer");
      sh.inner.append(h("div", { class: "rw" }, h("p", { class: "orig" }, it.original), ta, s.revealed ? null : h("div", { class: "act-actions" }, btn), out));
      if (s.revealed) showModel();
    });
    return sh.el;
  };

  /* ---------- Heat map self-assessment ---------- */
  R.heatmap = function (b, st, ctx) {
    const sh = shell(b, "Self-assessment", st);
    st.ratings = st.ratings || {};
    function lowest() { const rated = b.steps.filter((s) => st.ratings[s.id]); if (rated.length < b.steps.length) return null; return rated.reduce((a, s) => (st.ratings[s.id] < st.ratings[a.id] ? s : a)); }
    function draw() {
      sh.inner.innerHTML = "";
      const low = lowest();
      b.steps.forEach((s) => {
        const rate = h("div", { class: "rate", role: "group", "aria-label": "Rate " + s.label });
        for (let v = 1; v <= 5; v++) rate.append(h("button", { type: "button", "data-v": v, "aria-pressed": st.ratings[s.id] === v ? "true" : "false", "aria-label": s.label + ": " + v,
          onclick: () => { st.ratings[s.id] = v; ctx.save(); draw(); } }, v));
        sh.inner.append(h("div", { class: "heat-row" + (low && low.id === s.id ? " lowest" : "") }, h("span", { class: "lbl" }, s.label), rate));
      });
      if (!low) { sh.inner.append(h("p", { class: "muted", style: "font-size:15px;margin-top:12px" }, "Rate all eight conditions (" + Object.keys(st.ratings).length + " of " + b.steps.length + " done) to reveal your weakest step.")); return; }
      const out = h("div");
      const ev = h("textarea", { rows: 3, id: b.id + "-ev" }); ev.value = st.evidence || ""; ev.addEventListener("input", () => { st.evidence = ev.value; ctx.save(); });
      const ac = h("textarea", { rows: 3, id: b.id + "-ac" }); ac.value = st.action || ""; ac.addEventListener("input", () => { st.action = ac.value; ctx.save(); });
      st.lowest = low.id;
      sh.inner.append(h("div", { class: "heat-focus" },
        h("h3", null, "Your weakest condition: " + low.label),
        h("p", { style: "margin-bottom:6px" }, "Sample actions to consider:"), h("ul", { class: "prose" }, low.actions.map((a) => h("li", null, a))),
        h("div", { class: "field" }, h("label", { class: "field-label", for: b.id + "-ev" }, "What evidence supports this rating?"), ev),
        h("div", { class: "field" }, h("label", { class: "field-label", for: b.id + "-ac" }, "One management action you'll take"), h("span", { class: "hint" }, "Check: does it change the condition, or just add communication?"), ac),
        h("button", { class: "btn small", onclick: () => {
          out.innerHTML = "";
          if (!ev.value.trim() || !ac.value.trim()) { out.append(msg("bad", "Add both your evidence and your action before saving. A rating without evidence is a guess.")); (ev.value.trim() ? ac : ev).focus(); return; }
          ctx.complete(); sh.showDone(); out.append(msg("ok", "Saved to your PDF."));
        } }, "Save my assessment"), out));
    }
    draw();
    return sh.el;
  };

  /* ================= Collaboration course: additional block types ================= */
  function findBlock(id) {
    for (const m of C.modules) for (const s of m.screens) for (const x of blocksOf(s)) if (x.b.id === id) return { b: x.b, st: S.blocks[x.key] || {} };
    return null;
  }
  /* Static: concept cards */
  function conceptsEl(b) {
    return h("div", { class: "concepts" + (b.cols ? " cols-" + b.cols : "") }, b.items.map((c, i) => h("div", { class: "concept" },
      h("span", { class: "concept-bar", "aria-hidden": "true", style: "background:" + PAIR_COLORS[i % PAIR_COLORS.length] }),
      h("div", null, h("b", null, c.title), c.tag ? h("small", null, c.tag) : null, h("span", { html: c.text })))));
  }
  /* Static: closing visual — the logo bars, with one still missing */
  function puzzleEl(b) {
    const heights = [70, 100, 82, 100, 64];
    const wrap = h("div", { class: "closing-bars", "aria-hidden": "true" });
    heights.forEach((ht, i) => { const d = h("span", { class: "cbar" }); d.style.height = ht + "%"; d.style.background = ["#2CD1C9", "#00B5E2", "#51B1DB", "#68D1C7", "#1270A0"][i]; wrap.append(d); });
    const you = h("span", { class: "cbar you" }, h("em", null, "You")); you.style.height = "92%"; wrap.append(you);
    setTimeout(() => you.classList.add("filled"), 700);
    return h("figure", { class: "closing" }, wrap, b.caption ? h("figcaption", null, b.caption) : null);
  }

  /* ---------- Story with a missing line ---------- */
  R.story = function (b, st, ctx) {
    const sh = shell(b, "Warm-up", st);
    const out = h("div");
    sh.inner.append(h("ol", { class: "story" }, b.lines.map((l, i) => i === b.gap ? h("li", { class: "gap" }, "This line is missing.") : h("li", null, l))));
    const ta = h("textarea", { id: "ta-" + b.id, rows: 3, placeholder: b.placeholder || "" }); ta.value = st.text || "";
    ta.addEventListener("input", () => { st.text = ta.value; ctx.save(); });
    const reveal = () => out.append(h("div", { class: "model" }, h("b", null, "What it means: "), b.reveal));
    const btn = h("button", { class: "btn small", onclick: () => {
      out.innerHTML = "";
      if (ta.value.trim().length < 3) { out.append(msg("bad", "Write your missing line first. Any answer works; there's no right one.")); ta.focus(); return; }
      st.text = ta.value; ctx.complete(); sh.showDone(); reveal(); btn.remove();
    } }, "See what it means");
    sh.inner.append(h("div", { class: "field" }, h("label", { class: "field-label", for: "ta-" + b.id }, b.label), ta), h("div", { class: "act-actions", hidden: st.done ? true : null }, btn), out);
    if (st.done) reveal();
    return sh.el;
  };

  /* ---------- Team-player style self-assessment ---------- */
  R.styleassess = function (b, st, ctx) {
    const sh = shell(b, "Self-assessment", st);
    st.answers = st.answers || {};
    // Each learner sees options in their own random order, so no style sits in a predictable position.
    if (!st.order) { st.order = b.items.map((it) => shuffle(it.options.map((_, i) => i))); ctx.save(); }
    const keys = Object.keys(b.styles);
    const result = h("div", { "aria-live": "polite" });
    const out = h("div");
    function showResult() {
      result.innerHTML = "";
      const counts = st.counts, top = st.result, n = b.items.length;
      result.append(h("h3", { class: "sa-head" }, top.length > 1 ? "Your result: a blend" : "Your result"),
        h("div", { class: "sa-bars" }, keys.map((k) => { const f = h("i"); f.style.background = b.styles[k].color; f.style.width = Math.round(counts[k] / n * 100) + "%";
          return h("div", { class: "sa-bar" }, h("span", { class: "sa-name" }, k), h("span", { class: "sa-track" }, f), h("span", { class: "sa-n" }, counts[k])); })),
        ...top.map((t) => { const s = b.styles[t]; const card = h("div", { class: "style-card" },
          h("p", { class: "sc-kicker" }, (top.length > 1 ? "Part of your blend" : "Your main style") + " · " + s.focus), h("h3", null, t),
          h("dl", null, h("dt", null, "You bring"), h("dd", null, s.bring), h("dt", null, "Watch for"), h("dd", null, s.watch), h("dt", null, "The team needs you to"), h("dd", null, s.need)));
          card.style.borderLeftColor = s.color; return card; }),
        h("p", { class: "muted", style: "font-size:15.5px" }, b.after),
        h("div", { class: "act-actions" }, h("button", { class: "linkbtn", onclick: () => { st.answers = {}; st.counts = null; st.result = null; st.order = null; ctx.undo(); sh.hideDone(); const n2 = R.styleassess(b, st, ctx); sh.el.replaceWith(n2); } }, "Retake the self-assessment")));
    }
    if (b.intro) sh.inner.append(h("p", { class: "act-prompt" }, b.intro));
    b.items.forEach((it, i) => {
      const fs = h("fieldset", null, h("legend", null, (i + 1) + ". " + it.q));
      st.order[i].forEach((oi) => {
        const r = h("input", { type: "radio", name: b.id + "-" + i, value: oi, disabled: st.done ? true : null });
        r.checked = st.answers[i] === oi;
        r.addEventListener("change", () => { st.answers[i] = oi; qd.classList.remove("unanswered"); ctx.save(); });
        fs.append(h("label", null, r, h("span", null, it.options[oi].t)));
      });
      const qd = h("div", { class: "q" }, fs); sh.inner.append(qd);
    });
    if (!st.done) sh.inner.append(h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => {
      out.innerHTML = "";
      const missing = b.items.map((_, i) => i).filter((i) => st.answers[i] == null);
      if (missing.length) { const qs = sh.el.querySelectorAll(".q"); missing.forEach((i) => qs[i].classList.add("unanswered"));
        out.append(msg("bad", "Answer all " + b.items.length + " statements to see your style. Still open: " + missing.map((i) => "statement " + (i + 1)).join(", ") + ".")); qs[missing[0]].scrollIntoView({ behavior: "smooth", block: "center" }); return; }
      const counts = {}; keys.forEach((k) => (counts[k] = 0));
      b.items.forEach((it, i) => counts[it.options[st.answers[i]].s]++);
      const max = Math.max(...Object.values(counts));
      st.counts = counts; st.result = keys.filter((k) => counts[k] === max);
      ctx.complete(); sh.showDone(); sh.el.querySelectorAll("input[type=radio]").forEach((r) => (r.disabled = true));
      out.remove(); sh.el.querySelector(".act-actions").remove(); showResult();
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    } }, "See my style")), out);
    sh.inner.append(result);
    if (st.done && st.result) showResult();
    return sh.el;
  };

  /* ---------- Network map ---------- */
  R.netmap = function (b, st, ctx) {
    const sh = shell(b, "Your network map", st);
    st.lists = st.lists || {};
    const out = h("div"), gap = h("div", { "aria-live": "polite" }), commit = h("div");
    const lines = (id) => (st.lists[id] || "").split("\n").filter((x) => x.trim()).length;
    sh.inner.append(h("div", { class: "netgrid" }, b.networks.map((n) => {
      const ta = h("textarea", { id: b.id + "-" + n.id, rows: 4, placeholder: "One name or role per line" }); ta.value = st.lists[n.id] || "";
      ta.addEventListener("input", () => { st.lists[n.id] = ta.value; ctx.save(); });
      return h("div", { class: "field" }, h("label", { class: "field-label", for: b.id + "-" + n.id }, n.name), h("span", { class: "hint" }, h("em", null, n.q), " For example: " + n.who), ta);
    })));
    function drawCommit() {
      commit.innerHTML = "";
      const w = b.networks.find((n) => n.id === st.weakest);
      gap.innerHTML = ""; gap.append(msg("info", "Your thinnest network is <strong>" + esc(w.name) + "</strong> (" + lines(w.id) + " " + (lines(w.id) === 1 ? "person" : "people") + "). Most leaders find this. Think about who should be there but isn't, and pick one of them below."));
      const mk = (id, label, hint) => { const ta = h("textarea", { id: b.id + "-" + id, rows: 2 }); ta.value = st[id] || ""; ta.addEventListener("input", () => { st[id] = ta.value; ctx.save(); });
        return h("div", { class: "field" }, h("label", { class: "field-label", for: b.id + "-" + id }, label), hint ? h("span", { class: "hint" }, hint) : null, ta); };
      const o2 = h("div");
      commit.append(mk("connect", "One person I will connect with this week", "Name or role, and how: a coffee, a call, a message."), mk("offer", "What I can offer them", "Give before you ask: knowledge, credit, help, an introduction."),
        h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => {
          o2.innerHTML = "";
          if (!(st.connect || "").trim() || !(st.offer || "").trim()) { o2.append(msg("bad", "Add both the person and what you can offer them. Short answers are fine.")); return; }
          ctx.complete(); sh.showDone(); o2.append(msg("ok", "Saved. This goes into your action plan and your PDF."));
        } }, "Save my connection")), o2);
    }
    sh.inner.append(h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => {
      out.innerHTML = "";
      const total = b.networks.reduce((a, n) => a + lines(n.id), 0);
      if (total < 2) { out.append(msg("bad", "List at least a few people across your networks first, one per line. Roles are fine if you'd rather not use names.")); return; }
      let min = Infinity; b.networks.forEach((n) => { if (lines(n.id) <= min) { min = lines(n.id); st.weakest = n.id; } });
      ctx.save(); drawCommit();
    } }, "Find my gap")), out, gap, commit);
    if (st.weakest) drawCommit();
    return sh.el;
  };

  /* ---------- Appreciation message ---------- */
  R.appreciate = function (b, st, ctx) {
    const sh = shell(b, "Recognition", st);
    const out = h("div");
    const nm = h("input", { type: "text", id: b.id + "-name" }); nm.value = st.name || "";
    nm.addEventListener("input", () => { st.name = nm.value; ctx.save(); });
    const ta = h("textarea", { id: b.id + "-msg", rows: 4, placeholder: "Be specific: what did they do, and what difference did it make?" }); ta.value = st.text || "";
    ta.addEventListener("input", () => { st.text = ta.value; ctx.save(); });
    sh.inner.append(h("div", { class: "field" }, h("label", { class: "field-label", for: b.id + "-name" }, "Who is it for?"), nm),
      h("div", { class: "field" }, h("label", { class: "field-label", for: b.id + "-msg" }, b.label), ta),
      h("div", { class: "act-actions" },
        h("button", { class: "btn small", onclick: () => {
          out.innerHTML = "";
          if (!nm.value.trim() || ta.value.trim().length < 10) { out.append(msg("bad", "Add who it's for and a message of at least a sentence.")); (nm.value.trim() ? ta : nm).focus(); return; }
          ctx.complete(); sh.showDone(); out.append(msg("ok", "Saved. Now send it to them today, in Teams, chat, or email, in your own words."));
        } }, "Save my message")), out);
    return sh.el;
  };

  /* ---------- Action plan (gathers commitments from earlier activities) ---------- */
  function planValue(row) {
    const f = findBlock(row.ref); if (!f) return "";
    const st = f.st;
    switch (f.b.type) {
      case "form": return row.field ? (st.values || {})[row.field] || "" : f.b.fields.map((x) => (st.values || {})[x.id]).filter(Boolean).join("\n");
      case "reflect": case "story": return st.text || "";
      case "styleassess": return st.result ? st.result.join(" and ") : "";
      case "netmap": if (row.field === "weakest") { const n = f.b.networks.find((x) => x.id === st.weakest); return n ? n.name : ""; }
        return [st.connect, st.offer ? "What I can offer: " + st.offer : ""].filter((x) => x && x.trim()).join("\n");
      case "appreciate": return st.text ? (st.name ? "To " + st.name + ": " : "") + st.text : "";
      default: return "";
    }
  }
  R.plan = function (b, st, ctx) {
    const sh = shell(b, "Your action plan", st);
    st.values = st.values || {};
    const out = h("div");
    sh.inner.append(h("dl", { class: "plan" }, b.rows.map((r) => { const v = planValue(r);
      return [h("dt", null, r.label), h("dd", { class: v ? "" : "empty" }, v || "Not filled in yet. You can go back to that activity from the menu.")]; })));
    const fieldEls = b.fields.map((f) => { const ta = h("textarea", { id: b.id + "-" + f.id, rows: 2 }); ta.value = st.values[f.id] || "";
      ta.addEventListener("input", () => { st.values[f.id] = ta.value; ctx.save(); });
      return h("div", { class: "field" }, h("label", { class: "field-label", for: b.id + "-" + f.id }, f.label), f.prompt ? h("span", { class: "hint" }, f.prompt) : null, ta); });
    sh.inner.append(...fieldEls, h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => {
      out.innerHTML = "";
      const miss = b.fields.filter((f) => !f.optional && !(st.values[f.id] || "").trim());
      if (miss.length) { out.append(msg("bad", "Complete: " + miss.map((f) => "<strong>" + esc(f.label) + "</strong>").join(", ") + ".")); return; }
      ctx.complete(); sh.showDone(); out.append(msg("ok", "Plan saved. It's included in the PDF you can download at the end."));
    } }, "Save my plan")), out);
    return sh.el;
  };

  /* ---------- Shared: count-up number animation and toast ---------- */
  function countUp(el, to, suffix, ms) {
    suffix = suffix || ""; ms = ms || 900;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = to + suffix; return; }
    const t0 = performance.now(), from = 0;
    const step = (t) => { const k = Math.min(1, (t - t0) / ms), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(from + (to - from) * e) + suffix; if (k < 1) requestAnimationFrame(step); };
    el.textContent = "0" + suffix; requestAnimationFrame(step);
  }
  let toastTimer = null;
  function toast(text) {
    let t = document.getElementById("toast");
    if (!t) { t = h("div", { id: "toast", class: "toast", role: "status" }); document.body.append(t); }
    t.textContent = text; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }
  // Seeded RNG so a learner always sees the same generated grid.
  function rng(seedStr) { let x = 2166136261; for (const ch of seedStr) { x ^= ch.charCodeAt(0); x = Math.imul(x, 16777619); } return () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return ((x >>> 0) % 100000) / 100000; }; }

  /* ---------- Accordion (collapse and expand) ---------- */
  function accordionEl(b) {
    const wrap = h("div", { class: "accordion" });
    b.items.forEach((it, i) => {
      const pid = "acc-" + (b.id || "x") + "-" + i;
      const panel = h("div", { class: "acc-panel", id: pid, role: "region" }, h("div", { class: "acc-inner", html: it.html }));
      const btn = h("button", { class: "acc-btn", type: "button", "aria-expanded": "false", "aria-controls": pid },
        h("span", { class: "acc-num", "aria-hidden": "true" }, String(i + 1).padStart(2, "0")), h("span", { class: "acc-title" }, it.title), h("span", { class: "acc-icon", "aria-hidden": "true" }));
      btn.addEventListener("click", () => { const open = btn.getAttribute("aria-expanded") !== "true"; btn.setAttribute("aria-expanded", open ? "true" : "false"); item.classList.toggle("open", open); });
      const item = h("div", { class: "acc-item" }, btn, panel);
      wrap.append(item);
    });
    return h("div", null, b.intro ? h("p", { class: "muted", style: "font-size:15px;margin:0 0 10px" }, b.intro) : null, wrap);
  }

  /* ---------- Crossword ---------- */
  R.crossword = function (b, st, ctx) {
    const sh = shell(b, "Crossword", st);
    st.cells = st.cells || {}; st.hints = st.hints || 0;
    const [H, W] = b.size;
    const key = (r, c) => r + "," + c;
    const sol = {}, starts = {};
    b.words.forEach((w, wi) => { for (let i = 0; i < w.a.length; i++) { const r = w.r + (w.d === "D" ? i : 0), c = w.c + (w.d === "A" ? i : 0); sol[key(r, c)] = w.a[i]; } starts[key(w.r, w.c)] = true; });
    let n = 0; const num = {};
    for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) if (starts[key(r, c)]) num[key(r, c)] = ++n;
    const words = b.words.map((w, wi) => ({ ...w, wi, n: num[key(w.r, w.c)], cells: Array.from(w.a, (_, i) => key(w.r + (w.d === "D" ? i : 0), w.c + (w.d === "A" ? i : 0))) }));
    const solved = (w) => w.cells.every((k) => (st.cells[k] || "") === sol[k]);
    let cur = { w: words[0], i: 0 };
    const inputs = {};
    const grid = h("div", { class: "cw-grid", role: "grid", "aria-label": "Crossword grid" }); grid.style.gridTemplateColumns = "repeat(" + W + ", minmax(0, 1fr))";
    const clueEls = {};
    const out = h("div");
    for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
      const k = key(r, c);
      if (!sol[k]) { grid.append(h("span", { class: "cw-cell block", "aria-hidden": "true" })); continue; }
      const inp = h("input", { type: "text", maxlength: 1, autocomplete: "off", autocapitalize: "characters", spellcheck: "false", "aria-label": "Row " + (r + 1) + ", column " + (c + 1), "data-k": k });
      inp.value = st.cells[k] || ""; inputs[k] = inp;
      if (st.done) inp.readOnly = true;
      inp.addEventListener("focus", () => { const ws = words.filter((w) => w.cells.includes(k)); if (!ws.includes(cur.w)) cur.w = ws[0]; cur.i = cur.w.cells.indexOf(k); paint(); inp.select(); });
      inp.addEventListener("mousedown", () => { if (document.activeElement === inp) { const ws = words.filter((w) => w.cells.includes(k)); if (ws.length > 1) { cur.w = ws.find((w) => w !== cur.w); cur.i = cur.w.cells.indexOf(k); paint(); } } });
      inp.addEventListener("keydown", (e) => {
        if (st.done) return;
        if (e.key === "Backspace") { e.preventDefault(); if (inp.value) { setCell(k, ""); } else move(-1, true); return; }
        const arrows = { ArrowRight: [0, 1], ArrowLeft: [0, -1], ArrowDown: [1, 0], ArrowUp: [-1, 0] };
        if (arrows[e.key]) { e.preventDefault(); const [dr, dc] = arrows[e.key]; let rr = r + dr, cc = c + dc; while (rr >= 0 && rr < H && cc >= 0 && cc < W && !sol[key(rr, cc)]) { rr += dr; cc += dc; } if (inputs[key(rr, cc)]) { const ws = words.filter((w) => w.cells.includes(key(rr, cc))); cur.w = ws.find((w) => w.d === (dr ? "D" : "A")) || ws[0]; inputs[key(rr, cc)].focus(); } return; }
        if (/^[a-zA-Z]$/.test(e.key)) { e.preventDefault(); setCell(k, e.key.toUpperCase()); move(1); }
      });
      inp.addEventListener("input", () => { const v = inp.value.replace(/[^a-z]/gi, "").slice(-1).toUpperCase(); setCell(k, v); if (v) move(1); });
      const cell = h("span", { class: "cw-cell", "data-k": k }, num[k] ? h("small", { "aria-hidden": "true" }, num[k]) : null, inp);
      grid.append(cell);
    }
    function setCell(k, v) { st.cells[k] = v; inputs[k].value = v; inputs[k].parentNode.classList.remove("wrong"); ctx.save(); checkSolved(); paint(); }
    function move(d, erase) { const ni = cur.i + d; if (ni < 0 || ni >= cur.w.cells.length) return; cur.i = ni; const k = cur.w.cells[ni]; if (erase) setCell(k, ""); inputs[k].focus(); }
    const seenSolved = new Set(words.filter(solved).map((w) => w.wi));
    function checkSolved() {
      words.forEach((w) => { if (solved(w) && !seenSolved.has(w.wi)) { seenSolved.add(w.wi);
        w.cells.forEach((k, i) => { const el = inputs[k].parentNode; el.style.animationDelay = i * 55 + "ms"; el.classList.remove("wave"); void el.offsetWidth; el.classList.add("wave"); }); } });
      if (words.every(solved) && !st.done) { ctx.complete(); sh.showDone(); Object.values(inputs).forEach((i) => (i.readOnly = true)); out.innerHTML = ""; out.append(msg("ok", "<strong>Solved.</strong> Every answer is correct" + (st.hints ? " (with " + st.hints + " hint" + (st.hints > 1 ? "s" : "") + ")." : ", with no hints."))); actions.remove(); }
    }
    function paint() {
      grid.querySelectorAll(".cw-cell").forEach((el) => { const k = el.dataset.k; el.classList.toggle("inword", !!k && cur.w.cells.includes(k)); el.classList.toggle("solved", !!k && words.some((w) => w.cells.includes(k) && solved(w))); });
      Object.entries(clueEls).forEach(([wi, el]) => { el.classList.toggle("current", +wi === cur.w.wi); el.classList.toggle("done", solved(words[wi])); });
      live.textContent = cur.w.n + " " + (cur.w.d === "A" ? "across" : "down") + ": " + cur.w.clue + " (" + cur.w.a.length + " letters)";
    }
    const live = h("p", { class: "cw-live", "aria-live": "polite" });
    const clueList = (d, label) => h("div", { class: "cw-clues" }, h("h4", null, label), h("ol", null, words.filter((w) => w.d === d).sort((a, z) => a.n - z.n).map((w) => {
      const li = h("li", { tabindex: "0" }, h("b", null, w.n), h("span", null, w.clue + " (" + w.a.length + ")"));
      li.addEventListener("click", () => { cur.w = w; cur.i = 0; inputs[w.cells.find((k) => !st.cells[k]) || w.cells[0]].focus(); });
      li.addEventListener("keydown", (e) => { if (e.key === "Enter") li.click(); });
      clueEls[w.wi] = li; return li; })));
    const actions = h("div", { class: "act-actions" },
      h("button", { class: "btn small", onclick: () => {
        out.innerHTML = "";
        let wrong = 0, empty = 0;
        Object.keys(sol).forEach((k) => { const v = st.cells[k] || ""; if (!v) empty++; else if (v !== sol[k]) { wrong++; inputs[k].parentNode.classList.add("wrong"); } });
        if (!wrong && !empty) return checkSolved();
        out.append(msg(wrong ? "bad" : "info", (wrong ? wrong + " letter" + (wrong > 1 ? "s are" : " is") + " wrong (shown in red). " : "No wrong letters so far. ") + (empty ? empty + " square" + (empty > 1 ? "s are" : " is") + " still empty." : "")));
      } }, "Check my letters"),
      h("button", { class: "btn small ghost", onclick: () => {
        const k = cur.w.cells.find((x) => (st.cells[x] || "") !== sol[x]) || Object.keys(sol).find((x) => (st.cells[x] || "") !== sol[x]);
        if (!k) return; st.hints++; setCell(k, sol[k]); inputs[k].parentNode.classList.add("hinted"); inputs[k].focus();
      } }, "Reveal a letter"));
    sh.inner.append(h("div", { class: "cw" }, h("div", { class: "cw-board" }, grid, live), h("div", { class: "cw-side" }, clueList("A", "Across"), clueList("D", "Down"))), actions, out);
    if (st.done) actions.remove();
    if (st.done) out.append(msg("ok", "<strong>Solved.</strong> Every answer is correct."));
    paint();
    return sh.el;
  };

  /* ---------- Word search ---------- */
  R.wordsearch = function (b, st, ctx) {
    const sh = shell(b, "Word search", st);
    st.found = st.found || [];
    const N = b.size, dirs = [[0, 1], [1, 0], [1, 1], [-1, 1]];
    let grid, place;
    for (let attempt = 0; attempt < 200; attempt++) {
      const R1 = rng(b.id + ":" + attempt); grid = Array.from({ length: N }, () => Array(N).fill("")); place = {}; let ok = true;
      for (const w of b.words.map((x) => x.w).sort((a, z) => z.length - a.length)) {
        let done = false;
        for (let t = 0; t < 300 && !done; t++) {
          const [dr, dc] = dirs[Math.floor(R1() * dirs.length)], r = Math.floor(R1() * N), c = Math.floor(R1() * N);
          const er = r + dr * (w.length - 1), ec = c + dc * (w.length - 1);
          if (er < 0 || er >= N || ec < 0 || ec >= N) continue;
          let fits = true; for (let i = 0; i < w.length; i++) { const g = grid[r + dr * i][c + dc * i]; if (g && g !== w[i]) { fits = false; break; } }
          if (!fits) continue;
          for (let i = 0; i < w.length; i++) grid[r + dr * i][c + dc * i] = w[i];
          place[w] = [r, c, er, ec]; done = true;
        }
        if (!done) { ok = false; break; }
      }
      if (ok) { const A = "ABCDEFGHIKLMNOPRSTUVWY"; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!grid[r][c]) grid[r][c] = A[Math.floor(R1() * A.length)]; break; }
    }
    const board = h("div", { class: "ws-board" });
    const cellsEl = h("div", { class: "ws-grid" }); cellsEl.style.gridTemplateColumns = "repeat(" + N + ", minmax(0, 1fr))";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("class", "ws-lines"); svg.setAttribute("viewBox", "0 0 " + N + " " + N); svg.setAttribute("preserveAspectRatio", "none"); svg.setAttribute("aria-hidden", "true");
    const cellBtns = [];
    for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) { const bt = h("button", { class: "ws-cell", type: "button", "data-r": r, "data-c": c, "aria-label": "Row " + (r + 1) + " column " + (c + 1) + ": " + grid[r][c] }, grid[r][c]); cellBtns.push(bt); cellsEl.append(bt); }
    board.append(svg, cellsEl);
    const list = h("ul", { class: "ws-list" });
    const note = h("div", { class: "ws-note", "aria-live": "polite" });
    const count = h("p", { class: "muted", style: "font-size:15px;margin:0 0 10px" });
    function capsule(r1, c1, r2, c2, cls) {
      const ln = document.createElementNS("http://www.w3.org/2000/svg", "line");
      ln.setAttribute("x1", c1 + 0.5); ln.setAttribute("y1", r1 + 0.5); ln.setAttribute("x2", c2 + 0.5); ln.setAttribute("y2", r2 + 0.5); ln.setAttribute("class", cls);
      const len = Math.hypot(r2 - r1, c2 - c1) || 0.01; ln.style.setProperty("--len", len); ln.setAttribute("stroke-dasharray", len); ln.setAttribute("stroke-dashoffset", cls.includes("new") ? len : 0);
      svg.append(ln); return ln;
    }
    function drawList() {
      list.innerHTML = "";
      b.words.forEach((x) => list.append(h("li", { class: st.found.includes(x.w) ? "found" : "" }, h("b", null, x.w), st.found.includes(x.w) ? h("small", null, x.note) : null)));
      count.textContent = st.done ? "All " + b.words.length + " words found." : "Found " + st.found.length + " of " + b.words.length + ". Drag across a word, or select its first and last letters.";
    }
    st.found.forEach((w) => { const p = place[w]; if (p) capsule(p[0], p[1], p[2], p[3], "found"); });
    let start = null, preview = null, pending = null, dragging = false;
    const cellAt = (x, y) => { const el = document.elementFromPoint(x, y); return el && el.closest && el.closest(".ws-cell"); };
    const rc = (el) => [+el.dataset.r, +el.dataset.c];
    function aligned(a, z) { const dr = z[0] - a[0], dc = z[1] - a[1]; return dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc); }
    function clearPreview() { if (preview) { preview.remove(); preview = null; } cellBtns.forEach((x) => x.classList.remove("armed")); }
    function evaluate(a, z) {
      clearPreview();
      const dr = Math.sign(z[0] - a[0]), dc = Math.sign(z[1] - a[1]), len = Math.max(Math.abs(z[0] - a[0]), Math.abs(z[1] - a[1])) + 1;
      let s = ""; for (let i = 0; i < len; i++) s += grid[a[0] + dr * i][a[1] + dc * i];
      const rev = s.split("").reverse().join("");
      const hit = b.words.find((x) => (x.w === s || x.w === rev) && !st.found.includes(x.w));
      if (hit) {
        st.found.push(hit.w); ctx.save(); capsule(a[0], a[1], z[0], z[1], "found new");
        note.innerHTML = ""; note.append(h("div", { class: "ws-pop" }, h("b", null, hit.w), " ", hit.note));
        drawList();
        if (st.found.length === b.words.length && !st.done) { ctx.complete(); sh.showDone(); drawList(); }
      } else if (len > 2) { const l = capsule(a[0], a[1], z[0], z[1], "miss"); setTimeout(() => l.remove(), 450); }
    }
    cellsEl.addEventListener("pointerdown", (e) => { const el = e.target.closest(".ws-cell"); if (!el || st.done) return; e.preventDefault(); start = rc(el); dragging = false; try { cellsEl.releasePointerCapture(e.pointerId); } catch (x) {} });
    window.addEventListener("pointermove", (e) => {
      if (!start) return; const el = cellAt(e.clientX, e.clientY); if (!el || !cellsEl.contains(el)) return;
      const z = rc(el); if (z[0] === start[0] && z[1] === start[1]) return;
      dragging = true; if (!aligned(start, z)) return;
      if (preview) preview.remove(); preview = capsule(start[0], start[1], z[0], z[1], "preview");
    });
    window.addEventListener("pointerup", (e) => {
      if (!start) return; const el = cellAt(e.clientX, e.clientY); const a = start; start = null;
      if (dragging && el && cellsEl.contains(el) && aligned(a, rc(el))) { pending = null; evaluate(a, rc(el)); return; }
      clearPreview();
      if (!dragging && el) tap(rc(el), el);
    });
    function tap(z, el) {
      if (st.done) return;
      if (!pending) { pending = z; el.classList.add("armed"); return; }
      const a = pending; pending = null;
      if (a[0] === z[0] && a[1] === z[1]) { clearPreview(); return; }
      if (!aligned(a, z)) { clearPreview(); pending = z; el.classList.add("armed"); return; }
      evaluate(a, z);
    }
    cellsEl.addEventListener("click", (e) => { if (e.detail !== 0) return; const el = e.target.closest(".ws-cell"); if (el) tap(rc(el), el); }); // keyboard
    const hintBtn = h("button", { class: "linkbtn", onclick: () => { const w = b.words.find((x) => !st.found.includes(x.w)); if (!w) return; const p = place[w.w]; const el = cellBtns[p[0] * N + p[1]]; el.classList.remove("hint"); void el.offsetWidth; el.classList.add("hint"); } }, "Show me where a word starts");
    drawList();
    sh.inner.append(count, h("div", { class: "ws" }, board, h("div", { class: "ws-side" }, list, note, st.done ? null : hintBtn)));
    return sh.el;
  };

  /* ---------- Quiz game board ("Jeopardy" style) ---------- */
  R.jeopardy = function (b, st, ctx) {
    const sh = shell(b, "Review game", st);
    st.played = st.played || {};
    const all = []; b.cats.forEach((c, ci) => c.clues.forEach((q, qi) => all.push({ ci, qi, k: ci + "-" + qi, q })));
    const maxPts = all.reduce((a, x) => a + x.q.v, 0);
    const pts = () => all.reduce((a, x) => a + (st.played[x.k] === "right" ? x.q.v : 0), 0);
    const scoreNum = h("b", null, String(pts()));
    const scoreBar = h("div", { class: "jp-score" }, h("span", null, "Your score"), scoreNum, h("small", null, "of " + maxPts));
    const stage = h("div", { class: "jp-stage" });
    function board() {
      stage.innerHTML = "";
      const g = h("div", { class: "jp-board" }); g.style.gridTemplateColumns = "repeat(" + b.cats.length + ", 1fr)";
      b.cats.forEach((c) => g.append(h("div", { class: "jp-cat" }, c.name)));
      const rows = Math.max(...b.cats.map((c) => c.clues.length));
      for (let qi = 0; qi < rows; qi++) b.cats.forEach((c, ci) => {
        const q = c.clues[qi]; if (!q) { g.append(h("span")); return; }
        const k = ci + "-" + qi, res2 = st.played[k];
        const t = h("button", { class: "jp-tile" + (res2 ? " played " + res2 : ""), type: "button", disabled: res2 ? true : null, "aria-label": c.name + " for " + q.v + (res2 ? (res2 === "right" ? ", answered correctly" : ", answered") : "") },
          res2 ? h("span", { class: "jp-mark" }, res2 === "right" ? "+" + q.v : "0") : String(q.v));
        t.addEventListener("click", () => openClue(ci, qi, t));
        g.append(t);
      });
      stage.append(g);
      const left = all.filter((x) => !st.played[x.k]).length;
      if (!left) {
        const p = pts(), pct = p / maxPts;
        stage.append(msg("ok", "<strong>Board cleared.</strong> " + (pct >= 0.8 ? "Excellent recall. You're ready for the final check." : pct >= 0.5 ? "Solid. Review the explanations for the ones you missed before the final check." : "Worth a second look. Replay the board, or revisit the modules from the menu.")),
          h("div", { class: "act-actions" }, h("button", { class: "linkbtn", onclick: () => { st.played = {}; ctx.save(); scoreNum.textContent = "0"; board(); } }, "Replay the board")));
        st.best = Math.max(st.best || 0, Math.round(pct * 100)); ctx.save(); if (!st.done) { ctx.complete(); sh.showDone(); }
      } else stage.append(h("p", { class: "muted", style: "font-size:15px;margin:12px 0 0" }, left + " of " + all.length + " clues left. Pick any tile."));
    }
    function openClue(ci, qi) {
      const c = b.cats[ci], q = c.clues[qi], k = ci + "-" + qi;
      stage.innerHTML = "";
      const card = h("div", { class: "jp-clue" }, h("p", { class: "jp-meta" }, c.name + " · " + q.v), h("p", { class: "jp-q" }, q.q));
      const opts = h("div", { class: "opts" }); const fb = h("div", { "aria-live": "polite" });
      q.options.forEach((o, oi) => opts.append(h("button", { class: "opt", type: "button", onclick: (e) => {
        opts.querySelectorAll(".opt").forEach((x, xi) => { x.disabled = true; if (xi === q.answer) x.classList.add("right"); });
        const ok = oi === q.answer; if (!ok) e.currentTarget.classList.add("wrong");
        st.played[k] = ok ? "right" : "wrong"; ctx.save();
        if (ok) { const from = +scoreNum.textContent || 0, to = pts(); countUpFrom(scoreNum, from, to); scoreBar.classList.remove("bump"); void scoreBar.offsetWidth; scoreBar.classList.add("bump"); }
        fb.append(msg(ok ? "ok" : "bad", "<strong>" + (ok ? "Correct, +" + q.v + "." : "Not quite.") + "</strong> " + esc(q.explain)),
          h("div", { class: "act-actions" }, h("button", { class: "btn small dark", onclick: () => { board(); stage.scrollIntoView({ behavior: "smooth", block: "nearest" }); } }, "Back to the board")));
      } }, o)));
      card.append(opts, fb); stage.append(card);
    }
    function countUpFrom(el, from, to) {
      if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = to; return; }
      const t0 = performance.now(); const step = (t) => { const k2 = Math.min(1, (t - t0) / 700); el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k2, 3))); if (k2 < 1) requestAnimationFrame(step); }; requestAnimationFrame(step);
    }
    if (b.intro) sh.inner.append(h("p", { class: "act-prompt" }, b.intro));
    sh.inner.append(scoreBar, stage);
    board();
    return sh.el;
  };

  /* ---------------- Page: final check ---------------- */
  function pageFinal(card) {
    card.append(hero("Wrap-up", "Final check", null, true));
    const body = h("div", { class: "body" });
    if (!allPathDone()) {
      body.append(h("p", { class: "lead" }, "The final check unlocks when you've completed Part 1 and every module in your path."));
      if (!hasProfile()) body.append(msg("info", "You haven't chosen your profile yet."), h("div", { class: "act-actions" }, h("button", { class: "btn", onclick: () => go("#/welcome") }, "Choose my profile")));
      else {
        body.append(h("h2", { style: "font-size:21px" }, "Still to complete"),
          h("ul", { class: "modlist" }, pathMods().filter((m) => !modDone(m)).map((m) => h("li", null, markerEl(modPct(m)),
            h("div", { class: "grow" }, h("b", null, T(m.title)), h("small", null, Math.round(modPct(m) * 100) + "% complete")),
            h("button", { class: "btn small ghost", onclick: () => go("#/m/" + m.id + "/" + resumeScreen(m)) }, "Open")))));
      }
      card.append(body); return;
    }
    const qs = finalQs();
    const F = Fin();
    body.append(h("p", { class: "lead" }, qs.length + " questions drawn from Part 1 and your " + profileLabel() + " path. You need " + C.finalCheck.passMark + "% to earn your certificate, and you can retake it."),
      F.best != null ? h("p", { class: "muted" }, "Best score so far: " + F.best + "% across " + F.attempts + " attempt" + (F.attempts > 1 ? "s" : "") + ".") : null);
    body.append(quizUI(qs, F, { name: "final", big: true, save: () => save(), submitLabel: "Submit final check",
      scoreNote: () => (F.score >= C.finalCheck.passMark ? ". You passed." : ". You need " + C.finalCheck.passMark + "% to pass. Review the explanations and retake when you're ready."),
      onSubmit: () => { if (F.best >= C.finalCheck.passMark && !S.passedAt[pk()]) S.passedAt[pk()] = Date.now(); save(true); renderNav({ page: "final" }); },
      after: () => (F.score >= C.finalCheck.passMark || passed()) ? h("button", { class: "btn small", onclick: () => go("#/cert") }, "Get my certificate") : null }));
    card.append(body);
  }

  /* ---------------- Page: certificate and answers ---------------- */
  function cfuScores() {
    return pathMods().flatMap((m) => m.screens.flatMap((s) => blocksOf(s).filter((x) => x.b.type === "quiz" || x.b.type === "jeopardy").map((x) => ({ m, b: x.b, st: S.blocks[x.key] }))));
  }
  function pageCert(card) {
    card.append(hero("Wrap-up", "Certificate and answers", null, true));
    const body = h("div", { class: "body" });
    const cfus = cfuScores().filter((x) => x.st && x.st.best != null);
    const cfuAvg = cfus.length ? Math.round(cfus.reduce((a, x) => a + x.st.best, 0) / cfus.length) : null;
    body.append(h("div", { class: "stats" },
      h("div", { class: "stat" }, h("small", null, "Time invested"), h("b", null, fmtTime(S.time.total))),
      h("div", { class: "stat" }, h("small", null, "Final check (best)"), h("b", null, hasProfile() && Fin().best != null ? Fin().best + "%" : "Not taken")),
      h("div", { class: "stat" }, h("small", null, "Review game (best)"), h("b", null, cfuAvg != null ? cfuAvg + "%" : "None yet"))));

    body.append(h("h2", null, "Your certificate"));
    if (!passed()) {
      body.append(msg("info", "Your certificate unlocks when you score " + C.finalCheck.passMark + "% or higher on the final check." + (allPathDone() ? "" : " Complete your path modules first to unlock the final check.")),
        h("div", { class: "act-actions" }, h("button", { class: "btn small", onclick: () => go(allPathDone() ? "#/final" : (hasProfile() ? S.last : "#/welcome")) }, allPathDone() ? "Go to the final check" : "Continue my path")));
    } else {
      const out = h("div");
      const input = h("input", { type: "text", id: "cert-name", value: S.name || "", autocomplete: "name" });
      const canvas = h("canvas", { width: 1600, height: 1131, role: "img", "aria-label": "Certificate preview" });
      const redraw = () => drawCert(canvas).catch(() => {});
      input.addEventListener("input", () => { S.name = input.value.trim(); save(); redraw(); });
      body.append(h("div", { class: "panel" }, h("label", { class: "field-label", for: "cert-name" }, "Name on certificate"), h("div", { class: "row" }, input)),
        h("div", { class: "cert-wrap" }, canvas),
        h("div", { class: "act-actions" }, h("button", { class: "btn", id: "dl-cert", onclick: async () => {
          out.innerHTML = "";
          if (!input.value.trim()) { out.append(msg("bad", "Enter your name before downloading the certificate.")); input.focus(); return; }
          S.name = input.value.trim(); save(true); await drawCert(canvas);
          const a = h("a", { href: canvas.toDataURL("image/png"), download: C.fileSlug + "-Certificate-" + S.name.replace(/[^A-Za-z0-9]+/g, "-") + ".png" });
          document.body.append(a); a.click(); a.remove();
          out.append(msg("ok", "Certificate downloaded as a PNG."));
        } }, "Download certificate (PNG)")), out);
      redraw();
    }

    body.append(h("h2", { style: "margin-top:38px" }, "Download your answers"),
      h("p", null, "Get a PDF of every reflection, plan, rewrite, and activity result from your path, plus your scores. It's a useful record to bring to a conversation with your manager or coach."));
    const pout = h("div");
    body.append(h("div", { class: "act-actions" }, h("button", { class: "btn dark", id: "dl-pdf", onclick: async () => {
      pout.innerHTML = "";
      if (!window.PDFLib) { pout.append(msg("bad", "The PDF tool didn't load. Refresh the page and try again.")); return; }
      try { const bytes = await buildPDF(); downloadBlob(new Blob([bytes], { type: "application/pdf" }), C.fileSlug + "-My-Answers" + (S.name ? "-" + S.name.replace(/[^A-Za-z0-9]+/g, "-") : "") + ".pdf"); pout.append(msg("ok", "PDF downloaded.")); }
      catch (e) { console.error(e); pout.append(msg("bad", "The PDF couldn't be created: " + esc(e.message))); }
    } }, "Download PDF of my answers")), pout);

    if (hasProfile()) body.append(h("h2", { style: "margin-top:38px" }, "Your progress"), moduleList(pathMods()));
    card.append(body);
  }
  function downloadBlob(blob, name) {
    const url = URL.createObjectURL(blob); const a = h("a", { href: url, download: name });
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
  }

  /* ---------------- Certificate canvas ---------------- */
  const imgCache = {};
  function loadImg(src) {
    if (!imgCache[src]) imgCache[src] = new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    return imgCache[src];
  }
  async function drawCert(cv) {
    const F = '"Proxima Nova", "Helvetica Neue", Arial, sans-serif';
    if (document.fonts) await Promise.all(["400 30px", "600 30px", "700 30px"].map((w) => document.fonts.load(w + " 'Proxima Nova'").catch(() => {})));
    const [logo, bars] = await Promise.all([loadImg("img/logo-horizontal-dark.png"), loadImg("img/hero-bars.png")]);
    const x = cv.getContext("2d"), W = cv.width, H = cv.height;
    x.clearRect(0, 0, W, H);
    x.fillStyle = "#FFFFFF"; x.fillRect(0, 0, W, H);
    // navy band with bar motif
    x.fillStyle = "#101E38"; x.fillRect(0, 0, W, 300);
    x.save(); x.beginPath(); x.rect(0, 0, W, 300); x.clip();
    x.globalAlpha = 0.9; x.drawImage(bars, W - 400, 20, 330, 330 * bars.height / bars.width); x.restore();
    const g = x.createLinearGradient(0, 0, W, 0); g.addColorStop(0, "#2CD1C9"); g.addColorStop(1, "#00B5E2");
    x.fillStyle = g; x.fillRect(0, 300, W, 10);
    x.fillStyle = "#68D1C7"; x.font = "600 30px " + F; x.fillText("Certificate of completion", 110, 110);
    const fit = (t, weight, max, maxW) => { let sz = max; x.font = weight + " " + sz + "px " + F; while (x.measureText(t).width > maxW && sz > 20) { sz -= 2; x.font = weight + " " + sz + "px " + F; } };
    x.fillStyle = "#FFFFFF"; fit(C.title, 700, 78, W - 560); x.fillText(C.title, 110, 210);
    x.fillStyle = "#DEE6EF"; fit(C.subtitle, 600, 38, W - 560); x.fillText(C.subtitle, 110, 262);
    // body
    x.fillStyle = "#5B6779"; x.font = "400 32px " + F; x.fillText("This certifies that", 110, 420);
    let name = S.name || "Your name";
    let size = 96; x.font = "700 " + size + "px " + F;
    while (x.measureText(name).width > W - 220 && size > 48) { size -= 4; x.font = "700 " + size + "px " + F; }
    x.fillStyle = "#101E38"; x.fillText(name, 110, 530);
    x.fillStyle = "#68D1C7"; x.fillRect(110, 560, Math.min(x.measureText(name).width, W - 220), 6);
    x.fillStyle = "#2A384D"; x.font = "400 32px " + F;
    x.fillText("has completed " + C.title + (hasProfile() ? ": " + pathName(S.role) + " (" + C.roles[S.role].name + ", " + C.functions[S.fn].name + ")," : ","), 110, 635);
    x.fillText(C.certLine, 110, 680);
    // stats
    const date = new Date(S.passedAt[pk()] || Date.now()).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    const stats = [["Date completed", date], ["Time invested", fmtTime(S.time.total)], ["Knowledge check score", (Fin().best != null ? Fin().best : 0) + "%"]];
    stats.forEach(([k, v], i) => {
      const sx = 110 + i * 470;
      x.fillStyle = "#EFF4F7"; roundRect(x, sx, 760, 430, 150, 18); x.fill();
      x.fillStyle = "#5B6779"; x.font = "600 26px " + F; x.fillText(k, sx + 32, 815);
      x.fillStyle = "#101E38"; x.font = "700 46px " + F; x.fillText(v, sx + 32, 875);
    });
    x.drawImage(logo, 110, 990, 360, 360 * logo.height / logo.width);
    x.fillStyle = "#5B6779"; x.font = "400 24px " + F; x.textAlign = "right"; x.fillText("Learning and Development", W - 110, 1060); x.textAlign = "left";
  }
  function roundRect(x, X, Y, w, hh, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + hh, r); x.arcTo(X + w, Y + hh, X, Y + hh, r); x.arcTo(X, Y + hh, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }

  /* ---------------- PDF of answers (pdf-lib, vendored) ---------------- */
  const CP1252 = "\u20AC\u201A\u0192\u201E\u2026\u2020\u2021\u02C6\u2030\u0160\u2039\u0152\u017D\u2018\u2019\u201C\u201D\u2022\u2013\u2014\u02DC\u2122\u0161\u203A\u0153\u017E\u0178";
  function clean(s) {
    return String(s == null ? "" : s).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
      .replace(/\u2191/g, "up").replace(/\u2193/g, "down").replace(/\u2713/g, "v").replace(/\t/g, "  ")
      .split("").map((c) => (c.charCodeAt(0) < 256 || CP1252.includes(c) || c === "\n" ? c : "?")).join("").replace(/\r/g, "");
  }
  async function buildPDF() {
    const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
    const doc = await PDFDocument.create();
    doc.setTitle(C.title + ": my answers"); doc.setAuthor(S.name || "Learner");
    const reg = await doc.embedFont(StandardFonts.Helvetica), bold = await doc.embedFont(StandardFonts.HelveticaBold);
    const PW = 595.28, PH = 841.89, M = 54, MW = PW - M * 2;
    const INK = rgb(0.063, 0.118, 0.22), TXT = rgb(0.165, 0.22, 0.30), MUT = rgb(0.36, 0.40, 0.47), TEAL = rgb(0.08, 0.48, 0.45);
    let page, y;
    const newPage = () => { page = doc.addPage([PW, PH]); y = PH - M; page.drawText(clean(C.title) + ": my answers" + (S.name ? " | " + clean(S.name) : ""), { x: M, y: 26, size: 8, font: reg, color: MUT }); };
    newPage();
    function wrap(text, font, size, width) {
      const lines = [];
      for (const para of clean(text).split("\n")) {
        const words = para.split(/\s+/); let line = "";
        if (!para.trim()) { lines.push(""); continue; }
        for (const w of words) {
          const t = line ? line + " " + w : w;
          if (font.widthOfTextAtSize(t, size) <= width) line = t;
          else {
            if (line) lines.push(line);
            let ww = w; while (font.widthOfTextAtSize(ww, size) > width) { let k = ww.length; while (k > 1 && font.widthOfTextAtSize(ww.slice(0, k), size) > width) k--; lines.push(ww.slice(0, k)); ww = ww.slice(k); }
            line = ww;
          }
        }
        lines.push(line);
      }
      return lines;
    }
    function text(t, o) {
      o = Object.assign({ font: reg, size: 10.5, color: TXT, gap: 4, indent: 0, lh: 1.38 }, o);
      const lines = wrap(t, o.font, o.size, MW - o.indent);
      for (const ln of lines) {
        if (y - o.size < M) newPage();
        page.drawText(ln, { x: M + o.indent, y: y - o.size, size: o.size, font: o.font, color: o.color });
        y -= o.size * o.lh;
      }
      y -= o.gap;
    }
    const space = (n) => { y -= n; if (y < M) newPage(); };
    // Cover block
    page.drawRectangle({ x: 0, y: PH - 150, width: PW, height: 150, color: INK });
    page.drawText(clean(C.title), { x: M, y: PH - 78, size: 26, font: bold, color: rgb(1, 1, 1) });
    page.drawText(clean(C.subtitle) + " | My answers and results", { x: M, y: PH - 104, size: 12, font: reg, color: rgb(0.41, 0.82, 0.78) });
    y = PH - 180;
    text("Learner: " + (S.name || "(name not entered)"), { font: bold, size: 12, color: INK, gap: 2 });
    text("Profile: " + (hasProfile() ? C.roles[S.role].name + ", " + C.functions[S.fn].name + " (" + pathName(S.role) + "; scenario: " + C.profiles[pk()].change + ")" : "Not chosen"), { gap: 2 });
    text("Generated: " + new Date().toLocaleString(), { gap: 2 });
    text("Time invested: " + fmtTime(S.time.total), { gap: 2 });
    const FF = Fin();
    text("Final check: " + (FF.best != null ? "best " + FF.best + "% (" + FF.attempts + " attempt" + (FF.attempts > 1 ? "s" : "") + ", pass mark " + C.finalCheck.passMark + "%)" + (passed() ? ", passed" : ", not yet passed") : "not taken"), { gap: 2 });
    const cf = cfuScores().filter((x) => x.st && x.st.best != null);
    text("Review game: " + (cf.length ? cf.map((x) => T(x.m.title) + " " + x.st.best + "%").join("; ") : "none completed"), { gap: 12 });

    const mods = hasProfile() ? pathMods() : foundationMods();
    for (const m of mods) {
      space(8);
      if (y < M + 80) newPage();
      page.drawRectangle({ x: M, y: y - 4, width: 4, height: 18, color: TEAL });
      text(T(m.title), { font: bold, size: 15, color: INK, indent: 12, gap: 2 });
      text(Math.round(modPct(m) * 100) + "% complete", { size: 9, color: MUT, indent: 12, gap: 8 });
      for (const scr of m.screens) for (const xb of blocksOf(scr)) {
        const b = xb.b;
        if (!INTERACTIVE.has(b.type)) continue;
        const st = S.blocks[xb.key] || {};
        const status = st.done ? "Completed" : "Not completed";
        const head = (t) => text(t, { font: bold, size: 11, color: INK, gap: 2 });
        const ans = (t) => text(t && String(t).trim() ? t : "(no answer)", { indent: 10, gap: 6, color: t && String(t).trim() ? TXT : MUT });
        switch (b.type) {
          case "reflect": head("Reflection: " + b.prompt); ans(st.text); break;
          case "form": head(b.title); for (const f of b.fields) { text(f.label, { font: bold, size: 9.5, color: MUT, indent: 10, gap: 0 }); ans((st.values || {})[f.id]); } break;
          case "rewrite": head(b.title + " (" + status + ")"); b.items.forEach((it, i) => { const s = (st.items || {})[i] || {}; text("Original: " + it.original, { indent: 10, size: 9.5, color: MUT, gap: 1 }); text("My version: " + (s.text || "(none)"), { indent: 10, gap: 1 }); text("Model: " + it.model, { indent: 10, size: 9.5, color: TEAL, gap: 6 }); }); break;
          case "heatmap": head(b.title + " (" + status + ")"); text(b.steps.map((s) => s.label + ": " + ((st.ratings || {})[s.id] || "-")).join("  |  "), { indent: 10, size: 9.5, gap: 3 });
            if (st.lowest) { text("Weakest condition: " + b.steps.find((s) => s.id === st.lowest).label, { indent: 10, font: bold, size: 10, gap: 1 }); text("Evidence: " + (st.evidence || "(none)"), { indent: 10, gap: 1 }); text("Action: " + (st.action || "(none)"), { indent: 10, gap: 6 }); } break;
          case "quiz": head("Check for understanding: " + (st.best != null ? "best " + st.best + "%" + (st.attempts > 1 ? " over " + st.attempts + " attempts" : "") : "not taken")); space(2); break;
          case "video": { const v = CFG.videos[b.videoKey]; head("Video: " + v.title); text(st.done ? "Reviewed (" + (st.mode === "summary" ? "read the text summary" : "watched the video") + ")" : "Not yet reviewed", { indent: 10, gap: 6 }); break; }
          case "sim": { const w = Object.values(st.wrong || {}).reduce((a, x) => a + x.length, 0); head("Scenario: " + b.title); text(st.done ? "Completed with " + w + " less effective choice" + (w === 1 ? "" : "s") + " along the way." : "In progress: step " + Math.min((st.step || 0) + 1, b.steps.length) + " of " + b.steps.length + ".", { indent: 10, gap: 6 }); break; }
          case "profiles": { const n = b.profiles.filter((p) => st.p && st.p[p.id] && st.p[p.id].done).length; head("Diagnosis activity: " + b.title); text(n + " of " + b.profiles.length + " team members diagnosed. " + status + ".", { indent: 10, gap: 6 }); break; }
          case "hotspot": head("Scavenger hunt: " + b.title); text(status + ". Found " + (st.found || []).length + " of " + b.find + (st.missed && st.missed.length ? ", with " + st.missed.length + " other item" + (st.missed.length > 1 ? "s" : "") + " examined." : "."), { indent: 10, gap: 6 }); break;
          case "story": head(b.title); ans(st.text); break;
          case "crossword": head("Crossword: " + b.title); text(st.done ? "Solved" + (st.hints ? " with " + st.hints + " hint" + (st.hints > 1 ? "s" : "") : " with no hints") + "." : "Not yet solved.", { indent: 10, gap: 6 }); break;
          case "wordsearch": head("Word search: " + b.title); text("Found " + (st.found || []).length + " of " + b.words.length + " words. " + status + ".", { indent: 10, gap: 6 }); break;
          case "jeopardy": { const tot = b.cats.reduce((a, c) => a + c.clues.reduce((x, q) => x + q.v, 0), 0); let got = 0; b.cats.forEach((c, ci) => c.clues.forEach((q, qi) => { if ((st.played || {})[ci + "-" + qi] === "right") got += q.v; }));
            head("Review game: " + b.title); text(status + ". Score: " + got + " of " + tot + " points.", { indent: 10, gap: 6 }); break; }
          case "styleassess": head(b.title + " (" + status + ")"); if (st.result) text("My style: " + st.result.join(" and ") + ". Scores: " + Object.keys(b.styles).map((k) => k + " " + st.counts[k]).join(" | "), { indent: 10, gap: 6 }); else ans(""); break;
          case "netmap": head(b.title + " (" + status + ")"); b.networks.forEach((n) => { text(n.name, { font: bold, size: 9.5, color: MUT, indent: 10, gap: 0 }); ans((st.lists || {})[n.id]); });
            if (st.weakest) text("Thinnest network: " + b.networks.find((n) => n.id === st.weakest).name, { indent: 10, font: bold, size: 10, gap: 1 });
            text("I will connect with: " + (st.connect || "(none)"), { indent: 10, gap: 1 }); text("What I can offer: " + (st.offer || "(none)"), { indent: 10, gap: 6 }); break;
          case "appreciate": head(b.title); ans(st.text ? "To " + (st.name || "(no name)") + ": " + st.text : ""); break;
          case "plan": head(b.title + " (" + status + ")"); b.rows.forEach((r) => { text(r.label, { font: bold, size: 9.5, color: MUT, indent: 10, gap: 0 }); ans(planValue(r)); });
            b.fields.forEach((f) => { text(f.label, { font: bold, size: 9.5, color: MUT, indent: 10, gap: 0 }); ans((st.values || {})[f.id]); }); break;
          case "flip": head("Flip cards: " + b.title); text((st.seen || []).length + " of " + b.cards.length + " explored. " + status + ".", { indent: 10, gap: 6 }); break;
          default: head(({ bucket: "Sorting", sequence: "Sequencing", match: "Matching" }[b.type] || "Activity") + ": " + b.title);
            text(status + (st.attempts ? " (" + st.attempts + " check" + (st.attempts > 1 ? "s" : "") + ")" : "") + ".", { indent: 10, gap: 6 });
        }
      }
    }
    return doc.save();
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    const menu = $("#menu-btn"), backdrop = $("#backdrop");
    menu.addEventListener("click", () => { const open = document.body.classList.toggle("nav-open"); menu.setAttribute("aria-expanded", open ? "true" : "false"); });
    const closeNav = () => { document.body.classList.remove("nav-open"); menu.setAttribute("aria-expanded", "false"); };
    backdrop.addEventListener("click", closeNav);
    $("#close-btn").addEventListener("click", () => { closeNav(); menu.focus(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.body.classList.remove("nav-open"); });
    // Copy and paste are turned off so learners write their answers in their own words.
    const block = (text) => (e) => { e.preventDefault(); toast(text); };
    document.addEventListener("paste", block("Paste is turned off in this course. Type your answer in your own words."), true);
    document.addEventListener("drop", (e) => { if (e.target.closest && e.target.closest("input, textarea")) { e.preventDefault(); toast("Type your answer in your own words."); } }, true);
    document.addEventListener("copy", block("Copying is turned off in this course."), true);
    document.addEventListener("cut", block("Copying is turned off in this course."), true);
    render();
  }
  // Exposed for automated QA only.
  window.__course = { get state() { return S; }, save: () => save(true), fmtTime, pk,
    block: (id) => { for (const m of C.modules) for (const s of m.screens) for (const x of blocksOf(s)) if (x.b.id === id) return Object.assign({}, x.b, { __key: x.key }); return null; },
    finalQs: () => finalQs(), final: () => Fin() };
  boot();
})();
