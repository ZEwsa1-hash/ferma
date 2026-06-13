# Asset Map

This document maps the current `assest` files to their intended role.

## Reference Screenshots

These files are design references only. They should not be loaded by the website at runtime.

| Source | Size | Role |
|---|---:|---|
| `assest/Главная.png` | 1440 x 4943 | Desktop full homepage reference |
| `assest/Мобилка (1).png` | 390 x 6007 | Mobile full homepage reference |
| `assest/Ферма.png` | 1440 x 958 | Desktop hero reference |
| `assest/главная (1).png` | 390 x 844 | Mobile hero reference |
| `assest/Продукты.png` | 1440 x 860 | Desktop products reference |
| `assest/продукция.png` | 390 x 844 | Mobile products reference |
| `assest/о нас.png` | 1440 x 873 | Desktop about reference |
| `assest/о нас (1).png` | 390 x 1744 | Mobile about reference |
| `assest/галерея.png` | 1440 x 1167 | Desktop gallery reference |
| `assest/галерея (1).png` | 390 x 1239 | Mobile gallery reference |
| `assest/отзывы.png` | 1440 x 777 | Desktop reviews reference |
| `assest/отзывы (1).png` | 390 x 778 | Mobile reviews reference |
| `assest/футер.png` | 1440 x 308 | Desktop footer reference |
| `assest/футер (1).png` | 390 x 558 | Mobile footer reference |
| `assest/каталог молоко.png` | 1440 x 1221 | Catalog dairy reference |
| `assest/каталог мясо.png` | 1440 x 1221 | Catalog meat reference |
| `assest/каталог сыр.png` | 1440 x 1920 | Catalog cheese reference |

## Runtime Assets

### Hero

| Source | Runtime Path | Role |
|---|---|---|
| `assest/IMG_0898 1.png` | `/assets/hero/hero-poster.png` | Hero poster/fallback background |
| `assest/kling_20260602_作品____________5217_0.mp4` | `/assets/hero/hero-video.mp4` | Hero video |

### Products Carousel

| Source | Runtime Path | Mockup Label |
|---|---|---|
| `assest/f9b3fe7c30174ea2c56b24f97ddcdb520dc7ff11.png` | `/assets/products/artisan-cheeses.png` | `ARTISAN CHEESES` |
| `assest/transparent-Photoroom - 2026-06-09T195446.891 1.png` | `/assets/products/dairy-products.png` | `DAIRY PRODUCTS` |
| `assest/transparent-Photoroom - 2026-06-09T195830.687 1.png` | `/assets/products/premium-meat.png` | `PREMIUM MEAT` |
| `assest/transparent-Photoroom - 2026-06-09T200025.154 1.png` | `/assets/products/vegetables-greens.png` | `VEGETABLES & GREENS` |
| `assest/transparent-Photoroom - 2026-06-09T202109.402 1.png` | `/assets/products/natural-honey.png` | `NATURAL HONEY` |

### Catalog Products

| Source | Runtime Path | Product |
|---|---|---|
| `assest/0436b538ea41d3b161d723e08b996624 1.png` | `/assets/catalog/blue-cheese.png` | `BLUE CHEESE` |
| `assest/2e71b6c0b78634b2b622c9ca0ce309d6 1.png` | `/assets/catalog/greek-yogurt.png` | `GREEK YOGURT` |
| `assest/6a390c1899bbe59f0ffb9dab41ce12bb 1.png` | `/assets/catalog/goat-cheese.png` | `GOAT CHEESE` |
| `assest/844e7991c6a0de0fb480cae29c9be0c6 1.png` | `/assets/catalog/aged-gouda.png` | `AGED GOUDA` |
| `assest/a7d1087bc8d62a0c910c04dbe07b4e3c 1.png` | `/assets/catalog/farm-butter.png` | `FARM BUTTER` |
| `assest/b430ee5f7e5616e97b1402219986fcaf 1.png` | `/assets/catalog/mozzarella.png` | `MOZZARELLA` |
| `assest/b93700ce1dcada4fba94cf01142fd24f 1.png` | `/assets/catalog/grass-fed-beef.png` | `GRASS-FED BEEF` |
| `assest/c3a130caa60d3f5f5179d9e4b1eae9cc 1.png` | `/assets/catalog/heavy-cream.png` | `HEAVY CREAM` |
| `assest/ce73bf3c755bda0431a69891f8900bc7 1.png` | `/assets/catalog/range-chicken.png` | `RANGE CHICKEN` |
| `assest/185105d59be086a84d66cee3b9a7c193 1.png` | `/assets/catalog/farm-pork.png` | `FARM PORK` |

Known product image not found as a separate runtime asset:

| Product | Notes |
|---|---|
| `FRESH MILK` | Visible in `каталог молоко.png`, but no matching separate hash PNG found in `assest`. |
| `FARM CHEDDAR` | Visible in `каталог сыр.png`, but no matching separate hash PNG found in `assest`. |

### Gallery And Lifestyle

| Source | Runtime Path | Role |
|---|---|---|
| `assest/0b14b867a3d8dde71230f7388efeb907 1.png` | `/assets/gallery/farm-cow-care.png` | Farm life side slide |
| `assest/12c0afd01752f92e4b4dfe357bbc3f55 1.png` | `/assets/gallery/farm-chicken-portrait.png` | Farm life side slide |
| `assest/5d74a8b568fd8ee8f6c20ba333f05157 1.png` | `/assets/gallery/farm-life-sunrise.png` | Farm life center slide / footer-like image |
| `assest/cee9ab3afb590c60d2ec2b9da1da83ef 1.png` | `/assets/gallery/corn-field-worker.png` | Farm life side slide |
| `assest/d61d0baea26059f718b33cf20b6e3ccd 1.png` | `/assets/gallery/beekeeper.png` | Farm life side slide |

### Shared

| Source | Runtime Path | Role |
|---|---|---|
| `assest/ChatGPT Image 9 июн. 2026 г., 14_11_24 1.png` | `/assets/shared/about-cows.png` | About image with cows |
| `assest/ChatGPT Image 9 июн. 2026 г., 19_33_28 1.png` | `/assets/shared/field-line-illustration.png` | About line illustration |
| `assest/ChatGPT Image 9 июн. 2026 г., 22_12_19 1.png` | `/assets/shared/footer-farm-sunrise.png` | Footer background |
| `assest/Star 23.png` | `/assets/shared/star.png` | Decorative star / rating star if needed |

## Working QA File

| File | Purpose |
|---|---|
| `docs/asset-contact-sheet.png` | Contact sheet for visually matching hash-named PNG files. |

## Notes

- `public/assets` still contains older flat files from the first rough implementation. The new grouped assets should be preferred for the rebuild.
- Do not delete originals from `assest`; they are the current source of truth.
- Footer/copyright has a brand mismatch in the screenshots: footer text uses both `Velora Farm` and `Green Valley Farm`. This should be resolved before final implementation.
