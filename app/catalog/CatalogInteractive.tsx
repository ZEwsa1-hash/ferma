"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CSSProperties,
  FormEvent,
  MouseEvent,
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CartDrawer } from "../CartDrawer";
import { MobileMenu } from "../MobileMenu";
import { addCartItem, CartProduct, useCartCount } from "../cartStore";
import { CatalogFavoriteButton } from "./CatalogFavoriteButton";
import { CatalogCategory, productSlug } from "./data";

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
  initialCategory: CatalogCategory;
  categories: CategoryItem[];
  navItems: NavItem[];
  productsByCategory: Record<CatalogCategory, CatalogProduct[]>;
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
  initialCategory,
  categories,
  navItems,
  productsByCategory,
}: CatalogInteractiveProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const products = productsByCategory[activeCategory];
  const cartCount = useCartCount();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [flyItems, setFlyItems] = useState<FlyItem[]>([]);
  const [searchState, setSearchState] = useState({
    category: initialCategory,
    query: "",
  });
  const categoriesRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const desktopCartRef = useRef<HTMLButtonElement>(null);
  const mobileCartRef = useRef<HTMLButtonElement>(null);
  const flyIdRef = useRef(0);
  const searchQuery =
    searchState.category === activeCategory ? searchState.query : "";
  const normalizedSearchQuery = normalizeSearchText(searchQuery);

  useEffect(() => {
    const syncCategory = () => {
      const category = new URLSearchParams(window.location.search).get("category");
      setActiveCategory(category && category in productsByCategory
        ? category as CatalogCategory
        : "cheeses");
    };
    window.addEventListener("popstate", syncCategory);
    return () => window.removeEventListener("popstate", syncCategory);
  }, [productsByCategory]);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const active = categoriesRef.current?.querySelector<HTMLElement>(".isActive");
      if (active) setIndicator({ left: active.offsetLeft, width: active.offsetWidth });
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeCategory]);

  const selectCategory = (category: CatalogCategory) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
    setSearchState({ category, query: "" });
    window.history.pushState(null, "", category === "cheeses"
      ? "/catalog"
      : `/catalog?category=${category}`);
  };

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
          <MobileMenu items={navItems} />
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

        <nav className="catalogCategories" aria-label="Catalog categories" ref={categoriesRef}>
          {categories.map((category) => (
            <button
              aria-current={
                category.value === activeCategory ? "page" : undefined
              }
              className={
                category.value === activeCategory ? "isActive" : undefined
              }
              onClick={() => selectCategory(category.value as CatalogCategory)}
              key={category.value}
              type="button"
            >
              {category.label}
            </button>
          ))}
          <span className="catalogCategoryIndicator" aria-hidden="true" style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }} />
        </nav>

        <div className="catalogGrid" id={activeCategory}>
          {filteredProducts.map((product) => (
            <article className="catalogProductCard" key={product.name}>
              <Link
                className="catalogProductCardLink"
                href={`/product/${productSlug(product.name)}`}
                aria-label={`Open ${product.name}`}
              />
              <div className="catalogProductPhoto">
                <Image
                  alt={product.name}
                  className={product.imageClassName}
                  fill
                  sizes="(max-width: 760px) 305px, (max-width: 1180px) 280px, 305px"
                  src={product.image}
                />
                {!(["honey", "vegetables", "eggs"] as CatalogCategory[]).includes(activeCategory) && (
                  <CatalogFavoriteButton productName={product.name} />
                )}
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
          quality={95}
          src="/assets/shared/footer-farm-sunrise.png"
        />
        <Image
          alt=""
          aria-hidden="true"
          className="footerImage footerImageMobile"
          fill
          sizes="(max-width: 760px) 100vw, 1px"
          quality={95}
          src="/assets/shared/footer-farm-sunrise-mobile.png"
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
