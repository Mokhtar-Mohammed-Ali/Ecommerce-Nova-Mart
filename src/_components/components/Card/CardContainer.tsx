import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import AddProductToCard from './AddProductToCard'
import Link from 'next/link'
import Image from 'next/image'
import RatingStars from './RatingStars'
import { IProduct } from '@/_components/interFaces/productsInterFace'
interface CardContainerProps {
  product: IProduct;
}
export default function CardContainer({ product }: CardContainerProps){
  return (
   <Card
  key={product.id}
  className="shadow-xl  dark:bg-gray-900 border border-black/[0.1] dark:border-white/[0.2] rounded-xl hover:shadow-lg transition overflow-hidden"
>

  <CardHeader className="p-0 relative">
    <Link href={`/products/${product.id}`}>
      <div className="w-full h-48 relative"> {/* حددنا ارتفاع للصورة */}
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
          className="object-contain md:object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
/>

      </div>
    </Link>
  </CardHeader>

  {/* التفاصيل */}
  <CardContent className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <CardTitle className="text-sm font-semibold text-amber-700 dark:text-white truncate">
        {product.title.split(" ", 2)}
      </CardTitle>
      <span className="text-xs text-amber-700">{product.brand?.name}</span>
    </div>

    <CardDescription className="text-xs text-gray-500 truncate">
      {product.category?.name}
    </CardDescription>

    {/* التقييم + السعر */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <RatingStars />
        <RatingStars />
        <RatingStars />
        <RatingStars />
        <span className="text-xs text-green-900">{product.ratingsAverage}</span>
      </div>

      <p className="text-sm font-bold dark:text-white mt-1">
        Price: {product.price} EGP
      </p>
    </div>
  </CardContent>

  {/* الفوتر (الزر) */}
  <CardFooter>
    <AddProductToCard product={product} />
  </CardFooter>
</Card>

  )
}
