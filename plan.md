# Plan: Figma-Exact Next.js Rebuild

> Status update (2026-10-26): The original rebuild phases below are historical planning notes. The current implementation and revised priorities are documented in **Current Project Review And Next Steps** at the end of this file. The site is an informational product showcase; purchasing is out of scope.

## Goal
Rebuild the current Next.js page from the supplied Figma exports in `assest`, without invented copy or visual guesses.

All visible website text must come from the English Figma mockup. Russian may be used only in this planning/documentation file and communication.

## Current State
- Project is already a Next.js App Router app.
- Current `app/page.tsx` contains broken Russian/mojibake placeholder text and approximate layout.
- Current `app/globals.css` is not based on measured Figma exports.
- `assest` now contains full-page and section screenshots from the mockup.
- Pixel-perfect implementation is possible only by using the supplied screenshots/exports plus direct Figma Dev Mode values when available.

## Source Assets In `assest`

### Full Screens
- `Главная.png` — desktop full homepage export, 1440 x 4943.
- `Мобилка (1).png` — mobile full homepage export, 390 x 6007.

### Desktop Section Exports
- `Ферма.png` — desktop hero/farm section, 1440 x 958.
- `IMG_0898 1.png` — likely hero/poster source, 1440 x 958.
- `Продукты.png` — desktop products section, 1440 x 860.
- `о нас.png` — desktop about section, 1440 x 873.
- `галерея.png` — desktop gallery section, 1440 x 1167.
- `отзывы.png` — desktop reviews section, 1440 x 777.
- `футер.png` — desktop footer section, 1440 x 308.
- `каталог молоко.png` — desktop milk catalog page/section, 1440 x 1221.
- `каталог мясо.png` — desktop meat catalog page/section, 1440 x 1221.
- `каталог сыр.png` — desktop cheese catalog page/section, 1440 x 1920.

### Mobile Section Exports
- `главная (1).png` — mobile hero/home section, 390 x 844.
- `продукция.png` — mobile products section, 390 x 844.
- `о нас (1).png` — mobile about section, 390 x 1744.
- `галерея (1).png` — mobile gallery section, 390 x 1239.
- `отзывы (1).png` — mobile reviews section, 390 x 778.
- `футер (1).png` — mobile footer section, 390 x 558.

### Likely Layer Assets
- `kling_20260602_作品____________5217_0.mp4` — hero video candidate.
- `Star 23.png` — decorative star, 29 x 28.
- `0436b538ea41d3b161d723e08b996624 1.png` — image asset, 305 x 379.
- `0b14b867a3d8dde71230f7388efeb907 1.png` — image asset, 402 x 507.
- `12c0afd01752f92e4b4dfe357bbc3f55 1.png` — image asset, 338 x 427.
- `185105d59be086a84d66cee3b9a7c193 1.png` — image asset, 305 x 379.
- `2e71b6c0b78634b2b622c9ca0ce309d6 1.png` — image asset, 305 x 379.
- `5d74a8b568fd8ee8f6c20ba333f05157 1.png` — image asset, 463 x 584.
- `5d74a8b568fd8ee8f6c20ba333f05157 1 (1).png` — duplicate or mobile copy, 463 x 584.
- `6a390c1899bbe59f0ffb9dab41ce12bb 1.png` — image asset, 305 x 379.
- `844e7991c6a0de0fb480cae29c9be0c6 1.png` — image asset, 304 x 379.
- `a7d1087bc8d62a0c910c04dbe07b4e3c 1.png` — image asset, 305 x 379.
- `b430ee5f7e5616e97b1402219986fcaf 1.png` — image asset, 304 x 379.
- `b93700ce1dcada4fba94cf01142fd24f 1.png` — image asset, 305 x 379.
- `c3a130caa60d3f5f5179d9e4b1eae9cc 1.png` — image asset, 305 x 379.
- `ce73bf3c755bda0431a69891f8900bc7 1.png` — image asset, 305 x 379.
- `cee9ab3afb590c60d2ec2b9da1da83ef 1.png` — image asset, 402 x 507.
- `d61d0baea26059f718b33cf20b6e3ccd 1.png` — image asset, 338 x 427.

### Older Generated Assets
These must not be used unless they are visibly present in the Figma mockup:
- `ChatGPT Image 9 июн. 2026 г., 14_11_24 1.png`
- `ChatGPT Image 9 июн. 2026 г., 19_33_28 1.png`
- `ChatGPT Image 9 июн. 2026 г., 22_12_19 1.png`
- `f9b3fe7c30174ea2c56b24f97ddcdb520dc7ff11.png`
- `transparent-Photoroom - 2026-06-09T195446.891 1.png`
- `transparent-Photoroom - 2026-06-09T195830.687 1.png`
- `transparent-Photoroom - 2026-06-09T200025.154 1.png`
- `transparent-Photoroom - 2026-06-09T202109.402 1.png`

## Agent Split
Each phase/block should be handled by a separate agent or by the main agent locally if it is on the critical path.

### Agent 1: Asset Mapper
Tasks:
- Compare `assest` filenames, dimensions, and visual content against section screenshots.
- Identify which hash-named files belong to products, gallery, reviews, decor, and catalog cards.
- Produce a mapping table from original filenames to final ASCII filenames in `public/assets`.
- Flag missing assets.

Deliverable:
- Asset map with source filename, final filename, section usage, dimensions, and notes.

### Agent 2: Design Token Extractor
Tasks:
- Extract colors, typography, spacing, border radii, shadows, and section heights from screenshots and Figma Dev Mode if available.
- Create CSS token proposal.
- Identify fonts used in the mockup and whether local font files are available.

Deliverable:
- Token list for `app/globals.css`.

### Agent 3: Hero Builder
Tasks:
- Rebuild the first screen from `Ферма.png`, `главная (1).png`, `IMG_0898 1.png`, and the hero video.
- Use `<video autoplay muted loop playsInline>`.
- Use screenshot-approved poster/fallback only.
- Match desktop and mobile nav, text, video position, overlay, decorative elements, and hero height.

Write scope:
- `app/page.tsx`
- `app/globals.css`
- `public/assets/*` only for hero assets

### Agent 4: Products And Catalog Builder
Tasks:
- Rebuild products block from `Продукты.png` and `продукция.png`.
- Rebuild catalog sections/pages if they are part of the requested homepage flow:
  - `каталог молоко.png`
  - `каталог мясо.png`
  - `каталог сыр.png`
- Use only Figma texts and matched product images.

Write scope:
- `app/page.tsx`
- `app/globals.css`
- `public/assets/*` only for product/catalog assets

### Agent 5: About And Gallery Builder
Tasks:
- Rebuild about section from `о нас.png` and `о нас (1).png`.
- Rebuild gallery from `галерея.png` and `галерея (1).png`.
- Match image layout, spacing, typography, and mobile stacking.

Write scope:
- `app/page.tsx`
- `app/globals.css`
- `public/assets/*` only for about/gallery assets

### Agent 6: Reviews And Footer Builder
Tasks:
- Rebuild reviews from `отзывы.png` and `отзывы (1).png`.
- Rebuild footer from `футер.png` and `футер (1).png`.
- Ensure links use `rel="noopener noreferrer"` for external targets.

Write scope:
- `app/page.tsx`
- `app/globals.css`
- `public/assets/*` only for reviews/footer assets

### Agent 7: QA Agent
Tasks:
- Run build, lint, and typecheck.
- Start local Next.js server.
- Run browser smoke checks for desktop and mobile.
- Verify hero video exists and no assets return 404.
- Check no horizontal scroll and no console errors.
- Compare screenshots against Figma exports visually and list mismatches.

Deliverable:
- QA report with exact remaining differences.

## Implementation Phases

### Phase 1: Source Audit
Tasks:
- Inventory every file in `assest`.
- Separate full-page screenshots, section screenshots, real layer assets, video, and old generated assets.
- Identify exact English copy from the Figma screenshots.
- Decide which exported section screenshots are references only and which files are runtime assets.

Acceptance:
- No asset is used before it is mapped to a section.
- Missing assets are listed explicitly.

### Phase 2: Asset Preparation
Tasks:
- Copy matched runtime assets to `public/assets`.
- Rename runtime assets to stable ASCII names.
- Keep reference screenshots out of runtime imports unless intentionally used for comparison.
- Do not delete original `assest` files.

Acceptance:
- Runtime asset names are predictable.
- No broken image/video paths.
- Old generated assets are not used unless present in the mockup.

### Phase 3: Design System
Tasks:
- Replace approximate CSS variables with measured Figma tokens.
- Define desktop and mobile layout constants.
- Set exact font family, weight, size, line-height, and spacing from mockup.

Acceptance:
- CSS tokens reflect the mockup, not the previous placeholder design.
- Letter spacing remains `0` unless Figma says otherwise.

### Phase 4: Hero
Tasks:
- Implement desktop hero from `Ферма.png`.
- Implement mobile hero from `главная (1).png`.
- Use hero video with correct poster/fallback.
- Match nav, logo, title, CTA, overlay, and decorative layers.

Acceptance:
- First viewport visually matches reference screenshots.
- Hero video loads and loops.
- Mobile hero has no overlap or horizontal scroll.

### Phase 5: Homepage Sections
Tasks:
- Implement products, about, gallery, reviews, and footer in screenshot order.
- Use only English text visible in the mockup.
- Match image sizes, section heights, grid behavior, and mobile stacking.

Acceptance:
- Desktop full page matches `Главная.png`.
- Mobile full page matches `Мобилка (1).png`.

### Phase 6: Catalog Sections
Tasks:
- Determine whether catalog exports are separate pages or homepage states.
- If pages: create routes for milk, meat, and cheese.
- If homepage blocks: integrate them in the exact Figma order.
- Use only matched product assets and mockup text.

Acceptance:
- Catalog screenshots match their corresponding implemented views.

### Phase 7: Verification
Tasks:
- Run `npm run lint`.
- Run `npm run typecheck`.
- Run `npm run build`.
- Start local server.
- Check desktop 1440px and mobile 390px screenshots.
- Check no 404 responses for assets.
- Check no console errors.
- Check no horizontal scroll.

Acceptance:
- All checks pass or every failure is documented with a concrete reason.
- Remaining visual differences are listed and assigned to the relevant phase/agent.

## Blockers
- Direct Figma Dev Mode values are not available in this environment unless access is provided or values are exported.
- Exact text extraction from images may need manual confirmation if OCR is unclear.
- Exact paid/custom fonts require font files or an approved fallback.
- If the hero video in Figma is not `kling_20260602_作品____________5217_0.mp4`, the correct video must be supplied.

## Immediate Next Tasks
1. Build the asset mapping table.
2. Extract English copy from `Главная.png`, `Ферма.png`, and `Мобилка (1).png`.
3. Replace current placeholder `app/page.tsx` content with mockup-derived structure.
4. Replace current approximate CSS with measured desktop/mobile styles.
5. Run verification and compare against the supplied screenshots.

## Current Project Review And Next Steps (2026-10-26)

### Confirmed Scope

- Velora Farm is a promotional website and product catalog, without online purchasing or order placement.
- Product cards and detail pages may show descriptions, photos, and prices if they belong to the approved design. They must not imply that payment or checkout is available.
- A backend for orders, payment integration, and persistent shopping cart are not required.

### Current Implementation

- Next.js 16 App Router, React 19, and TypeScript.
- Routes: homepage (`/`), category catalog (`/catalog`), and one product detail page (`/product`, currently Fresh Milk).
- Products, prices, ratings, and reviews are hard-coded. The catalog has category switching and client-side name search.
- The homepage has responsive sections and a video hero. The current cart uses browser `localStorage`.
- No automated tests were found. Most styling is in one `app/globals.css` file (about 2,470 lines).

### Findings And Priorities

1. **Restore reliable verification.** `npm run typecheck` and `npm run build` currently fail on malformed generated `.next/dev/types/routes.d.ts` (duplicate lines after the closing declaration), after the application compiles. Regenerate the Next.js output, then rerun both checks. If the error returns, investigate the generator or concurrent development process before changing application types. A targeted `npx eslint app next.config.ts` check passed; the full `npm run lint` run was interrupted after it produced no result for an extended period.
2. **Align the interface with the no-purchase scope.** Remove the cart drawer and count, `Add to cart`, `Pay`, `Checkout`, and quantity controls from the public flow. Replace purchase calls to action with navigation or product information where appropriate. Remove `cartStore.ts` once it has no callers. Do not add checkout, order, or payment infrastructure.
3. **Resolve controls that currently have no action.** The language selector, header wishlist button, and mobile menu appear interactive but have no behavior. Either implement a useful behavior within the informational-site scope or present them as non-interactive design elements. Product favorite state currently disappears on reload; decide whether favorites are actually part of the site before keeping these buttons.
4. **Clarify product navigation.** Only Fresh Milk has a detail page. Decide which other products need their own pages; otherwise avoid cards that suggest a missing destination.
5. **Finish quality checks.** Verify all routes and assets in a browser at desktop and mobile widths, keyboard navigation, visible focus states, and horizontal overflow. Add focused tests only for behavior that remains after the scope cleanup. Continue comparing the layout with the supplied Figma exports; exact Dev Mode values are still unavailable.

### Completion Criteria

- Production build, typecheck, and lint pass.
- Every visible button and link has a clear, working purpose.
- No purchase or checkout flow appears anywhere on the site.
- Homepage, catalog categories, and available product details work on desktop and mobile without broken assets or horizontal scrolling.
