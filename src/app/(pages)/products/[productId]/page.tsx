import { Params } from "next/dist/server/request/params";


import { IProduct } from "@/_components/interFaces/productsInterFace";
import SliderImages from "@/_components/components/Card/SliderImages";

import {
  Card,
  CardContent,
  CardDescription,
  
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RatingStars from "@/_components/components/Card/RatingStars";
import AddProductToCard from "@/_components/components/Card/AddProductToCard";

export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`
  );
  const { data: product }: { data: IProduct } = await response.json();

  return (
    <div className="h-screen container mx-auto flex items-center justify-center">
      <Card className="grid md:grid-cols-3 items-center">
       
        <div className="md:col-span-1 100 py-5">
         <SliderImages images={product.images} altContect={product.title}/>
        </div>

       
        <div className="md:col-span-2 bg-gray-100 py-5">
          <CardHeader>
            <div className="flex items-center justify-between space-y-3">
              <CardDescription>{product.brand.name}</CardDescription>
              <CardDescription>{product.category.name}</CardDescription>
            </div>
            <CardTitle className="text-2xl">{product.title}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <RatingStars />
                <RatingStars />
                <RatingStars />
                <RatingStars />
                <span className="text-xs text-gray-600">
                  {product.ratingsAverage}
                </span>
                <p>({product.ratingsQuantity})</p>
              </div>
              <div className="flex flex-col mt-3 items-center">
                <p>
                  EGP <span className="text-green-500">{product.price}</span>
                </p>
                <p>
                  available{" "}
                  <span className=" text-green-500">({product.quantity})</span>
                </p>
              </div>
            </div>
          </CardContent>

          <AddProductToCard product={product}/>
        </div>
      </Card>
    </div>
  );
}































