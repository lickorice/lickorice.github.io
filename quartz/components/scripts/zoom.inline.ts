import mediumZoom from "medium-zoom"

document.addEventListener("nav", () => {
  // We target images inside the article content specifically
  mediumZoom(".article-title + .content img, .popover-hint img", {
    margin: 24,
    scrollOffset: 0,
  })
})
