"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CSSProperties,
  FormEvent,
  MouseEvent,
  RefObject,
  useMemo,
  useRef,
  useState,
} from "react";
import { CartDrawer } from "../CartDrawer";
import { addCartItem, CartProduct, useCartCount } from "../cartStore";
import { CatalogFavoriteButton } from "./CatalogFavoriteButton";

type NavItem = {
  label: string;
  href: string;
};

type CategoryItem = {
  label: string;
  value: string;
};

export type CatalogProduct = {
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  imageClassName?: string;
  href?: string;
};

type FlyItem = {
  id: number;
  startX: number;
  startY: number;
  deltaX: number;
  deltaY: number;
};

type CatalogInteractiveProps = {
  activeCategory: string;
  categories: CategoryItem[];
  navItems: NavItem[];
  products: CatalogProduct[];
};

type FlyStyle = CSSProperties & {
  "--cart-fly-x": string;
  "--cart-fly-y": string;
};

const normalizeSearchText = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0451/g, "\u0435")
    .replace(/[^a-z\u0430-\u044f0-9]+/g, "");

const includesLettersInOrder = (value: string, query: string) => {
  let queryIndex = 0;

  for (const letter of value) {
    if (letter === query[queryIndex]) {
      queryIndex += 1;
    }

    if (queryIndex === query.length) {
      return true;
    }
  }

  return false;
};

export function CatalogInteractive({
  activeCategory,
  categories,
  navItems,
  products,
}: CatalogInteractiveProps) {
  const cartCount = useCartCount();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyItems, setFlyItems] = useState<FlyItem[]>([]);
  const [searchState, setSearchState] = useState({
    category: activeCategory,
    query: "",
  });
  const desktopCartRef = useRef<HTMLButtonElement>(null);
  const mobileCartRef = useRef<HTMLButtonElement>(null);
  const flyIdRef = useRef(0);
  const searchQuery =
    searchState.category === activeCategory ? searchState.query : "";
  const normalizedSearchQuery = normalizeSearchText(searchQuery);

  const filteredProducts = useMemo(() => {
    if (!normalizedSearchQuery) {
      return products;
    }

    return products.filter((product) => {
      const normalizedName = normalizeSearchText(product.name);

      return (
        normalizedName.includes(normalizedSearchQuery) ||
        includesLettersInOrder(normalizedName, normalizedSearchQuery)
      );
    });
  }, [normalizedSearchQuery, products]);

  const addToCart = (
    event: MouseEvent<HTMLButtonElement>,
    product: CartProduct,
  ) => {
    const startRect = event.currentTarget.getBoundingClientRect();
    const visibleCart =
      [desktopCartRef, mobileCartRef]
        .map((ref) => ref.current)
        .find((button) => {
          if (!button) {
            return false;
          }

          const rect = button.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        }) ?? desktopCartRef.current;
    const targetRect = visibleCart?.getBoundingClientRect();

    addCartItem(product);

    if (!targetRect) {
      return;
    }

    const id = flyIdRef.current + 1;
    flyIdRef.current = id;

    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top - 18;
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    setFlyItems((items) => [
      ...items,
      {
        id,
        startX,
        startY,
        deltaX: endX - startX,
        deltaY: endY - startY,
      },
    ]);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const renderCartButton = (
    className: string,
    ref: RefObject<HTMLButtonElement | null>,
  ) => (
    <button
      className={`${className} ${cartCount > 0 ? "hasItems" : ""}`}
      type="button"
      aria-label={`Cart, ${cartCount} items`}
      ref={ref}
      onClick={() => setIsCartOpen(true)}
    >
      <span className="bagIcon" aria-hidden="true" />
      <span className="catalogCartCount" aria-hidden="true">
        {cartCount}
      </span>
    </button>
  );

  return (
    <main className="catalogPage">
      <header className="catalogHeader">
        <Link className="catalogBrand" href="/" aria-label="Velora Farm home">
          <span>Velora</span>
          <span>Farm</span>
        </Link>

        <nav className="catalogNav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="catalogTools" aria-label="Header tools">
          <button type="button" aria-label="Switch language to English">
            EN
            <span aria-hidden="true" />
          </button>
          <button className="catalogIconButton" type="button" aria-label="Wishlist">
            <span className="heartIcon" aria-hidden="true" />
          </button>
          {renderCartButton("catalogIconButton catalogCartButton", desktopCartRef)}
        </div>

        <div className="catalogMobileTools" aria-label="Mobile header tools">
          {renderCartButton("catalogIconButton catalogCartButton", mobileCartRef)}
          <span className="catalogMobileBurger" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
      </header>

      <section
        className={`catalogHero ${
          activeCategory !== "cheeses" ? "catalogHeroCompact" : ""
        }`}
        aria-labelledby="catalog-title"
      >
        <div className="catalogTitleRow">
          <h1 id="catalog-title">Catalog</h1>

          <form className="catalogSearch" role="search" onSubmit={handleSearchSubmit}>
            <label className="srOnly" htmlFor="catalog-search">
              Search farm products
            </label>
            <input
              id="catalog-search"
              name="search"
              placeholder="Search farm products..."
              value={searchQuery}
              onChange={(event) =>
                setSearchState({
                  category: activeCategory,
                  query: event.target.value,
                })
              }
              type="search"
            />
            <button type="submit" aria-label="Search">
              <span aria-hidden="true" />
            </button>
          </form>
        </div>

        <nav className="catalogCategories" aria-label="Catalog categories">
          {categories.map((category) => (
            <Link
              aria-current={
                category.value === activeCategory ? "page" : undefined
              }
              className={
                category.value === activeCategory ? "isActive" : undefined
              }
              href={
                category.value === "cheeses"
                  ? "/catalog"
                  : `/catalog?category=${category.value}`
              }
              key={category.value}
            >
              {category.label}
            </Link>
          ))}
        </nav>

        <div className="catalogGrid" id={activeCategory}>
          {filteredProducts.map((product) => (
            <article className="catalogProductCard" key={product.name}>
              <div className="catalogProductPhoto">
                {product.href ? (
                  <Link
                    className="catalogProductPhotoLink"
                    href={product.href}
                    aria-label={`Open ${product.name}`}
                  />
                ) : null}
                <Image
                  alt={product.name}
                  className={product.imageClassName}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1180px) 30vw, 305px"
                  src={product.image}
                />
                <CatalogFavoriteButton productName={product.name} />
              </div>

              <div className="catalogProductInfo">
                <div>
                  <div className="catalogProductTopline">
                    <h2>{product.name}</h2>
                    <div
                      className="catalogRating"
                      aria-label={`${product.rating} out of 5 stars, ${product.reviews} reviews`}
                    >
                      <span className="catalogRatingStars" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Image
                            alt=""
                            aria-hidden="true"
                            className={
                              index >= product.rating ? "isMuted" : undefined
                            }
                            height={8}
                            key={index}
                            src="/assets/shared/star.png"
                            width={12}
                          />
                        ))}
                      </span>
                      <small>[{product.reviews}]</small>
                    </div>
                  </div>
                  <p>{product.description}</p>
                </div>
                <strong>{product.price}</strong>
                <button
                  type="button"
                  onClick={(event) =>
                    addToCart(event, {
                      image: product.image,
                      name: product.name,
                      price: product.price,
                    })
                  }
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="catalogEmptySearch" role="status">
            No products found by this name.
          </p>
        ) : null}
      </section>

      <footer className="catalogFooter" id="contact">
        <Image
          alt=""
          aria-hidden="true"
          className="footerImage"
          fill
          sizes="100vw"
          src="/assets/shared/footer-farm-sunrise.png"
        />
        <div className="footerTint" aria-hidden="true" />
        <div className="footerContent">
          <div className="footerIntro">
            <Link className="footerBrand" href="/" aria-label="Velora Farm home">
              <span>Velora</span>
              <span>Farm</span>
            </Link>
            <p>
              Growing fresh, natural products with care, sustainability, and
              respect for nature. From our farm to your table
            </p>
          </div>

          <address className="footerContact">
            <span>123 Farm Road, Green Valley</span>
            <a href="tel:+1234567890">+1 (234) 567-890</a>
            <a href="mailto:hello@greenvalleyfarm.com">
              hello@greenvalleyfarm.com
            </a>
          </address>

          <nav className="footerLinks" aria-label="Footer navigation">
            <Link href="/#about">About</Link>
            <Link href="/#products">Products</Link>
            <Link href="/#farm-life">Farm Life</Link>
          </nav>

          <nav className="footerSocial" aria-label="Social links">
            <a href="#contact">Instagram</a>
            <a href="#contact">Facebook</a>
            <a href="#contact">YouTube</a>
            <a href="#contact">TikTok</a>
          </nav>
        </div>
        <p className="footerLegal">&copy; 2026 Velora Farm. All rights reserved</p>
      </footer>

      <div className="catalogFlyLayer" aria-hidden="true">
        {flyItems.map((item) => (
          <span
            className="catalogCartFlyer"
            key={item.id}
            onAnimationEnd={() =>
              setFlyItems((items) =>
                items.filter((current) => current.id !== item.id),
              )
            }
            style={
              {
                left: item.startX,
                top: item.startY,
                "--cart-fly-x": `${item.deltaX}px`,
                "--cart-fly-y": `${item.deltaY}px`,
              } as FlyStyle
            }
          />
        ))}
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}
