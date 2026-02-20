---
title: "2026 February site update: Image zoom, gallery, newletter"
created: 2026-02-20T10:03
modified: 2026-02-20T12:11
description: A site update for Carlos's Blog introducing image zoom, galleries, and newsletters.
tags:
  - site-update
  - rss
---
# Image zoom
I've included [`medium-zoom`](https://www.npmjs.com/package/medium-zoom) to all relevant images on this site so you could click images to zoom in on them if needed. On mobile, this may work *unreliably*, but you can always open the image itself on a new tab (or simply save it) as a fallback. Just another quality-of-life update for desktop users like myself.

![[image-zoom-preview.gif]]

There are some nuances with `medium-zoom` and Quartz 4 itself, though. Since the latter is using some quirky SPA code, it *clears the CSS* injected by `medium-zoom` on navigation. Right now, the workaround I did was to simply "hardcode" the injected CSS into `custom.scss`. Since class names are static, this helped fix the flakiness of the image zoom functionality across navigation.

# Gallery layouts
I've also leveraged [`remark-directive`](https://github.com/remarkjs/remark-directive) to provide a custom `:::gallery` directive for me to organize pictures in a two-column (single-column on mobile) layout for pages dedicated mostly to images. [[batanes-photos-2025|The gallery for our 2025 Batanes trip]] is what I used to test this out on.

:::gallery
![[Pasted image 20260220115743.png|The view on desktop.]]
![[Pasted image 20260220115939.png|The view from the "back end" of things.]]
:::

This two-column setup for photos above is itself, a gallery! Well, not really a gallery, but a `gallery`.

Later down the line, I might consider a masonry-style layout for images with differing aspect ratios.

# Newsletter
You'll notice that there's a new form on the right-hand side of the page (on mobile, at the bottom of the page, but it's still styled like shit):

![[Pasted image 20260220102540.png]]

Now, this isn't as *good* as Substack or other newsletters you may subscribe to. I could definitely code up a newsletter server to do it and have full control; but this is just for friends who'd like to be notified via email. This is powered by **follow.it**, and it's totally free on my end, so if you prefer that channel, here you go.