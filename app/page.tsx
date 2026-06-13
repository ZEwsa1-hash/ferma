"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Farm Life", href: "#farm-life" },
  { label: "Experiences", href: "#experiences" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const products = [
  {
    label: "ARTISAN CHEESES",
    image: "/assets/products/artisan-cheeses.png",
    href: "/catalog",
  },
  {
    label: "DAIRY PRODUCTS",
    image: "/assets/products/dairy-products.png",
    href: "/catalog?category=dairy",
  },
  {
    label: "PREMIUM MEAT",
    image: "/assets/products/premium-meat.png",
    href: "/catalog?category=meat",
  },
  {
    label: "VEGETABLES & GREENS",
    image: "/assets/products/vegetables-greens.png",
    href: "/catalog?category=vegetables",
  },
  {
    label: "NATURAL HONEY",
    image: "/assets/products/natural-honey.png",
    imageWidth: 736,
    imageHeight: 1104,
    href: "/catalog?category=honey",
  },
];

const galleryImages = [
  {
    alt: "Beekeeper working among flowering plants",
    src: "/assets/gallery/beekeeper.png",
  },
  {
    alt: "Farmer caring for cows in a pasture",
    src: "/assets/gallery/farm-cow-care.png",
  },
  {
    alt: "Chickens at sunrise on the farm",
    src: "/assets/gallery/farm-life-sunrise.png",
  },
  {
    alt: "Worker walking through a corn field",
    src: "/assets/gallery/corn-field-worker.png",
  },
  {
    alt: "Woman holding a chicken outdoors",
    src: "/assets/gallery/farm-chicken-portrait.png",
  },
];

const galleryPositionClasses = [
  "galleryFrameBackLeft",
  "galleryFrameSideLeft",
  "galleryFrameCenter",
  "galleryFrameSideRight",
  "galleryFrameBackRight",
];

const reviews = [
  {
    author: "Sarah Thompson",
    quote:
      "The quality of the products is outstanding. Everything tastes fresh, natural, and full of flavor. It's great to know exactly where our food comes from.",
  },
  {
    author: "Michael Carter",
    quote:
      "We've been ordering from this farm for over a year, and the quality has always been exceptional. Fresh products, friendly service, and fast delivery every time.",
  },
  {
    author: "Emma Wilson",
    quote:
      "The eggs, cheese, and honey are absolutely amazing. You can really tell the difference between farm-fresh products and what you find in regular stores.",
  },
  {
    author: "Daniel Brooks",
    quote:
      "The farm life updates make every order feel personal. The products arrive fresh, beautifully packed, and always taste exactly as promised.",
  },
];

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);
  const [activeGallery, setActiveGallery] = useState(2);
  const [galleryDirection, setGalleryDirection] = useState<-1 | 1>(1);
  const [activeReview, setActiveReview] = useState(0);
  const productsViewportRef = useRef<HTMLDivElement>(null);
  const galleryRailRef = useRef<HTMLDivElement>(null);
  const reviewsScrollerRef = useRef<HTMLDivElement>(null);

  const moveGallery = (direction: -1 | 1) => {
    setGalleryDirection(direction);
    setActiveGallery((current) => {
      const next = current + direction;
      if (next < 0) {
        return galleryImages.length - 1;
      }

      if (next >= galleryImages.length) {
        return 0;
      }

      return next;
    });
  };

  const scrollCarousel = (
    element: HTMLElement | null,
    selector: string,
    activeIndex: number,
    itemCount: number,
    direction: -1 | 1,
    setActive: (index: number) => void,
  ) => {
    if (!element || itemCount === 0) {
      return;
    }

    const items = Array.from(element.querySelectorAll<HTMLElement>(selector));
    const nextIndex = (activeIndex + direction + itemCount) % itemCount;
    const nextItem = items[nextIndex];

    if (!nextItem) {
      return;
    }

    setActive(nextIndex);
    element.scrollTo({
      behavior: "smooth",
      left: nextItem.offsetLeft - (element.clientWidth - nextItem.offsetWidth) / 2,
    });
  };

  useEffect(() => {
    const bindScrollPosition = (
      element: HTMLElement | null,
      selector: string,
      setActive: (index: number) => void,
    ) => {
      if (!element) {
        return undefined;
      }

      let frame = 0;
      const update = () => {
        frame = 0;
        const items = Array.from(element.querySelectorAll<HTMLElement>(selector));
        const viewportCenter = element.scrollLeft + element.clientWidth / 2;
        const closest = items.reduce(
          (best, item, index) => {
            const itemCenter = item.offsetLeft + item.offsetWidth / 2;
            const distance = Math.abs(itemCenter - viewportCenter);
            return distance < best.distance ? { distance, index } : best;
          },
          { distance: Number.POSITIVE_INFINITY, index: 0 },
        );
        setActive(closest.index);
      };

      const requestUpdate = () => {
        if (frame) {
          return;
        }
        frame = window.requestAnimationFrame(update);
      };

      update();
      element.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate);

      return () => {
        if (frame) {
          window.cancelAnimationFrame(frame);
        }
        element.removeEventListener("scroll", requestUpdate);
        window.removeEventListener("resize", requestUpdate);
      };
    };

    const cleanups = [
      bindScrollPosition(
        productsViewportRef.current,
        ".productCard",
        setActiveProduct,
      ),
      bindScrollPosition(
        galleryRailRef.current,
        ".galleryFrame",
        (index) => {
          if (window.matchMedia("(max-width: 760px)").matches) {
            setActiveGallery(index);
          }
        },
      ),
      bindScrollPosition(
        reviewsScrollerRef.current,
        ".reviewCard",
        setActiveReview,
      ),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup?.());
    };
  }, []);

  return (
    <main>
      <section className="hero" aria-label="Velora Farm hero">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero/hero-poster.png"
          aria-label="Velora Farm countryside video"
        >
          <source src="/assets/hero/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="heroShade" aria-hidden="true" />

        <header className="siteHeader">
          <Link className="brand" href="/" aria-label="Velora Farm home">
            <span>Velora</span>
            <span>Farm</span>
          </Link>

          <nav className="desktopNav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="headerTools" aria-label="Header tools">
            <button type="button" aria-label="Switch language to English">
              EN
            </button>
            <button className="iconButton" type="button" aria-label="Wishlist">
              <span className="heartIcon" aria-hidden="true" />
            </button>
            <button className="iconButton" type="button" aria-label="Cart">
              <span className="bagIcon" aria-hidden="true" />
            </button>
          </div>

          <button className="menuButton" type="button" aria-label="Open menu">
            <span />
            <span />
            <span />
          </button>
        </header>

        <div className="heroCopy">
          <h1>NATURE&apos;S FINEST, PERFECTED SLOWLY</h1>
          <p>
            Our farm is more than just production - it&apos;s a lifestyle inspired
            by nature. Here you can explore our products, discover the story
            behind the farm, enjoy countryside experiences, and order fresh
            products directly from the source.
          </p>
        </div>
      </section>

      <section
        className="productsSection"
        id="products"
        aria-labelledby="products-title"
      >
        <div className="productsIntro">
          <h2 id="products-title">PRODUCTS</h2>
          <p>
            We offer fresh, natural products crafted with care, quality, and a
            commitment to providing the best for your family
          </p>
        </div>

        <div
          className="productsViewport"
          aria-label="Product categories"
          ref={productsViewportRef}
        >
          <div className="productsTrack">
            {products.map((product) => (
              <Link
                className="productCard"
                href={product.href}
                key={product.label}
              >
                <div className="productImageWrap">
                  <Image
                    src={product.image}
                    alt=""
                    aria-hidden="true"
                    width={product.imageWidth ?? 260}
                    height={product.imageHeight ?? 260}
                  />
                </div>
                <div className="productCardFooter">
                  <h3>{product.label}</h3>
                  <span className="productLinkArrow" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="productsDots" aria-hidden="true">
          {products.map((product, index) => (
            <span
              className={index === activeProduct ? "isActive" : ""}
              key={product.label}
            />
          ))}
        </div>

        <div className="carouselControls" aria-label="Products carousel controls">
          <button
            className="carouselButton carouselButtonPrev"
            type="button"
            aria-label="Previous product"
            onClick={() =>
              scrollCarousel(
                productsViewportRef.current,
                ".productCard",
                activeProduct,
                products.length,
                -1,
                setActiveProduct,
              )
            }
          />
          <button
            className="carouselButton carouselButtonNext"
            type="button"
            aria-label="Next product"
            onClick={() =>
              scrollCarousel(
                productsViewportRef.current,
                ".productCard",
                activeProduct,
                products.length,
                1,
                setActiveProduct,
              )
            }
          />
        </div>
      </section>

      <section className="aboutSection" id="about" aria-labelledby="about-title">
        <div className="aboutImagePanel">
          <Image
            className="aboutCows"
            src="/assets/shared/about-cows.png"
            alt="Cows grazing in an open green field"
            width={602}
            height={873}
            priority={false}
          />
          <div className="aboutCallout calloutHectares">
            <span>50 HECTARES</span>
            <i aria-hidden="true" />
          </div>
          <div className="aboutCallout calloutYears">
            <span>
              10+ YEARS
              <br />
              OF FARMING EXPERIENCE
            </span>
            <i aria-hidden="true" />
          </div>
          <div className="aboutCallout calloutNatural">
            <span>100% NATURAL PRODUCTS</span>
            <i aria-hidden="true" />
          </div>
        </div>

        <div className="aboutContent">
          <h2 id="about-title">ABOUT US</h2>
          <p className="aboutLead">
            OUR FARM COMBINES MODERN TECHNOLOGY WITH SUSTAINABLE FARMING
            TRADITIONS. WE BELIEVE GREAT PRODUCTS START WITH RESPECT FOR
            NATURE, ANIMALS, AND PEOPLE
          </p>
          <Image
            className="aboutIllustration"
            src="/assets/shared/field-line-illustration.png"
            alt=""
            aria-hidden="true"
            width={500}
            height={305}
          />
          <div className="aboutBody">
            <p>
              For over <strong>10 years</strong>, we have been growing and
              producing natural farm products for families who value quality,
              freshness, and authentic taste. Our farm is located away from
              industrial areas, surrounded by open fields and beautiful natural
              landscapes.
            </p>
            <p>
              Every day, our team takes care of the animals, monitors the crops,
              and carefully oversees every stage of production. We are not
              focused on mass production - our priority is preserving the
              natural flavor, freshness, and nutritional value of every product.
            </p>
            <p>
              We believe that honest farming starts with transparency. That&apos;s
              why our customers always know where their food comes from and how
              it is produced.
            </p>
          </div>
        </div>
      </section>

      <section className="phaseSlot" id="farm-life" aria-label="Farm Life" />
      <section className="phaseSlot" id="experiences" aria-label="Experiences" />

      <section className="gallerySection" id="gallery" aria-label="Farm Life gallery">
        <h2>FARM LIFE</h2>
        <div
          className="galleryRail"
          aria-label="Farm Life photos"
          ref={galleryRailRef}
        >
          {galleryImages.map((image, index) => {
            const relativePosition =
              (index - activeGallery + galleryImages.length) %
              galleryImages.length;
            const normalizedPosition =
              relativePosition > 2
                ? relativePosition - galleryImages.length
                : relativePosition;
            const positionClass =
              galleryPositionClasses[normalizedPosition + 2];
            const shouldWrapBehind =
              (galleryDirection === 1 && normalizedPosition === 2) ||
              (galleryDirection === -1 && normalizedPosition === -2);

            return (
              <figure
                className={`galleryFrame ${positionClass}${
                  shouldWrapBehind ? " galleryFrameWrapBehind" : ""
                }`}
                key={image.src}
              >
                <Image
                  alt={image.alt}
                  fill
                  priority={index === activeGallery}
                  sizes="(max-width: 760px) 305px, 462px"
                  src={image.src}
                />
              </figure>
            );
          })}
        </div>

        <div className="galleryControls" aria-label="Gallery controls">
          <button
            type="button"
            aria-label="Previous gallery image"
            onClick={() => moveGallery(-1)}
          >
            <span aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next gallery image"
            onClick={() => moveGallery(1)}
          >
            <span aria-hidden="true" />
          </button>
        </div>

        <div className="galleryDots" aria-label="Gallery position">
          {galleryImages.map((image, index) => (
            <span
              className={index === activeGallery ? "isActive" : undefined}
              key={image.src}
            />
          ))}
        </div>

        <p className="galleryCopy">
          Follow our journey on <a href="#contact">Instagram</a> and{" "}
          <a href="#contact">YouTube</a>, where we share life on the farm,
          behind-the-scenes moments, product updates, seasonal harvests, and the
          people who make it all possible.
        </p>
      </section>

      <section className="reviewsSection" id="reviews" aria-label="Reviews">
        <div className="reviewsTop">
          <h2>REVIEWS</h2>
          <a className="seeMore" href="#reviews">
            See more
            <span aria-hidden="true" />
          </a>
        </div>

        <div
          className="reviewsScroller"
          aria-label="Customer reviews"
          ref={reviewsScrollerRef}
        >
          {reviews.map((review) => (
            <article className="reviewCard" key={review.author}>
              <div className="reviewStars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    alt=""
                    aria-hidden="true"
                    height={30}
                    key={index}
                    src="/assets/shared/star.png"
                    width={31}
                  />
                ))}
              </div>
              <p>&quot;{review.quote}&quot;</p>
              <footer>- {review.author}</footer>
            </article>
          ))}
        </div>

        <div className="reviewsControls" aria-label="Reviews controls">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() =>
              scrollCarousel(
                reviewsScrollerRef.current,
                ".reviewCard",
                activeReview,
                reviews.length,
                -1,
                setActiveReview,
              )
            }
          >
            <span aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() =>
              scrollCarousel(
                reviewsScrollerRef.current,
                ".reviewCard",
                activeReview,
                reviews.length,
                1,
                setActiveReview,
              )
            }
          >
            <span aria-hidden="true" />
          </button>
        </div>

        <div className="reviewDots" aria-label="Reviews position">
          {reviews.map((review, index) => (
            <span
              className={index === activeReview ? "isActive" : undefined}
              key={review.author}
            />
          ))}
        </div>
      </section>

      <footer className="siteFooter" id="contact">
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
            <a href="#about">About</a>
            <a href="#products">Products</a>
            <a href="#farm-life">Farm Life</a>
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
    </main>
  );
}
