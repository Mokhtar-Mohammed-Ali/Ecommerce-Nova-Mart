
import CardContainer from "@/_components/components/Card/CardContainer";
import { IProduct } from "@/_components/interFaces/productsInterFace";
import { ISubcategory } from "@/_components/interFaces/SubCategoriesInterface";
import { Params } from "next/dist/server/request/params";

export default async function SubcategoryDetailPage({ params }: { params: Params }) {
  const { slugId } = params;

  // Subcategory
  const resSub = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${slugId}`,
    { cache: "no-store" }
  );

  const { data: sub }: { data: ISubcategory } = await resSub.json();

  // Subcategory
  const resProducts = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?subcategory[in]=${sub._id}`,
    { cache: "no-store" }
  );
  const { data: products }: { data: IProduct[] } = await resProducts.json();

  const isEmpty = !sub || !products || products.length === 0;

  return (
    <div className="container mx-auto p-6 flex flex-col justify-center min-h-screen">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-white/10 rounded-lg border border-white/20">
          <h1 className="text-4xl font-bold mb-4 dark:text-amber-300">
            {sub?.name || "Unknown Subcategory"}
          </h1>
          <p className="dark:text-emerald-400 text-lg text-center">
            This subcategory currently has no products available.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6 text-center dark:text-amber-300">
            {sub.name}
          </h1>
         
          

 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 ">
  {products && products.length > 0 ? (
  products.map((product) => (
    <div key={product._id} >
      
      <CardContainer product={product}/>
    </div>
  ))
) : (
  <h3 className="text-center col-span-full text-gray-900">This subcategory has no products</h3>
)}

</div>


        </>
      )}
    </div>
  );
}
