"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CartDrawer } from "./CartDrawer";
import { MobileMenu } from "./MobileMenu";
import { useCartCount } from "./cartStore";

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
    label: "Artisan Cheeses",
    image: "/assets/products/artisan-cheeses.png",
    href: "/catalog",
  },
  {
    label: "Dairy Products",
    image: "/assets/products/dairy-products.png",
    href: "/catalog?category=dairy",
  },
  {
    label: "Premium Meat",
    image: "/assets/products/premium-meat.png",
    imageWidth: 217,
    imageHeight: 326,
    href: "/catalog?category=meat",
  },
  {
    label: "Vegetables & Greens",
    image: "/assets/products/vegetables-greens.png",
    href: "/catalog?category=vegetables",
  },
  {
    label: "Natural Honey",
    image: "/assets/products/natural-honey.png",
    imageWidth: 736,
    imageHeight: 1104,
    href: "/catalog?category=honey",
  },
  {
    label: "Fresh Eggs",
    image: "/assets/products/fresh-eggs-card.png",
    href: "/catalog?category=eggs",
    isCompleteCard: true,
  },
];

const galleryImages = [
  {
    alt: "Beekeeper inspecting a hive frame",
    src: "/assets/gallery/beekeeper-at-hive-enhanced.png",
  },
  {
    alt: "Farmer resting in a pasture with cows",
    src: "/assets/gallery/farmer-with-cows-enhanced.png",
  },
  {
    alt: "Chickens walking through a sunlit farm field",
    src: "/assets/gallery/chickens-at-sunrise-enhanced.png",
  },
  {
    alt: "Farmer walking through a cornfield",
    src: "/assets/gallery/farmer-in-cornfield-enhanced.png",
  },
  {
    alt: "Woman smiling with a chicken on her shoulder",
    src: "/assets/gallery/woman-with-chicken-enhanced.png",
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
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);
  const [activeGallery, setActiveGallery] = useState(2);
  const [galleryDirection, setGalleryDirection] = useState<-1 | 1>(1);
  const [activeReview, setActiveReview] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = useCartCount();
  const productsViewportRef = useRef<HTMLDivElement>(null);
  const galleryRailRef = useRef<HTMLDivElement>(null);
  const reviewsScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeader = () => setIsHeaderScrolled(window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

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

  const scrollReviews = (direction: -1 | 1) => {
    const scroller = reviewsScrollerRef.current;
    const card = scroller?.querySelector<HTMLElement>(".reviewCard");
    if (!scroller || !card) return;

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    const atEnd = scroller.scrollLeft >= maxScroll - 2;
    const atStart = scroller.scrollLeft <= 2;
    scroller.scrollTo({
      behavior: "smooth",
      left:
        direction === 1 && atEnd
          ? 0
          : direction === -1 && atStart
            ? maxScroll
            : scroller.scrollLeft + direction * (card.offsetWidth + 20),
    });
  };

  const scrollProducts = (direction: -1 | 1) => {
    const viewport = productsViewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(".productCard");

    if (!viewport || !card) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const atEnd = viewport.scrollLeft >= maxScroll - 2;
    const atStart = viewport.scrollLeft <= 2;

    viewport.scrollTo({
      behavior: "smooth",
      left:
        direction === 1 && atEnd
          ? 0
          : direction === -1 && atStart
            ? maxScroll
            : viewport.scrollLeft + direction * (card.offsetWidth + 20),
    });
  };

  useEffect(() => {
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".homePage .revealText"),
    );
    revealTargets.forEach((target) => {
      if (target.dataset.revealPrepared) return;
      target.dataset.revealPrepared = "true";
      let wordIndex = 0;
      const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode as Text);
      textNodes.forEach((node) => {
        const fragment = document.createDocumentFragment();
        node.textContent?.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.append(document.createTextNode(part));
          } else {
            const word = document.createElement("span");
            word.className = "revealWord";
            word.style.setProperty("--word-delay", `${Math.floor(wordIndex / 2) * 120}ms`);
            word.textContent = part;
            fragment.append(word);
            wordIndex += 1;
          }
        });
        node.replaceWith(fragment);
      });
    });
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealTargets.forEach((target) => revealObserver.observe(target));
    document.querySelector(".homePage")?.classList.add("motionReady");

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
      revealObserver.disconnect();
      cleanups.forEach((cleanup) => cleanup?.());
    };
  }, []);

  return (
    <main className="homePage">
      <section className="hero" aria-label="Velora Farm hero">
        <div className="heroShade" aria-hidden="true" />

        <header className={`siteHeader${isHeaderScrolled ? " siteHeaderScrolled" : ""}`}>
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
            <button
              className="languageButton"
              type="button"
              aria-label="Switch language to English"
            >
              EN
              <span aria-hidden="true" />
            </button>
            <button className="iconButton" type="button" aria-label="Wishlist">
              <span className="heartIcon" aria-hidden="true" />
            </button>
            <button
              className={`iconButton catalogCartButton ${
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

          <MobileMenu items={navItems} home />
        </header>

        <div className="heroCopy">
          <h1>
            <span>Nature&rsquo;s Finest,</span>{" "}
            <span>Perfected Slowly</span>
          </h1>
          <p className="revealText">
            Our farm is more than just production &mdash; it&rsquo;s a lifestyle
            inspired by nature. Here you can explore our products, discover the
            story behind the farm, enjoy countryside experiences, and order
            fresh products directly from the source.
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
          <p className="revealText">
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
            {products.map((product, index) => (
              <Link
                className={`productCard productCard${index + 1}${product.isCompleteCard ? " productCardComplete" : ""}${activeProduct === index ? " isActive" : ""}`}
                href={product.href}
                key={product.label}
                aria-label={product.isCompleteCard ? product.label : undefined}
              >
                {product.isCompleteCard ? (
                  <>
                    <Image
                      className="productCompleteImage"
                      src={product.image}
                      alt=""
                      aria-hidden="true"
                      width={305}
                      height={379}
                    />
                    <Image
                      className="productEggsHoverImage"
                      src={product.image}
                      alt=""
                      aria-hidden="true"
                      width={305}
                      height={379}
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
            onClick={() => scrollProducts(-1)}
          />
          <button
            className="carouselButton carouselButtonNext"
            type="button"
            aria-label="Next product"
            onClick={() => scrollProducts(1)}
          />
        </div>
      </section>

      <section className="aboutSection" id="about" aria-labelledby="about-title">
        <div className="aboutImagePanel">
          <Image
            className="aboutCows"
            src="/assets/shared/about-cows-enhanced.png"
            alt="Cows grazing in an open green field"
            width={1041}
            height={1511}
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
          <p className="aboutLead revealText">
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
            <p className="revealText">
              For over <strong>10 years</strong>, we have been growing and
              producing natural farm products for families who value quality,
              freshness, and authentic taste. Our farm is located away from
              industrial areas, surrounded by open fields and beautiful natural
              landscapes.
            </p>
            <p className="revealText">
              Every day, our team takes care of the animals, monitors the crops,
              and carefully oversees every stage of production. We are not
              focused on mass production - our priority is preserving the
              natural flavor, freshness, and nutritional value of every product.
            </p>
            <p className="revealText">
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
                  sizes="(max-width: 760px) 305px, 370px"
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

        <p className="galleryCopy revealText">
          Follow our journey on <a href="#contact">Instagram</a> and{" "}
          <a href="#contact">YouTube</a>, where we share life on the farm,
          behind-the-scenes moments, product updates, seasonal harvests, and the
          people who make it all possible.
        </p>
      </section>

      <section className="reviewsSection" id="reviews" aria-label="Reviews">
        <div className="reviewsTop">
          <h2>REVIEWS</h2>
        </div>

        <div
          className={`reviewsScroller${showAllReviews ? " isExpanded" : ""}`}
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
            onClick={() => scrollReviews(-1)}
          >
            <span aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => scrollReviews(1)}
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

        <button
          className="seeMore"
          type="button"
          aria-expanded={showAllReviews}
          onClick={() => setShowAllReviews((current) => !current)}
        >
          {showAllReviews ? "Show less" : "See more"}
          <span aria-hidden="true" />
        </button>
      </section>

      <footer className="siteFooter" id="contact">
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
            <p className="revealText">
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
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}
