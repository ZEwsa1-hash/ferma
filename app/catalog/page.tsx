import { CatalogInteractive } from "./CatalogInteractive";
import { catalogProducts, categories, CatalogCategory } from "./data";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Products", href: "/#products" },
  { label: "Farm Life", href: "/#farm-life" },
  { label: "Experiences", href: "/#experiences" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

type CatalogPageProps = {
  searchParams?: Promise<{ category?: string }>;
};

const isCatalogCategory = (value: string | undefined): value is CatalogCategory =>
  typeof value === "string" && value in catalogProducts;

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const initialCategory = isCatalogCategory(params?.category)
    ? params.category
    : "cheeses";

  return (
    <CatalogInteractive
      initialCategory={initialCategory}
      categories={categories}
      navItems={navItems}
      productsByCategory={catalogProducts}
    />
  );
}
