import mediumZoom, { Zoom } from "medium-zoom"

let zoomInstance: Zoom | null = null

function init() {
  const selector = ".popover-hint img, .gallery-item img, article img"
  
  // Detach old listeners to prevent memory leaks
  if (zoomInstance) {
    zoomInstance.detach()
  }

  // Re-initialize on the new set of images
  zoomInstance = mediumZoom(selector, {
    margin: 24,
    background: "var(--light)", // Use Quartz theme variables!
  })
}

// Quartz-specific SPA navigation listener
document.addEventListener("nav", () => {
  init()
})

// Initial load
init()