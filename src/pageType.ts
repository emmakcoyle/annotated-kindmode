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

    const kindMap = new Map<string, string>()
    const modeMap = new Map<string, string>()
    const combos = new Set<string>()

    for (const f of sourceNotes as any[]) {
      const k = f.frontmatter?.kind
      const m = f.frontmatter?.mode

      if (k) {
        const ks = slugify(String(k))
        if (ks && !kindMap.has(ks)) kindMap.set(ks, String(k))
      }
      if (m) {
        const ms = slugify(String(m))
        if (ms && !modeMap.has(ms)) modeMap.set(ms, String(m))
      }
      if (k && m) {
        const ks = slugify(String(k))
        const ms = slugify(String(m))
        if (ks && ms) combos.add(`${ks}--${ms}`)
      }
    }

    const virtualPages: VirtualPage[] = []
    for (const [ks, label] of kindMap) virtualPages.push({ slug: `kind/${ks}` as FullSlug, title: label, data: {} })
    for (const [ms, label] of modeMap) virtualPages.push({ slug: `mode/${ms}` as FullSlug, title: label, data: {} })
    for (const c of combos) virtualPages.push({ slug: `grid/${c}` as FullSlug, title: c, data: {} })
    return virtualPages
  },
  layout: "kindmode",
  body: KindModeContent,
})
