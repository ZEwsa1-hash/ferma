import { useSyncExternalStore } from "react";

export const CART_STORAGE_KEY = "velora-cart-count";
const CART_CHANGE_EVENT = "velora-cart-count-change";

export function readCartCount() {
  if (typeof window === "undefined") {
    return 0;
  }

  const savedCount = Number(window.localStorage.getItem(CART_STORAGE_KEY));

  return Number.isFinite(savedCount) && savedCount > 0 ? savedCount : 0;
}

export function saveCartCount(count: number) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, String(count));
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function incrementCartCount(count = 1) {
  const nextCount = readCartCount() + count;

  saveCartCount(nextCount);

  return nextCount;
}

function subscribeCartCount(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener(CART_CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", handleStorageChange);

  return () => {
    window.removeEventListener(CART_CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", handleStorageChange);
  };
}

export function useCartCount() {
  return useSyncExternalStore(subscribeCartCount, readCartCount, () => 0);
}
