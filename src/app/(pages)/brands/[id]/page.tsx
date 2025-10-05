import CardContainer from "@/_components/components/Card/CardContainer";
import { IProduct } from "@/_components/interFaces/productsInterFace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Params {
  id: string;
}

export default async function Brand({ params }: { params: Params }) {
  const { id } = params;


  const brandResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  const brandData = await brandResponse.json();
  const brand = brandData.data;


  const productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`);
  const productsData = await productsResponse.json();
  const products: IProduct[] = productsData.data;

  return (
    <div className="container mx-auto px-4 py-10">

      <div className="flex justify-center mb-10">
        <Card className="max-w-md w-full shadow-lg rounded-2xl bg-white">
          <CardHeader className="text-center">
            <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden shadow-md">
              <Image
                src={brand.image}
                alt={brand.name || "Brand image"}
                fill
                className="object-contain p-2"
              />
            </div>
            <CardTitle className="mt-4 text-2xl font-bold text-gray-800">
              {brand.name}
            </CardTitle>
            <p className="text-sm text-gray-500">{brand.slug}</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 text-sm">
              Created At:{" "}
              <span className="font-medium">
                {new Date(brand.createdAt).toLocaleDateString()}
              </span>
            </p>
            <p className="text-gray-600 text-sm">
              Updated At:{" "}
              <span className="font-medium">
                {new Date(brand.updatedAt).toLocaleDateString()}
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* منتجات البراند */}
      <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products for this brand.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product: IProduct) => (
            <CardContainer key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
