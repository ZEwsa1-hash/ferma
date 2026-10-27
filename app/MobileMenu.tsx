"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MobileMenuProps = {
  items: { label: string; href: string }[];
  home?: boolean;
};

export function MobileMenu({ items, home = false }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className={`mobileMenu${home ? " mobileMenuHome" : ""}`}>
      <button
        className={`${home ? "menuButton" : "catalogMobileBurger"}${open ? " isOpen" : ""}`}
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={home ? "home-mobile-nav" : "inner-mobile-nav"}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
        <span />
      </button>
        <nav
          className={`mobileNavPanel${open ? " isOpen" : ""}`}
          id={home ? "home-mobile-nav" : "inner-mobile-nav"}
          aria-label="Mobile navigation"
          aria-hidden={!open}
          inert={!open}
        >
          {items.map((item) => (
            <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
    </div>
  );
}
