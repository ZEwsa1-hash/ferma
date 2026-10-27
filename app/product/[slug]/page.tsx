import { notFound } from "next/navigation";
import { catalogProducts, findProduct, productSlug } from "../../catalog/data";
import { ProductPageInteractive, ProductPageProduct } from "../ProductPageInteractive";
import { product as freshMilk } from "../page";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Farm Life", href: "/#farm-life" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

const categoryDetails: Record<string, string[]> = {
  cheeses: ["Origin: Velora Farm", "Made From: Farm Fresh Milk", "Storage: Keep Refrigerated", "Craft: Small Batch"],
  dairy: ["Origin: Velora Farm", "Made From: Farm Fresh Milk", "Storage: Keep Refrigerated", "Craft: Freshly Made"],
  meat: ["Origin: Velora Farm", "Raised: With Care", "Storage: Keep Refrigerated", "Preparation: Cook Thoroughly"],
  honey: ["Origin: Velora Farm", "Ingredients: Pure Honey", "Storage: Keep in a Cool, Dry Place", "Harvest: Seasonal"],
  vegetables: ["Origin: Velora Farm", "Harvest: Seasonal", "Storage: Keep Cool", "Grown: On Our Farm"],
  eggs: ["Origin: Velora Farm", "Raised: Pasture Access", "Storage: Keep Refrigerated", "Collected: Fresh"],
};

const categoryDescriptions: Record<string, string> = {
  cheeses: "Made in small batches from farm-fresh milk and aged for a distinctive natural flavor.",
  dairy: "Prepared with fresh milk from our farm and handled with care from start to finish.",
  meat: "Raised with care on our farm and selected for freshness, texture, and flavor.",
  honey: "Collected from our hives and prepared to preserve its natural aroma and sweetness.",
  vegetables: "Grown in our fields and harvested with care at the right moment.",
  eggs: "Gathered from our farm hens for fresh, flavorful meals.",
};

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.values(catalogProducts).flat().map((item) => ({ slug: productSlug(item.name) }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const found = findProduct(slug);
  if (!found) notFound();

  const { category, product: catalogProduct } = found;
  const product: ProductPageProduct = slug === "fresh-milk"
    ? { ...freshMilk, category }
    : {
      name: catalogProduct.name,
      description: `${catalogProduct.description}. ${categoryDescriptions[category]}`,
      price: catalogProduct.price,
      rating: catalogProduct.rating,
      reviews: catalogProduct.reviews,
      category,
      images: [{ src: catalogProduct.image, alt: catalogProduct.name }],
      details: categoryDetails[category],
    };
  const relatedProducts = catalogProducts[category]
    .filter((item) => item.name !== catalogProduct.name)
    .slice(0, 4);

  return <ProductPageInteractive key={slug} navItems={navItems} product={product} relatedProducts={relatedProducts} />;
}
