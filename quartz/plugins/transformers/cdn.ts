import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

export const CdnAssets: QuartzTransformerPlugin = () => {
  return {
    name: "CdnAssets",
    htmlPlugins() {
      return [
        () => (tree) => {
          // Define your base CDN URL and the file extensions to intercept
          const cdnBase = "https://cdn.carlospanganiban.com/blog/assets/images/pasted"
          const assetExts = /\.(pdf|jpe?g|png|gif|webp|mp4|zip|svg)$/i

          visit(tree, "element", (node) => {
            // 1. Rewrite <img> tags
            if (node.properties?.src)
                console.log(node.properties?.src)
            if (node.tagName === "img" && node.properties?.src) {
              let src = String(node.properties.src)

              
              // Ignore external images that already have http/https
              if (!src.startsWith("http")) {
                // Extract just the filename from the path (e.g. "/img.png" -> "img.png")
                const filename = src.split('/').pop()
                
                // If it has a valid extension, rewrite it
                if (filename && filename.match(assetExts)) {
                  node.properties.src = `${cdnBase}/${filename}`
                }
              }
            }
            
            // 2. Rewrite <a> tags (direct links to PDFs, zips, etc.)
            if (node.tagName === "a" && node.properties?.href) {
              let href = String(node.properties.href)
              
              if (!href.startsWith("http")) {
                const filename = href.split('/').pop()
                
                if (filename && filename.match(assetExts)) {
                  node.properties.href = `${cdnBase}/${filename}`
                }
              }
            }
          })
        },
      ]
    },
  }
}