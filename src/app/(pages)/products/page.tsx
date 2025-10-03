
import { IProduct } from "@/_components/interFaces/productsInterFace";
import { ICategory } from "@/_components/interFaces/CategoriesInterface";

import CategorySlider from "@/_components/components/Category/CategorySlider";
import CardContainer from "@/_components/components/Card/CardContainer";

export default async function Products() {
  // products
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products`, {
    next: { revalidate: 6000 },
  });
  const { data: products }: { data: IProduct[] } = await response.json();

  // categories
  const CategoriesResponse = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    { next: { revalidate: 100 * 60 } }
  );
  const { data: categories }: { data: ICategory[] } =
    await CategoriesResponse.json();

  return (
    <>
      <h1 className="text-4xl font-bold dark:text-amber-500 text-center p-8">
        Our Products
      </h1>

      <div className="container mx-auto px-4 mb-8">
        <CategorySlider categories={categories} />
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-4">
        {products.map((product) => (
          <CardContainer product={product} key={product._id}/>
        ))}
      </div>
    </>
  );
}
