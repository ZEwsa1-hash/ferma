import { CatalogInteractive } from "./CatalogInteractive";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Farm Life", href: "/#farm-life" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

const categories = [
  { label: "Cheeses", value: "cheeses" },
  { label: "Dairy Products", value: "dairy" },
  { label: "Meat", value: "meat" },
  { label: "Natural Honey", value: "honey" },
  { label: "Vegetables & Greens", value: "vegetables" },
  { label: "Eggs", value: "eggs" },
];

type CatalogProduct = {
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  imageClassName?: string;
  href?: string;
};

const cheeseProducts: CatalogProduct[] = [
  {
    name: "Farm Cheddar",
    description: "Rich, creamy, and perfectly aged",
    price: "$18.99/kg",
    rating: 5,
    reviews: 110,
    image: "/assets/catalog/farm-cheddar.png",
    imageClassName: "catalogProductImageCheddar",
  },
  {
    name: "Aged Gouda",
    description: "Smooth texture with caramel notes",
    price: "$24.99/kg",
    rating: 5,
    reviews: 80,
    image: "/assets/catalog/aged-gouda.png",
  },
  {
    name: "Mozzarella",
    description: "Soft, fresh, and delicately milky",
    price: "$16.99/kg",
    rating: 5,
    reviews: 25,
    image: "/assets/catalog/mozzarella.png",
  },
  {
    name: "Goat Cheese",
    description: "Creamy with a light tangy flavor",
    price: "$27.99/kg",
    rating: 5,
    reviews: 93,
    image: "/assets/catalog/goat-cheese.png",
  },
  {
    name: "Blue Cheese",
    description: "Bold, rich, and full of character",
    price: "$31.99/kg",
    rating: 4,
    reviews: 203,
    image: "/assets/catalog/blue-cheese.png",
  },
];

const dairyProducts: CatalogProduct[] = [
  {
    name: "Fresh Milk",
    description: "Pure, fresh, and naturally creamy",
    price: "$2.99/L",
    rating: 5,
    reviews: 550,
    image: "/assets/catalog/fresh-milk.png",
    imageClassName: "catalogProductImageMilk",
    href: "/product",
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

const meatProducts: CatalogProduct[] = [
  {
    name: "Grass-Fed Beef",
    description: "Tender, juicy, and full of flavor",
    price: "$24.99/kg",
    rating: 5,
    reviews: 850,
    image: "/assets/catalog/grass-fed-beef.png",
  },
  {
    name: "Range Chicken",
    description: "Fresh, lean, and naturally raised",
    price: "$12.99/kg",
    rating: 5,
    reviews: 322,
    image: "/assets/catalog/range-chicken.png",
  },
  {
    name: "Farm Pork",
    description: "Rich, succulent, and flavorful",
    price: "$16.99/kg",
    rating: 5,
    reviews: 415,
    image: "/assets/catalog/farm-pork.png",
  },
];

const honeyProducts: CatalogProduct[] = [
  {
    name: "Wildflower Honey",
    description: "Golden, floral, and naturally sweet",
    price: "$14.99/jar",
    rating: 5,
    reviews: 184,
    image: "/assets/products/natural-honey.png",
  },
  {
    name: "Creamed Honey",
    description: "Smooth, spreadable, and gently whipped",
    price: "$16.99/jar",
    rating: 5,
    reviews: 96,
    image: "/assets/products/natural-honey.png",
  },
];

const vegetableProducts: CatalogProduct[] = [
  {
    name: "Seasonal Greens",
    description: "Fresh-picked leaves from our garden beds",
    price: "$6.99/bundle",
    rating: 5,
    reviews: 73,
    image: "/assets/products/vegetables-greens.png",
  },
  {
    name: "Farm Vegetables Box",
    description: "A rotating mix of crisp seasonal produce",
    price: "$22.99/box",
    rating: 4,
    reviews: 128,
    image: "/assets/products/vegetables-greens.png",
  },
];

const eggProducts: CatalogProduct[] = [
  {
    name: "Pasture-Raised Eggs",
    description: "Rich, golden yolks from free-roaming hens",
    price: "$7.99/dozen",
    rating: 5,
    reviews: 241,
    image: "/assets/gallery/farm-chicken-portrait.png",
  },
  {
    name: "Mixed Farm Eggs",
    description: "A colorful dozen gathered fresh each morning",
    price: "$8.99/dozen",
    rating: 5,
    reviews: 119,
    image: "/assets/gallery/farm-life-sunrise.png",
  },
];

const catalogProducts = {
  cheeses: cheeseProducts,
  dairy: dairyProducts,
  eggs: eggProducts,
  honey: honeyProducts,
  meat: meatProducts,
  vegetables: vegetableProducts,
};

type CatalogCategory = keyof typeof catalogProducts;

type CatalogPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

const isCatalogCategory = (value: string | undefined): value is CatalogCategory =>
  typeof value === "string" && value in catalogProducts;

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const category = params?.category;
  const activeCategory: CatalogCategory = isCatalogCategory(category)
    ? category
    : "cheeses";
  const products = catalogProducts[activeCategory];

  return (
    <CatalogInteractive
      activeCategory={activeCategory}
      categories={categories}
      key={activeCategory}
      navItems={navItems}
      products={products}
    />
  );
}
