"use client";

import Image from "next/image";
import {
  clearCart,
  updateCartItemQuantity,
  useCartCount,
  useCartItems,
} from "./cartStore";

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartItems();
  const cartCount = useCartCount();

  return (
    <div
      className={`cartDrawerLayer ${isOpen ? "isOpen" : ""}`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >
      <button
        className="cartDrawerBackdrop"
        type="button"
        aria-label="Close cart"
        tabIndex={isOpen ? 0 : -1}
        onClick={onClose}
      />
      <aside
        className="cartDrawer"
        aria-label="Shopping cart"
        aria-modal="true"
        role="dialog"
      >
        <div className="cartDrawerHeader">
          <div>
            <p>Cart</p>
            <h2>{cartCount} {cartCount === 1 ? "item" : "items"}</h2>
          </div>
          <button type="button" aria-label="Close cart" onClick={onClose}>
            <span aria-hidden="true" />
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <div className="cartDrawerItems">
              {items.map((item) => (
                <article className="cartDrawerItem" key={item.name}>
                  <div className="cartDrawerItemImage">
                    {item.image ? (
                      <Image
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="72px"
                        src={item.image}
                      />
                    ) : (
                      <span aria-hidden="true" />
                    )}
                  </div>
                  <div className="cartDrawerItemBody">
                    <h3>{item.name}</h3>
                    {item.price ? <p>{item.price}</p> : null}
                    <div className="cartDrawerQuantity">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() =>
                          updateCartItemQuantity(item.name, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <output aria-live="polite">{item.quantity}</output>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() =>
                          updateCartItemQuantity(item.name, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cartDrawerFooter">
              <button type="button" onClick={clearCart}>
                Clear cart
              </button>
              <button type="button">Checkout</button>
            </div>
          </>
        ) : (
          <div className="cartDrawerEmpty">
            <h3>Your cart is empty</h3>
            <p>Fresh farm products will appear here after you add them.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
