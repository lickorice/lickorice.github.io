import { FullPageLayout, PageLayout, SharedLayout } from "./quartz/cfg"
import { FileTrieNode } from "./quartz/util/fileTrie"
import * as Component from "./quartz/components"
import { QuartzPluginData } from "./quartz/plugins/vfile"
import { QuartzComponent } from "./quartz/components/types"

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

const recentPostsFilter = (node: QuartzPluginData) : boolean => {
  console.log(node.frontmatter?.tags)
  const includedTags = [
    "post",
  ]
  const hasIncludedTag = node.frontmatter?.tags?.some((tag) => includedTags.includes(tag)) ?? false
  return hasIncludedTag
}

const recentPagesFilter = (node: QuartzPluginData) : boolean => {
  console.log(node.frontmatter?.tags)
  const excludedTags = [
    "post",
    "stub",
  ]
  const hasExcludedTag = node.frontmatter?.tags?.some((tag) => excludedTags.includes(tag)) ?? false
  return !hasExcludedTag
}

const recentBlock = [
  Component.RecentNotes({
    title: "Recent posts",
    filter: recentPostsFilter,
    limit: 3,
    showTags: false,
  }),
  Component.RecentNotes({
    title: "Recent pages",
    filter: recentPagesFilter,
    limit: 2,
    showTags: false,
  }),
]

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    ...recentBlock.map((c) => Component.MobileOnly(c)),
  ],
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
        { Component: Component.DesktopOnly(Component.ReaderMode()) },
      ],
    }),
    ...recentBlock.map((c) => Component.DesktopOnly(c)),
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
