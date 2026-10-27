"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CartDrawer } from "../CartDrawer";
import { MobileMenu } from "../MobileMenu";
import { addCartItem, CartProduct, useCartCount } from "../cartStore";
import { CatalogFavoriteButton } from "../catalog/CatalogFavoriteButton";
import { productSlug } from "../catalog/data";

type NavItem = {
  label: string;
  href: string;
};

type ProductImage = {
  alt: string;
  src: string;
};

export type ProductPageProduct = {
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  images: ProductImage[];
  details: string[];
  category?: string;
};

type RelatedProduct = {
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  imageClassName?: string;
};

type ProductPageInteractiveProps = {
  navItems: NavItem[];
  product: ProductPageProduct;
  relatedProducts: RelatedProduct[];
};

export function ProductPageInteractive({
  navItems,
  product,
  relatedProducts,
}: ProductPageInteractiveProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useCartCount();
  const [payStatus, setPayStatus] = useState<"idle" | "added">("idle");
  const payStatusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedImage = product.images[activeImage] ?? product.images[0];
  const addToCart = (item: CartProduct, count = 1) => {
    addCartItem(item, count);
  };

  const handlePayClick = () => {
    addToCart(
      {
        image: selectedImage.src,
        name: product.name,
        price: product.price,
      },
      quantity,
    );
    setPayStatus("added");

    if (payStatusTimer.current) {
      clearTimeout(payStatusTimer.current);
    }

    payStatusTimer.current = setTimeout(() => setPayStatus("idle"), 900);
  };

  useEffect(() => {
    return () => {
      if (payStatusTimer.current) {
        clearTimeout(payStatusTimer.current);
      }
    };
  }, []);

  return (
    <main className="productPage">
      <header className="productHeader">
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
          <button
            className={`catalogIconButton catalogCartButton ${
              cartCount > 0 ? "hasItems" : ""
            }`}
            type="button"
            aria-label={`Cart, ${cartCount} items`}
            onClick={() => setIsCartOpen(true)}
          >
            <span className="bagIcon" aria-hidden="true" />
            <span className="catalogCartCount" aria-hidden="true">
              {cartCount}
            </span>
          </button>
        </div>

        <div className="catalogMobileTools" aria-label="Mobile header tools">
          <button
            className={`catalogIconButton catalogCartButton ${
              cartCount > 0 ? "hasItems" : ""
            }`}
            type="button"
            aria-label={`Cart, ${cartCount} items`}
            onClick={() => setIsCartOpen(true)}
          >
            <span className="bagIcon" aria-hidden="true" />
            <span className="catalogCartCount" aria-hidden="true">
              {cartCount}
            </span>
          </button>
          <MobileMenu items={navItems} />
        </div>
      </header>

      <section className="productShell" aria-labelledby="product-title">
        <Link className="productBack" href={`/catalog?category=${product.category ?? "dairy"}`} aria-label="Back to catalog">
          <span aria-hidden="true" />
        </Link>

        <div className={`productGallery ${product.images.length === 1 ? "isSingleImage" : ""}`}>
          <div className="productThumbs" aria-label="Product images">
            {product.images.map((image, index) => (
              <button
                aria-label={`Show image ${index + 1}`}
                aria-pressed={index === activeImage}
                className={index === activeImage ? "isActive" : undefined}
                key={image.src}
                onClick={() => setActiveImage(index)}
                type="button"
              >
                <Image alt="" fill sizes="107px" src={image.src} />
              </button>
            ))}
          </div>

          <figure className="productMainImage">
            <Image
              alt={selectedImage.alt}
              fill
              priority
              sizes="(max-width: 760px) calc(100vw - 40px), 458px"
              src={selectedImage.src}
            />
            {product.images.length > 1 && <button
              className="productImageArrow productImageArrowPrev"
              type="button"
              aria-label="Previous image"
              onClick={() =>
                setActiveImage((current) =>
                  current === 0 ? product.images.length - 1 : current - 1,
                )
              }
            />}
            {product.images.length > 1 && <button
              className="productImageArrow productImageArrowNext"
              type="button"
              aria-label="Next image"
              onClick={() =>
                setActiveImage((current) =>
                  current === product.images.length - 1 ? 0 : current + 1,
                )
              }
            />}
          </figure>
        </div>

        <article className="productSummary">
          <div
            className="productRating"
            aria-label={`${product.rating} out of 5 stars, ${product.reviews} reviews`}
          >
            <span className="catalogRatingStars" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  alt=""
                  aria-hidden="true"
                  className={index >= product.rating ? "isMuted" : undefined}
                  height={8}
                  key={index}
                  src="/assets/shared/star.png"
                  width={12}
                />
              ))}
            </span>
            <small>[{product.reviews}]</small>
          </div>

          <h1 id="product-title">{product.name}</h1>
          <p>{product.description}</p>

          <div className="productPurchase">
            <strong>{product.price}</strong>
            <div className="productQuantity" aria-label="Quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                -
              </button>
              <output aria-live="polite">{quantity}</output>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((current) => current + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="productActions">
            <div className="productPayGroup">
              <button
                className="productPayButton"
                type="button"
                onClick={handlePayClick}
              >
                {payStatus === "added" ? "Added to cart" : "Pay"}
              </button>
            </div>
            <button
              className={`productFavorite ${isFavorite ? "isActive" : ""}`}
              type="button"
              aria-label={`${isFavorite ? "Remove" : "Add"} ${
                product.name
              } ${isFavorite ? "from" : "to"} wishlist`}
              aria-pressed={isFavorite}
              onClick={() => setIsFavorite((current) => !current)}
            >
              <span className="heartIcon" aria-hidden="true" />
            </button>
          </div>

          <dl className="productDetails">
            {product.details.map((detail) => {
              const [label, value] = detail.split(": ");

              return (
                <div key={detail}>
                  <dt>{label}:</dt>
                  <dd>{value}</dd>
                </div>
              );
            })}
          </dl>
        </article>
      </section>

      <section className="productRelatedSection" aria-labelledby="related-title">
        <div className="productRelatedTop">
          <h2 id="related-title">Related products</h2>
          <Link href={`/catalog?category=${product.category ?? "dairy"}`}>More...</Link>
        </div>

        <div className="productRelatedGrid">
          {relatedProducts.map((item) => (
            <article className="catalogProductCard" key={item.name}>
              <Link
                className="catalogProductCardLink"
                href={`/product/${productSlug(item.name)}`}
                aria-label={`Open ${item.name}`}
              />
              <div className="catalogProductPhoto">
                <Image
                  alt={item.name}
                  className={item.imageClassName}
                  fill
                  sizes="(max-width: 760px) calc(100vw - 40px), 305px"
                  src={item.image}
                />
                <CatalogFavoriteButton productName={item.name} />
              </div>

              <div className="catalogProductInfo">
                <div>
                  <div className="catalogProductTopline">
                    <h3>{item.name}</h3>
                    <div
                      className="catalogRating"
                      aria-label={`${item.rating} out of 5 stars, ${item.reviews} reviews`}
                    >
                      <span className="catalogRatingStars" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Image
                            alt=""
                            aria-hidden="true"
                            className={index >= item.rating ? "isMuted" : undefined}
                            height={8}
                            key={index}
                            src="/assets/shared/star.png"
                            width={12}
                          />
                        ))}
                      </span>
                      <small>[{item.reviews}]</small>
                    </div>
                  </div>
                  <p>{item.description}</p>
                </div>
              <strong>{item.price}</strong>
                <button
                  className="productRelatedAddButton"
                  type="button"
                  onClick={() =>
                    addToCart({
                      image: item.image,
                      name: item.name,
                      price: item.price,
                    })
                  }
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
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
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}
