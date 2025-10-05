import { ICategory } from "@/_components/interFaces/CategoriesInterface";
import CategorySlider from "@/_components/components/Category/CategorySlider";
import CategoriesGrid from "@/_components/components/Category/CategoryGrid";

export default async function CategoriesPage() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`, {
    next: { revalidate: 600 },
  });
  const { data: categories }: { data: ICategory[] } = await res.json();

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-amber-400">
        Categories
      </h1>

      <CategorySlider categories={categories} />

      <CategoriesGrid categories={categories} />

    </div>
  );
}
