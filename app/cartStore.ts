import { useSyncExternalStore } from "react";

export const CART_STORAGE_KEY = "velora-cart-count";
export const CART_ITEMS_STORAGE_KEY = "velora-cart-items";
const CART_CHANGE_EVENT = "velora-cart-change";

export type CartProduct = {
  image?: string;
  name: string;
  price?: string;
};

export type CartItem = CartProduct & {
  quantity: number;
};

const EMPTY_CART_ITEMS: CartItem[] = [];
let cachedCartItemsRaw: string | null | undefined;
let cachedCartItems: CartItem[] = EMPTY_CART_ITEMS;

const sanitizeQuantity = (quantity: number) =>
  Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0;

const normalizeCartItem = (value: unknown): CartItem | null => {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<CartItem>;
  const quantity = sanitizeQuantity(Number(candidate.quantity));

  if (!candidate.name || typeof candidate.name !== "string" || quantity <= 0) {
    return null;
  }

  return {
    image: typeof candidate.image === "string" ? candidate.image : undefined,
    name: candidate.name,
    price: typeof candidate.price === "string" ? candidate.price : undefined,
    quantity,
  };
};

const emitCartChange = () => {
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
};

export function readCartItems(): CartItem[] {
  if (typeof window === "undefined") {
    return EMPTY_CART_ITEMS;
  }

  const savedItems = window.localStorage.getItem(CART_ITEMS_STORAGE_KEY);

  if (savedItems === cachedCartItemsRaw) {
    return cachedCartItems;
  }

  if (savedItems) {
    try {
      const parsedItems = JSON.parse(savedItems);

      if (Array.isArray(parsedItems)) {
        cachedCartItemsRaw = savedItems;
        cachedCartItems = parsedItems
          .map(normalizeCartItem)
          .filter((item): item is CartItem => Boolean(item));

        return cachedCartItems;
      }
    } catch {
      window.localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
    }
  }

  const legacyCount = readLegacyCartCount();

  cachedCartItemsRaw = savedItems;
  cachedCartItems = legacyCount > 0
    ? [{ name: "Farm products", quantity: legacyCount }]
    : EMPTY_CART_ITEMS;

  return cachedCartItems;
}

export function readCartCount() {
  return readCartItems().reduce((total, item) => total + item.quantity, 0);
}

function readLegacyCartCount() {
  if (typeof window === "undefined") {
    return 0;
  }

  const savedCount = Number(window.localStorage.getItem(CART_STORAGE_KEY));

  return Number.isFinite(savedCount) && savedCount > 0 ? savedCount : 0;
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  const normalizedItems = items
    .map(normalizeCartItem)
    .filter((item): item is CartItem => Boolean(item));

  if (normalizedItems.length === 0) {
    window.localStorage.removeItem(CART_ITEMS_STORAGE_KEY);
    window.localStorage.removeItem(CART_STORAGE_KEY);
    cachedCartItemsRaw = null;
    cachedCartItems = EMPTY_CART_ITEMS;
  } else {
    const rawItems = JSON.stringify(normalizedItems);

    window.localStorage.setItem(
      CART_ITEMS_STORAGE_KEY,
      rawItems,
    );
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      String(normalizedItems.reduce((total, item) => total + item.quantity, 0)),
    );
    cachedCartItemsRaw = rawItems;
    cachedCartItems = normalizedItems;
  }

  emitCartChange();
}

export function saveCartCount(count: number) {
  const quantity = sanitizeQuantity(count);

  saveCartItems(quantity > 0 ? [{ name: "Farm products", quantity }] : []);
}

export function addCartItem(product: CartProduct, quantity = 1) {
  const nextQuantity = sanitizeQuantity(quantity);

  if (!product.name || nextQuantity <= 0) {
    return readCartItems();
  }

  const currentItems = readCartItems();
  const existingItem = currentItems.find((item) => item.name === product.name);
  const nextItems = existingItem
    ? currentItems.map((item) =>
        item.name === product.name
          ? { ...item, ...product, quantity: item.quantity + nextQuantity }
          : item,
      )
    : [...currentItems, { ...product, quantity: nextQuantity }];

  saveCartItems(nextItems);

  return nextItems;
}

export function updateCartItemQuantity(productName: string, quantity: number) {
  const nextQuantity = sanitizeQuantity(quantity);
  const nextItems = readCartItems()
    .map((item) =>
      item.name === productName ? { ...item, quantity: nextQuantity } : item,
    )
    .filter((item) => item.quantity > 0);

  saveCartItems(nextItems);

  return nextItems;
}

export function clearCart() {
  saveCartItems([]);
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
    if (
      event.key === CART_STORAGE_KEY ||
      event.key === CART_ITEMS_STORAGE_KEY
    ) {
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

export function useCartItems() {
  return useSyncExternalStore(
    subscribeCartCount,
    readCartItems,
    () => EMPTY_CART_ITEMS,
  );
}
