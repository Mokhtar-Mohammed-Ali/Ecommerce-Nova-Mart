
import { ISubcategory } from "@/_components/interFaces/SubCategoriesInterface";
import Link from "next/link";

export default async function SubcategoriesPage() {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/subcategories?limit=50`,
      { next: { revalidate: 6000 } }
    );


    if (!res.ok) throw new Error("Failed to fetch subcategories");

    const json = await res.json();
    const subcategories: ISubcategory[] = json.data;

    return (
      <div className="container mx-auto p-6 ">
        <h1 className="text-3xl font-bold mb-6 text-center">All SubCategories</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subcategories.map((sub) => (
            <Link key={sub._id} href={`/subcategories/${sub._id}`}>
              <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-300">
                <h2 className="font-semibold text-lg mb-1 text-blue-600">{sub.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (err) {
    console.error("Error fetching subcategories:", err);
    return (
      <div className="container mx-auto p-6 text-red-600 text-center">
        Error loading subcategories.
      </div>
    );
  }
}
