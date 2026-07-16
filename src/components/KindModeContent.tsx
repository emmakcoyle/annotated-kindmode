import type { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "@quartz-community/types"

function slugify(v: string): string {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export default (() => {
  const KindModeContent: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const slug = fileData.slug ?? ""
    const sourceNotes = allFiles.filter((f) => f.frontmatter?.type === "source")

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

    return (
      <div class="markdown-preview-view markdown-rendered">
        <div class="wrap">
          <h1 class="note-title" style="text-align:center; font-size:32px; font-family:'MyHand','Fraunces',serif; font-weight:normal; margin:0 0 1.4rem;">{heading}</h1>
          <p style="text-align:center; color:var(--ink-soft); max-width:500px; margin:0 auto 2.4rem;">
            {matches.length} {matches.length === 1 ? "note" : "notes"}
          </p>
          <div class="entry-list-block">
            {matches.map((e, i) => (
              <div class="entry" key={i}>
                <span class="num">{String(e.frontmatter?.coordinate ?? "")}</span>
                <div>
                  <p class="title"><a href={`./${e.slug}`} style="color:inherit;text-decoration:none;">{String(e.frontmatter?.title ?? "")}</a></p>
                  <p class="dek">{String(e.frontmatter?.description ?? "")}</p>
                  <span class="mode">{String(e.frontmatter?.mode ?? "")}</span>
                </div>
                <span class="kind">{String(e.frontmatter?.kind ?? "")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return KindModeContent
}) satisfies QuartzComponentConstructor