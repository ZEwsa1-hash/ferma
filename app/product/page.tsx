import { ProductPageInteractive, ProductPageProduct } from "./ProductPageInteractive";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Farm Life", href: "/#farm-life" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

const product: ProductPageProduct = {
  name: "Fresh Milk",
  description:
    "Pure farm-fresh milk with a rich and natural flavor, sourced from healthy pasture-raised cows and processed with care to preserve its freshness and nutritional value",
  price: "$2.99/L",
  rating: 5,
  reviews: 550,
  images: [
    {
      alt: "Glass bottles of fresh milk in a farm carrier",
      src: "/assets/catalog/fresh-milk.png",
    },
    {
      alt: "Farm cheddar on a wooden board",
      src: "/assets/catalog/farm-cheddar.png",
    },
    {
      alt: "Greek yogurt in a jar",
      src: "/assets/catalog/greek-yogurt.png",
    },
  ],
  details: [
    "Fat Content: 3.5%",
    "Protein: 3.3g per 100ml",
    "Calcium: High",
    "Volume: 1L, 2L",
    "Shelf Life: 7 Days",
    "Storage: Keep Refrigerated at 2-4°C",
    "Origin: Farm Produced",
    "Produced From: Grass-Fed Cows",
  ],
};

const relatedProducts = [
  {
    name: "Fresh Milk",
    description: "Pure, fresh, and naturally creamy",
    price: "$2.99/L",
    rating: 5,
    reviews: 550,
    image: "/assets/catalog/fresh-milk.png",
    imageClassName: "productRelatedImageMilk",
  },
  {
    name: "Greek Yogurt",
    description: "Rich, smooth, and protein-packed",
    price: "$8.99/kg",
    rating: 4,
    reviews: 20,
    image: "/assets/catalog/greek-yogurt.png",
  },
  {
    name: "Heavy Cream",
    description: "Silky texture with a rich taste",
    price: "$10.99/L",
    rating: 5,
    reviews: 15,
    image: "/assets/catalog/heavy-cream.png",
  },
  {
    name: "Farm Butter",
    description: "Freshly churned and full of flavor",
    price: "$15.99/kg",
    rating: 5,
    reviews: 153,
    image: "/assets/catalog/farm-butter.png",
  },
];

export default function ProductPage() {
  return (
    <ProductPageInteractive
      navItems={navItems}
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
