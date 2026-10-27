export const categories = [
  { label: "Cheeses", value: "cheeses" },
  { label: "Dairy Products", value: "dairy" },
  { label: "Meat", value: "meat" },
  { label: "Natural Honey", value: "honey" },
  { label: "Vegetables & Greens", value: "vegetables" },
  { label: "Eggs", value: "eggs" },
];

export type CatalogProduct = {
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
    name: "Honey",
    description: "Balanced with natural floral notes",
    price: "$12.99/kg",
    rating: 5,
    reviews: 5,
    image: "/assets/catalog/honey.png",
  },
  {
    name: "Acacia Honey",
    description: "Light, smooth, and naturally sweet",
    price: "$18.99/kg",
    rating: 5,
    reviews: 18,
    image: "/assets/catalog/acacia-honey.png",
  },
  {
    name: "Clover Honey",
    description: "Mild, floral, and pleasantly sweet",
    price: "$15.99/kg",
    rating: 4,
    reviews: 22,
    image: "/assets/catalog/clover-honey.png",
  },
  {
    name: "Forest Honey",
    description: "Dark, aromatic, and full-bodied",
    price: "$21.99/kg",
    rating: 5,
    reviews: 104,
    image: "/assets/catalog/forest-honey.png",
  },
];

const vegetableProducts: CatalogProduct[] = [
  {
    name: "Green Lettuce",
    description: "Crisp, leafy, and freshly harvested",
    price: "$5.99/kg",
    rating: 4,
    reviews: 555,
    image: "/assets/catalog/green-lettuce.png",
  },
  {
    name: "Fresh Herbs Mix",
    description: "Aromatic blend of parsley, dill, and basil",
    price: "$9.99/kg",
    rating: 5,
    reviews: 218,
    image: "/assets/catalog/fresh-herbs-mix.png",
  },
  {
    name: "Organic Tomatoes",
    description: "Juicy, fresh, and naturally sweet",
    price: "$4.99/kg",
    rating: 4,
    reviews: 22,
    image: "/assets/catalog/organic-tomatoes.png",
  },
  {
    name: "Crisp Cucumbers",
    description: "Refreshing, crunchy, and full of flavor",
    price: "$3.99/kg",
    rating: 5,
    reviews: 104,
    image: "/assets/catalog/crisp-cucumbers.png",
  },
  {
    name: "Fresh Carrots",
    description: "Sweet, tender, and rich in nutrients.",
    price: "$2.99/kg",
    rating: 4,
    reviews: 125,
    image: "/assets/catalog/fresh-carrots.png",
  },
  {
    name: "Red Bell Peppers",
    description: "Sweet, vibrant with vitamins",
    price: "$6.49/kg",
    rating: 4,
    reviews: 59,
    image: "/assets/catalog/red-bell-peppers.png",
  },
  {
    name: "Farm Potatoes",
    description: "Hearty, and perfect for every meal",
    price: "$2.49/kg",
    rating: 3,
    reviews: 1259,
    image: "/assets/catalog/farm-potatoes.png",
  },
];

const eggProducts: CatalogProduct[] = [
  {
    name: "Free-Range Eggs",
    description: "Fresh eggs from free-range hens",
    price: "$5.99/dozen",
    rating: 5,
    reviews: 5,
    image: "/assets/catalog/free-range-eggs.png",
  },
  {
    name: "Organic Brown Eggs",
    description: "Naturally eggs from organically",
    price: "$6.99/dozen",
    rating: 5,
    reviews: 18,
    image: "/assets/catalog/organic-brown-eggs.png",
  },
  {
    name: "Large Farm Eggs",
    description: "Extra-large eggs perfect for cooking",
    price: "$7.49/dozen",
    rating: 4,
    reviews: 22,
    image: "/assets/catalog/large-farm-eggs.png",
  },
];

export const catalogProducts = {
  cheeses: cheeseProducts,
  dairy: dairyProducts,
  eggs: eggProducts,
  honey: honeyProducts,
  meat: meatProducts,
  vegetables: vegetableProducts,
};

export type CatalogCategory = keyof typeof catalogProducts;

export const productSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const findProduct = (slug: string) => {
  for (const [category, products] of Object.entries(catalogProducts)) {
    const product = products.find((item) => productSlug(item.name) === slug);
    if (product) return { category: category as CatalogCategory, product };
  }
  return null;
};
