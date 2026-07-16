import { createRequire } from 'module';

createRequire(import.meta.url);
var l;
l = { __e: function(n2, l2, u3, t2) {
  for (var i2, o2, r2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((o2 = i2.constructor) && null != o2.getDerivedStateFromError && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// src/components/KindModeContent.tsx
function slugify(v2) {
  return v2.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function firstLetter(title) {
  const c2 = title.trim().charAt(0).toUpperCase();
  return /[A-Z0-9]/.test(c2) ? c2 : "#";
}
var KindModeContent_default = (() => {
  const KindModeContent = ({ fileData, allFiles }) => {
    const slug = fileData.slug ?? "";
    const sourceNotes = allFiles.filter((f3) => Boolean(f3.frontmatter?.type));
    let matches = [];
    let heading = "";
    if (slug.startsWith("kind/")) {
      const target = slug.slice("kind/".length);
      matches = sourceNotes.filter((f3) => slugify(String(f3.frontmatter?.kind ?? "")) === target);
      heading = String(matches[0]?.frontmatter?.kind ?? target);
    } else if (slug.startsWith("mode/")) {
      const target = slug.slice("mode/".length);
      matches = sourceNotes.filter((f3) => slugify(String(f3.frontmatter?.mode ?? "")) === target);
      heading = String(matches[0]?.frontmatter?.mode ?? target);
    } else if (slug.startsWith("grid/")) {
      const [kindSlug, modeSlug] = slug.slice("grid/".length).split("--");
      matches = sourceNotes.filter(
        (f3) => slugify(String(f3.frontmatter?.kind ?? "")) === kindSlug && slugify(String(f3.frontmatter?.mode ?? "")) === modeSlug
      );
      heading = `${String(matches[0]?.frontmatter?.kind ?? kindSlug)} \xB7 ${String(matches[0]?.frontmatter?.mode ?? modeSlug)}`;
    }
    const sorted = [...matches].sort(
      (a2, b) => String(a2.frontmatter?.title ?? "").localeCompare(String(b.frontmatter?.title ?? ""))
    );
    const groups = [];
    sorted.forEach((e2) => {
      const letter = firstLetter(String(e2.frontmatter?.title ?? ""));
      const last = groups[groups.length - 1];
      if (last && last.letter === letter) last.entries.push(e2);
      else groups.push({ letter, entries: [e2] });
    });
    return /* @__PURE__ */ u2("div", { class: "markdown-preview-view markdown-rendered", children: /* @__PURE__ */ u2("div", { class: "wrap", children: [
      /* @__PURE__ */ u2("h1", { class: "note-title", style: "text-align:center; font-size:32px; font-family:'MyHand','Fraunces',serif; font-weight:normal; margin:0 0 1.4rem;", children: heading }),
      /* @__PURE__ */ u2("p", { style: "text-align:center; color:var(--ink-soft); max-width:500px; margin:0 auto 2.4rem;", children: [
        matches.length,
        " ",
        matches.length === 1 ? "note" : "notes"
      ] }),
      groups.length > 1 && /* @__PURE__ */ u2("nav", { class: "toc", style: "max-width:300px; margin:0 auto 2.4rem;", children: [
        /* @__PURE__ */ u2("div", { class: "toc-header", children: /* @__PURE__ */ u2("h3", { children: "Jump to" }) }),
        /* @__PURE__ */ u2("ul", { class: "toc-content", style: "display:flex;flex-wrap:wrap;gap:0.6rem;list-style:none;padding:0;margin:0.6rem 0 0;", children: groups.map((g2, i2) => /* @__PURE__ */ u2("li", { children: /* @__PURE__ */ u2("a", { href: `#letter-${g2.letter}`, children: g2.letter }) }, i2)) })
      ] }),
      groups.map((g2, gi) => /* @__PURE__ */ u2("div", { children: [
        groups.length > 1 && /* @__PURE__ */ u2("h2", { id: `letter-${g2.letter}`, style: "font-family:'Fraunces',serif; font-weight:500; font-size:16px; color:var(--rubric); margin:2rem 0 0.6rem;", children: g2.letter }),
        /* @__PURE__ */ u2("div", { class: "entry-list-block", children: g2.entries.map((e2, i2) => /* @__PURE__ */ u2("div", { class: "entry", children: [
          /* @__PURE__ */ u2("span", { class: "num", children: String(e2.frontmatter?.coordinate ?? "") }),
          /* @__PURE__ */ u2("div", { children: [
            /* @__PURE__ */ u2("p", { class: "title", children: /* @__PURE__ */ u2("a", { href: `../${e2.slug}`, style: "color:inherit;text-decoration:none;", children: String(e2.frontmatter?.title ?? "") }) }),
            /* @__PURE__ */ u2("p", { class: "dek", children: String(e2.frontmatter?.description ?? "") }),
            /* @__PURE__ */ u2("span", { class: "mode", children: String(e2.frontmatter?.mode ?? "") })
          ] }),
          /* @__PURE__ */ u2("span", { class: "kind", children: String(e2.frontmatter?.kind ?? "") })
        ] }, i2)) })
      ] }, gi))
    ] }) });
  };
  return KindModeContent;
});

// src/pageType.ts
function slugify2(v2) {
  return v2.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
var matcher = ({ slug }) => slug.startsWith("kind/") || slug.startsWith("mode/") || slug.startsWith("grid/");
var KindModePage = () => ({
  name: "KindModePage",
  priority: 10,
  match: matcher,
  generate({ content }) {
    const allFiles = content.map((c2) => c2[1].data);
    const sourceNotes = allFiles.filter((f3) => Boolean(f3.frontmatter?.type));
    const kinds = /* @__PURE__ */ new Set();
    const modes = /* @__PURE__ */ new Set();
    const combos = /* @__PURE__ */ new Set();
    for (const f3 of sourceNotes) {
      const k2 = f3.frontmatter?.kind;
      const m2 = f3.frontmatter?.mode;
      if (k2) kinds.add(String(k2));
      if (m2) modes.add(String(m2));
      if (k2 && m2) combos.add(`${slugify2(String(k2))}--${slugify2(String(m2))}`);
    }
    const virtualPages = [];
    for (const k2 of kinds) virtualPages.push({ slug: `kind/${slugify2(k2)}`, title: k2, data: {} });
    for (const m2 of modes) virtualPages.push({ slug: `mode/${slugify2(m2)}`, title: m2, data: {} });
    for (const c2 of combos) virtualPages.push({ slug: `grid/${c2}`, title: c2, data: {} });
    return virtualPages;
  },
  layout: "kindmode",
  body: KindModeContent_default
});

export { KindModeContent_default as KindModeContent, KindModePage };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map