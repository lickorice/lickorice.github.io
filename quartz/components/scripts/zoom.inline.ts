import mediumZoom, { Zoom } from "medium-zoom"

let zoomInstance: Zoom | null = null

function init() {
  const selector = ".popover-hint img, .gallery-item img, article img"
  
  if (zoomInstance) {
    zoomInstance.detach()
  }

  zoomInstance = mediumZoom(selector, {
    margin: 24,
    background: "var(--light)",
  })

  zoomInstance.on("open", (event) => {
    const target = event.target as HTMLImageElement;
    
    if (target.getAttribute("data-zoom-src")) {
      const loader = document.createElement("div");
      loader.id = "medium-zoom-loader";
      document.body.appendChild(loader);

      // Trigger fade-in on next frame
      requestAnimationFrame(() => {
        loader.classList.add("is-visible");
      });

      const cleanup = () => {
        loader.classList.remove("is-visible");
        // Wait for the 0.1s transition to finish before removing from DOM
        setTimeout(() => {
          loader.remove();
        }, 100); 
      };

      // Remove loader once image is fully loaded or user cancels
      zoomInstance?.on("opened", cleanup, { once: true });
      zoomInstance?.on("closed", cleanup, { once: true });
      zoomInstance?.on("detach", cleanup, { once: true });
    }
  });
}

document.addEventListener("nav", () => init())
init()