import { PageLayout, SharedLayout } from "./quartz/cfg"
import { FileTrieNode } from "./quartz/util/fileTrie"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"

// (lickorice/cgpanganiban) Explorer exclusion
const explorerFunc = (node: FileTrieNode) => {
  const excludedFolders = [
    "Glossary",
    "Random thoughts",
    "images",
  ]

  const isGlossaryEntry = node.data?.tags?.includes("glossary") === true

  const isExcludedFolder = node.isFolder && excludedFolders.includes(node.displayName)

  return !(isGlossaryEntry || isExcludedFolder)
}
const explorerIndexFunc = (node: FileTrieNode) => {
  const excludedFolders = [
    "images",
  ]

  const isExcludedFolder = node.isFolder && excludedFolders.includes(node.displayName)

  return !isExcludedFolder
}

const recentNotesFilter = (node: QuartzPluginData) => {
  console.log(node.frontmatter?.tags)
  const excludedTags = [
    "glossary",
    "thoughts",
  ]
  const hasExcludedTag = node.frontmatter?.tags?.some((tag) => excludedTags.includes(tag))
  return !hasExcludedTag
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/lickorice/lickorice.github.io",
      YouTube: "https://www.youtube.com/@CarlosPanganiban",
      Discord: "https://discord.gg/GA6wzdQMyY",
      "About Me": "https://carlospanganiban.com",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta({
      showComma: false,
    }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.DesktopOnly(
      Component.RecentNotes({
        title: "Recently updated",
        filter: recentNotesFilter,
      }),
    ),
    Component.Explorer({
      title: "Index",
      filterFn: explorerFunc,
    }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({
      title: "Full index",
      filterFn: explorerIndexFunc,
    }),
  ],
  right: [],
}
