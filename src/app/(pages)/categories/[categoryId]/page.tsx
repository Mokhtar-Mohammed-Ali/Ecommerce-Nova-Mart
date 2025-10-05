
import { IProduct } from "@/_components/interFaces/productsInterFace";
import { ICategory } from "@/_components/interFaces/CategoriesInterface";
import React from "react";
import { Params } from "next/dist/server/request/params";
import CategoryHeader from "@/_components/components/Category/CategoryHeader";
import CardContainer from "@/_components/components/Card/CardContainer";

export default async function CategoryPage({ params }: { params: Params }) {
  const { categoryId } = params;

  try {
    const resCategory = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`,
      { cache: "no-store" }
    );
    if (!resCategory.ok) throw new Error("Failed to fetch category");

    const { data: category }: { data: ICategory } = await resCategory.json();

    const resProducts = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
      { cache: "no-store" }
    );
    if (!resProducts.ok) throw new Error("Failed to fetch products");

    const { data: products }: { data: IProduct[] } = await resProducts.json();

    return (
      <div className="container mx-auto p-6 min-h-screen">
        <CategoryHeader name={category.name} image={category.image} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product._id}>
                <CardContainer product={product} />
              </div>
            ))
          ) : (
            <h3 className="text-center col-span-full text-gray-900 dark:text-gray-200">
              This Category has no products
            </h3>
          )}
        </div>
      </div>
    );
  } catch (err) {
    console.error("Error fetching category/products:", err);
    return (
      <div className="p-6 text-red-600 dark:text-red-400 text-center">
        Error loading category page. Please try again later.
      </div>
    );
  }
}
