# Immersive Cinematic UI

Live: https://immersive-cinematic-ui.netlify.app

Repo: https://github.com/cloudmenson/Immersive_Cinematic_UI

Video Walkthrough:

## Stack

Next.js 15 (App Router) · TypeScript · three.js · GSAP ScrollTrigger · Lenis · Framer Motion · Tailwind CSS v4

## Architecture

Feature-Sliced layout — `app` composes `widgets`, which consume primitives and hooks from `shared`.
The WebGL scene is isolated behind a single `createTreeScene(container)` factory that owns its
entire lifecycle and returns a disposer, so the React component stays a thin mount point.

## Performance

| | Before | After |
|---|---|---|
| Media payload | 161 MB | 9.5 MB |
| 3D models | 26 MB | 1.8 MB |
| Web fonts | 764 KB | 140 KB |
| First Load JS | 358 kB | 206 kB |
| `public/` total | 188 MB | 12 MB |

What produced those numbers:

- **Backdrop** was a 4K60 master at 72 MB (plus a 54 MB VP9 twin). Behind a 45% scrim it does not
  need 4K — re-encoded to 1080p24 with a separate 720p cut served to phones.
- **Cards** are rendered desaturated, so grayscale is baked into the file rather than applied as a
  CSS filter, which also removes a per-frame compositing pass. `card-2` was trimmed from 38.9s to a
  10s loop.
- **Codec**: MP4/H.264 only. VP9 encoded *larger* than H.264 on this footage and H.264 has hardware
  decode everywhere, which matters more for battery than a marginal size win.
- **`grass.glb`** was 12.96 MB, of which ~10 MB was 71 morph targets driving a baked wind animation
  the scene never instantiated an `AnimationMixer` for. Stripping the dead morph data and applying
  Draco brought it to 160 KB.
- **three.js is dynamically imported** and only on capable devices, so phones never download it.
- Dropped `@react-three/drei`, `@react-three/fiber`, `postprocessing` and `husky-init` — all unused
  or pulled in for a single hook.

## Adaptive rendering

`useDeviceTier` probes WebGL support, pointer type, core count, `deviceMemory`, `saveData`,
connection type and `prefers-reduced-motion`. Low-tier devices render no WebGL at all and receive
the 720p backdrop; reduced-motion users get a static poster and no smooth-scroll hijacking.

## Correctness fixes

- `ScrollTrigger` was referenced but never imported in the hero — the Explore button threw.
- Every `<video>` had both `src` and `<source>` children; the children are ignored when `src` is
  set, so the MP4 fallback never applied and Safari was served a VP9 file.
- `initSmoothScroll` and the render loop had no cleanup — under StrictMode that meant two Lenis
  instances and two `requestAnimationFrame` loops competing.
- `ScrollTrigger.scrollerProxy(document.body)` was dead code; the default scroller is `window`.
- No GPU resources were disposed. Geometries, materials, textures, render targets and the WebGL
  context are now released symmetrically.
- Section tracking called `getBoundingClientRect()` on every section per scroll event; replaced with
  `IntersectionObserver`.
- `cn()` declared `tailwind-merge` but never used it, so conflicting utilities never deduped.

## Accessibility

Skip link, `aria-current` on section nav, focus-visible rings, `dvh` units, `prefers-reduced-motion`
honoured across CSS, GSAP, Lenis and video playback, and text kept selectable outside chrome.
