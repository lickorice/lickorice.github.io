import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

/* Styles for devices 900px and smaller (e.g., small laptops, tablets) */
@media screen and (max-width: 900px) {
  .page-title {
    font-size: 1.5rem; /* A slightly smaller size for tablets */
  }
}

/* Styles for devices 600px and smaller (e.g., mobile phones) */
@media screen and (max-width: 600px) {
  .page-title {
    font-size: 1.25rem; /* The smallest size for mobile */
  }
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
