# Styleguide

Single source of truth for visual design. **Change tokens in code, not scattered across components.**

## Where to edit

| Concern | File |
|--------|------|
| Colors, spacing, radii, fonts (CSS) | [`tokens.css`](./tokens.css) |
| Three.js colors, scene size, zoom limits (JS) | [`tokens.ts`](./tokens.ts) |
| Tailwind ↔ CSS variable wiring | [`app/globals.css`](../../app/globals.css) (`@theme inline` only) |
| Geist font loading | [`app/layout.tsx`](../../app/layout.tsx) |

Keep `tokens.css` and `tokens.ts` in sync for scene colors and numeric sizes.

## Typography

- **Default UI font:** Geist Sans (`next/font/google`, applied on `<body>`).
- **Monospace:** Geist Mono for numeric readouts (e.g. zoom value).
- CSS: `--font-family-sans`, `--font-family-mono` in `tokens.css`.

## Perspective camera (depth cues)

Per [Three.js `PerspectiveCamera`](https://threejs.org/docs/#api/en/cameras/PerspectiveCamera):

- **`fov`** — vertical field of view; distant points on the plane appear smaller (natural depth).
- Orbit keeps a fixed radius (`CAMERA_DISTANCE`) around `SCENE_TARGET`; only rotation changes.
- UI zoom adjusts **`fov`** via `getPerspectiveFov` (same 35–100% slider + viewport height baseline as before).
- Yaw/roll must not refit projection — only position/`lookAt`/roll update.
- **Camera orbit only** (`applyCameraOrbit`, `SceneCameraRig`): sliders move the camera on a sphere around `SCENE_TARGET`. **`SceneWorld`** meshes are never rotated by these controls.
- Spherical position + quaternion `lookAt` + local roll. **X/Y/Z** = camera pitch / yaw / roll (not object coordinates).

| Constant | Value | Role |
|----------|-------|------|
| `REFERENCE_VIEWPORT_HEIGHT_PX` | 800 | UI zoom 100% baseline |
| `BASE_FOV` | 42° | Field of view at 100% zoom |
| `CAMERA_DISTANCE` | 10 | Orbit radius around scene center |

## Scene (Three.js)

| Token | CSS variable | JS (`tokens.ts`) | Usage |
|-------|----------------|------------------|--------|
| Canvas / page backdrop | `--color-scene-background` | `scene.background` | Clear color, plane surround |
| Ground plane fill | `--color-scene-plane` | `scene.plane` | Light gray plane |
| Ground plane edge | `--color-scene-plane-border` | `scene.planeBorder` | Dark gray border loop |
| Reference cube | `--color-scene-cube` | `scene.cube` | Red center cube |
| Plane world size | — | `PLANE_WORLD_SIZE` in `lib/scene/constants.ts` | Gray square in 3D units |
| WebGL canvas | — | `SceneStage` (`absolute inset-0`, `h-dvh`) | Renderer fills the entire viewport |

## Scene + screen UI layering

Two separate stacks:

| Layer | Components | Role |
|-------|------------|------|
| **WebGL (3D)** | `SceneCanvas`, `TopDownScene`, `SceneCameraRig`, `BorderedGroundPlane`, `CenterReferenceCube` | R3F canvas; camera looks at the scene in world space |
| **Screen HUD (DOM)** | `ScreenOverlayRoot`, `ScreenOverlayPanel`, `SceneScreenChrome`, `SceneControlsPanel` | Fixed to the **viewport**, drawn above the canvas; not part of Three.js |

Entry point: `SceneShell` → `SceneStage` (canvas) + `SceneScreenChrome` (overlay).

Add new HUD controls under `SceneScreenChrome` (or new panels inside `ScreenOverlayRoot`). Do not put DOM UI inside the Canvas unless you intentionally want `@react-three/drei` `Html` in world space.

## Camera zoom UI

| Token | CSS variable | JS | Usage |
|-------|----------------|-----|--------|
| Slider track width | `--zoom-control-slider-width` | `uiChrome.zoomControlSliderWidthPx` | Draggable zoom track (default 150px) |
| Panel corner radius | `--zoom-control-radius` | — | HUD panel corners (default `--radius-lg`) |
| Offset from edge | `--zoom-control-offset` | `uiChrome.zoomControlOffsetRem` | Bottom-left margin (default 1.25rem) |
| Stack order | `--zoom-control-z-index` | — | Above canvas |
| Zoom range | — | `zoom.min` … `zoom.max` | 35%–100%; default 50%; 100% = widest framing |

## Orbit (camera around scene center)

Target is fixed at world origin (`SCENE_TARGET` in `lib/scene/orbit.ts`), not the camera.

| Axis | Control | Range | Effect |
|------|---------|-------|--------|
| X | Pitch | 0–85° | Tilt from top-down toward the horizon |
| Y | Yaw | −180–180° | Orbit around vertical axis through scene center |
| Z | Roll | −90–90° | Rotate view around line of sight |

HUD: `SceneControlsPanel` (zoom + orbit + reset, bottom-left).

## shadcn / app shell

Semantic colors (`--background`, `--primary`, `--muted`, etc.), border radius (`--radius`), and chart/sidebar tokens live in **`tokens.css`**. Components under `components/ui/` consume these via Tailwind utilities (`bg-card`, `text-muted-foreground`, etc.).

Dark mode overrides are in the `.dark` block in the same file.

## Adding new tokens

1. Add the CSS custom property to `:root` in `tokens.css`.
2. If Three.js or runtime code needs it, add the same value to `tokens.ts`.
3. Expose to Tailwind in `app/globals.css` inside `@theme inline` if you need a utility class.
