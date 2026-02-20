import { QuartzTransformerPlugin } from "../types"
// @ts-ignore
import zoomScript from "../../components/scripts/zoom.inline"

export const ImageZoom: QuartzTransformerPlugin = () => {
  return {
    name: "ImageZoom",
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
