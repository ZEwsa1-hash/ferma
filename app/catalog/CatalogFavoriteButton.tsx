"use client";

import { useState } from "react";

type CatalogFavoriteButtonProps = {
  productName: string;
};

export function CatalogFavoriteButton({
  productName,
}: CatalogFavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <button
      className={`catalogFavorite ${isFavorite ? "isActive" : ""}`}
      type="button"
      aria-label={`${isFavorite ? "Remove" : "Add"} ${productName} ${
        isFavorite ? "from" : "to"
      } wishlist`}
      aria-pressed={isFavorite}
      onClick={() => setIsFavorite((current) => !current)}
    >
      <span className="heartIcon" aria-hidden="true" />
    </button>
  );
}
