import type { QuartzPageTypePlugin, PageMatcher, FullSlug, VirtualPage } from "@quartz-community/types"
import KindModeContent from "./components/KindModeContent"

function slugify(v: string): string {
  return v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

const matcher: PageMatcher = ({ slug }) =>
  slug.startsWith("kind/") || slug.startsWith("mode/") || slug.startsWith("grid/")

export const KindModePage: QuartzPageTypePlugin<{}> = () => ({
  name: "KindModePage",
  priority: 10,
  match: matcher,
  generate({ content }) {
    const allFiles = content.map((c) => c[1].data)
    const sourceNotes = allFiles.filter((f: any) => Boolean(f.frontmatter?.type))

    const kinds = new Set<string>()
    const modes = new Set<string>()
    const combos = new Set<string>()

    for (const f of sourceNotes as any[]) {
      const k = f.frontmatter?.kind
      const m = f.frontmatter?.mode
      if (k) kinds.add(String(k))
      if (m) modes.add(String(m))
      if (k && m) combos.add(`${slugify(String(k))}--${slugify(String(m))}`)
    }

    const virtualPages: VirtualPage[] = []
    for (const k of kinds) virtualPages.push({ slug: `kind/${slugify(k)}` as FullSlug, title: k, data: {} })
    for (const m of modes) virtualPages.push({ slug: `mode/${slugify(m)}` as FullSlug, title: m, data: {} })
    for (const c of combos) virtualPages.push({ slug: `grid/${c}` as FullSlug, title: c, data: {} })
    return virtualPages
  },
  layout: "kindmode",
  body: KindModeContent,
})