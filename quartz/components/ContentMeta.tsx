import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      // Recommendation marker
      if (fileData.frontmatter?.recommended) {
        const recommended = (fileData.frontmatter?.recommended as string) == "y"
        if (recommended) {
          segments.push(
            <span style={{ color: "green" }}>✅ Recommended</span>
          )
        } else {
          segments.push(
            <span style={{ color: "red" }}>❌ Not recommended</span>
          )
        }
        segments.push(<span> • </span>)
      }
      
      // Steam link
      if (fileData.frontmatter?.steam) {
        segments.push(
          <a href={fileData.frontmatter?.steam as string} target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" alt="Steam icon" style="height: 0.9em; margin-right: 0.25em; vertical-align: middle;"></img>
            Steam
          </a>
        )
        segments.push(<span> • </span>)
      }

      // Wiktionary link
      if (fileData.frontmatter?.wiktionary) {
        segments.push(
          <a href={fileData.frontmatter?.wiktionary as string} target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Wiktionary_small.svg" alt="Wiktionary icon" style="height: 0.9em; margin-right: 0.25em; vertical-align: middle;"></img>
            Wiktionary
          </a>
        )
        segments.push(<span> • </span>)
      }

      // Wikipedia link
      if (fileData.frontmatter?.wikipedia) {
        segments.push(
          //place a wikipedia icon before the link
          <a href={fileData.frontmatter?.wikipedia as string} target="_blank">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png" alt="Wikipedia icon" style="height: 0.9em; margin-right: 0.25em; vertical-align: middle;"></img>
            Wikipedia
          </a>
        )
        segments.push(<span> • </span>)
      }

      // Date
      if (fileData.dates) {
        segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
        segments.push(<span> • </span>)
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(<span>{displayedTime}</span>)
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
