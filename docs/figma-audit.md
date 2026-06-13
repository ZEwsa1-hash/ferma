# Figma Dev Mode Audit

Pixel-perfect implementation is blocked until Figma Dev Mode data is available.

## Current Local Inputs

- Source assets were found in `assest`.
- Runtime assets were copied to `public/assets` with ASCII names.
- One video asset is available and used as the first-screen hero video.
- The cow pasture image is used as the current hero poster/fallback.

## Missing Dev Mode Data

- UI kit and component variants.
- Color styles or design tokens.
- Typography styles, including exact font families, weights, sizes, line heights, and letter spacing.
- Desktop, tablet, and mobile frame dimensions.
- Layout grid, container widths, and exact spacing.
- Section order, final copy, and all block dimensions.
- Hero video sizing, object position, overlays, decorative layers, and mobile behavior.
- Hover, active, and focus states.
- Figma-approved poster/fallback asset.

## Asset Mapping

| Local source | Runtime path | Current usage |
| --- | --- | --- |
| `assest/kling_20260602_作品____________5217_0.mp4` | `public/assets/hero-video.mp4` | Hero video |
| `assest/ChatGPT Image 9 июн. 2026 г., 14_11_24 1.png` | `public/assets/hero-poster-cows.png` | Hero poster/fallback |
| `assest/ChatGPT Image 9 июн. 2026 г., 22_12_19 1.png` | `public/assets/farm-sunrise-wide.png` | Wide image band |
| `assest/ChatGPT Image 9 июн. 2026 г., 19_33_28 1.png` | `public/assets/field-illustration.png` | Farm illustration |
| `assest/f9b3fe7c30174ea2c56b24f97ddcdb520dc7ff11.png` | `public/assets/cheese-illustration.png` | Product illustration |
| `assest/transparent-Photoroom - 2026-06-09T195446.891 1.png` | `public/assets/milk-bottle-illustration.png` | Product illustration |
| `assest/transparent-Photoroom - 2026-06-09T195830.687 1.png` | `public/assets/meat-illustration.png` | Product illustration |
| `assest/transparent-Photoroom - 2026-06-09T200025.154 1.png` | `public/assets/carrot-illustration.png` | Product illustration |
| `assest/transparent-Photoroom - 2026-06-09T202109.402 1.png` | `public/assets/small-ornament.png` | Unused |

## Resolution Required

Open the Figma file in Dev Mode, export or provide the values above, and replace the provisional CSS tokens/layout values in `app/globals.css` with exact design values.
