import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
// @ts-ignore
import zoomScript from "../../components/scripts/zoom.inline"

export const ImageZoom: QuartzTransformerPlugin = () => {
  return {
    name: "ImageZoom",
    htmlPlugins() {
      return [
        () => {
          return (tree) => {
            visit(tree, "element", (node) => {
              // Target only <img> elements with a defined src
              if (node.tagName === "img" && node.properties && typeof node.properties.src === "string") {
                const originalSrc = node.properties.src
                
                // Define the allowed extensions and the folder requirement
                const extensionRegex = /\.(jpg|jpeg|png|webp)$/i
                const imageFolderRegex = /([/\\])images([/\\])/

                // Only proceed if it's in the 'images' folder AND has a matching extension
                if (imageFolderRegex.test(originalSrc) && extensionRegex.test(originalSrc)) {
                  // 1. Tell medium-zoom to load the 20MB file on-click
                  node.properties["data-zoom-src"] = originalSrc
                  
                  // 2. Change the initial page load to use the 800px thumbnail
                  node.properties.src = originalSrc.replace(imageFolderRegex, "$1thumbs$2")
                }
              }
            })
          }
        },
      ]
    },
    externalResources() {
      return {
        js: [
          {
            script: zoomScript,
            loadTime: "afterDOMReady",
            contentType: "inline",
          },
        ],
      }
    },
  }
}