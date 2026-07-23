import type { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "@quartz-community/types"

function slugify(v: string): string {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

function firstLetter(title: string): string {
  const c = title.trim().charAt(0).toUpperCase()
  return /[A-Z0-9]/.test(c) ? c : "#"
}

export default (() => {
  const KindModeContent: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const slug = fileData.slug ?? ""
    const sourceNotes = allFiles.filter((f) => Boolean(f.frontmatter?.type))

    let matches: typeof sourceNotes = []
    let heading = ""

    if (slug.startsWith("kind/")) {
      const target = slug.slice("kind/".length)
      matches = sourceNotes.filter((f) => slugify(String(f.frontmatter?.kind ?? "")) === target)
      heading = String(matches[0]?.frontmatter?.kind ?? target)
    } else if (slug.startsWith("mode/")) {
      const target = slug.slice("mode/".length)
      matches = sourceNotes.filter((f) => slugify(String(f.frontmatter?.mode ?? "")) === target)
      heading = String(matches[0]?.frontmatter?.mode ?? target)
    } else if (slug.startsWith("grid/")) {
      const [kindSlug, modeSlug] = slug.slice("grid/".length).split("--")
      matches = sourceNotes.filter(
        (f) =>
          slugify(String(f.frontmatter?.kind ?? "")) === kindSlug &&
          slugify(String(f.frontmatter?.mode ?? "")) === modeSlug,
      )
      heading = `${String(matches[0]?.frontmatter?.kind ?? kindSlug)} · ${String(matches[0]?.frontmatter?.mode ?? modeSlug)}`
    }

    const sorted = [...matches].sort((a, b) =>
      String(a.frontmatter?.title ?? "").localeCompare(String(b.frontmatter?.title ?? "")),
    )
    const groups: { letter: string; entries: typeof sorted }[] = []
    sorted.forEach((e) => {
      const letter = firstLetter(String(e.frontmatter?.title ?? ""))
      const last = groups[groups.length - 1]
      if (last && last.letter === letter) last.entries.push(e)
      else groups.push({ letter, entries: [e] })
    })

    return (
      <div class="markdown-preview-view markdown-rendered">
        <div class="wrap">
          <details class="fold-nav-wrap">
            <summary class="fold-nav-button" aria-label="Menu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
              </svg>
            </summary>
            <nav class="fold-nav-panel">
              <a href="../">Home</a>
              <a href="../sources">Sources</a>
              <a href="../ideas">Ideas</a>
              <a href="../publications">Publications</a>
              <a href="../bibliography">Bibliography</a>
              <a href="../map">Map</a>
              <a href="../about">About</a>
            </nav>
          </details>

          <div class="page-header-mini">
            <div class="masthead-group-mini">
              <p class="eyebrow"><span class="eyebrow-text">an interdisciplinary research archive</span></p>
              <a href="../" class="masthead-mini" style="font-family:'MyHand','Fraunces',serif; font-weight:normal;">Annotated</a>
            </div>
            <img src="../static/underline-thick-gold.png" class="pencil-rule-mini" alt="" />
          </div>

          <h1 class="note-title" style="text-align:center; font-size:32px; font-family:'MyHand','Fraunces',serif; font-weight:normal; margin:0 0 0.6rem;">{heading}</h1>
          <img src="../static/underline-thin-sage.png" class="mark-underline-thin" style="margin: 0 auto 1.6rem;" alt="" />
          <p style="text-align:center; color:var(--ink-soft); max-width:500px; margin:0 auto 2.4rem;">
            {matches.length} {matches.length === 1 ? "note" : "notes"}
          </p>

          {groups.length > 1 && (
            <nav class="toc" style="max-width:300px; margin:0 auto 2.4rem;">
              <div class="toc-header"><h3>Jump to</h3></div>
              <ul class="toc-content" style="display:flex;flex-wrap:wrap;gap:0.6rem;list-style:none;padding:0;margin:0.6rem 0 0;">
                {groups.map((g, i) => (
                  <li key={i}><a href={`#letter-${g.letter}`}>{g.letter}</a></li>
                ))}
              </ul>
            </nav>
          )}

          {groups.map((g, gi) => (
            <div key={gi}>
              {groups.length > 1 && (
                <h2 id={`letter-${g.letter}`} style="font-family:'MyHand','Fraunces',serif; font-weight:normal; font-size:24px; color:var(--rubric); margin:2rem 0 0.6rem;">{g.letter}</h2>
              )}
              <div class="entry-list-block">
                {g.entries.map((e, i) => (
                  <div class="entry" key={i}>
                    <span class="num">{String(e.frontmatter?.coordinate ?? "")}</span>
                    <div>
                      <p class="title"><a href={`../${e.slug}`} style="color:inherit;text-decoration:none;">{String(e.frontmatter?.title ?? "")}</a></p>
                      <p class="dek">{String(e.frontmatter?.description ?? "")}</p>
                      <span class="mode">{String(e.frontmatter?.mode ?? "")}</span>
                    </div>
                    <span class="kind">{String(e.frontmatter?.kind ?? "")}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return KindModeContent
