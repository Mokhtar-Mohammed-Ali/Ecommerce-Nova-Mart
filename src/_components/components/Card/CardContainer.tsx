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
//    <Card
//   key={product.id}
//   className="shadow-xl  dark:bg-gray-900 border border-black/[0.1] dark:border-white/[0.2] rounded-xl hover:shadow-lg transition overflow-hidden"
// >

//   <CardHeader className="p-0 relative">
//     <Link href={`/products/${product.id}`}>
//       <div className="w-full h-48 relative"> 
//         <Image
//           src={product.imageCover}
//           alt={product.title}
//           fill
//           className="object-contain md:object-cover"
//           sizes="(max-width: 768px) 100vw, 400px"
// />

//       </div>
//     </Link>
//   </CardHeader>

//   {/* التفاصيل */}
//   <CardContent className="flex flex-col gap-2">
//     <div className="flex justify-between items-center">
//       <CardTitle className="text-sm font-semibold text-amber-700 dark:text-white truncate">
//         {product.title.split(" ", 2)}
//       </CardTitle>
//       <span className="text-xs text-amber-700">{product.brand?.name}</span>
//     </div>

//     <CardDescription className="text-xs text-gray-500 truncate">
//       {product.category?.name}
//     </CardDescription>

//     {/* التقييم + السعر */}
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-1">
//         <RatingStars />
//         <RatingStars />
//         <RatingStars />
//         <RatingStars />
//         <span className="text-xs text-green-900">{product.ratingsAverage}</span>
//       </div>

//       <p className="text-sm font-bold dark:text-white mt-1">
//         Price: {product.price} EGP
//       </p>
//     </div>
//   </CardContent>

//   {/* الفوتر (الزر) */}
//   <CardFooter>
//     <AddProductToCard product={product} />
//   </CardFooter>
// </Card>

<Card
  key={product.id}
  className="shadow-xl dark:bg-gray-900 border border-black/[0.1] dark:border-white/[0.2] rounded-xl hover:shadow-2xl transition duration-300 overflow-hidden"
>
  {/* الصورة */}
  <CardHeader className="p-0 relative">
    <Link href={`/products/${product.id}`}>
      <div className="z-0 relative w-full aspect-[4/4] bg-white dark:bg-gray-800">
        <Image
          src={product.imageCover}
          alt={product.title}
          fill
           priority={true}
          className="z-0 md:object-cover object-contain p-2 md:p-0 transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    </Link>
  </CardHeader>

  {/* التفاصيل */}
  <CardContent className="flex flex-col gap-2 px-3 py-4">
    <div className="flex justify-between items-center">
      <CardTitle className="text-sm font-semibold text-amber-700 dark:text-white truncate">
        {product.title.split(" ", 2)}
      </CardTitle>
      <span className="text-xs text-amber-700 dark:text-gray-300">
        {product.brand?.name}
      </span>
    </div>

    <CardDescription className="text-xs text-gray-600 dark:text-gray-400 truncate">
      {product.category?.name}
    </CardDescription>

    <div className="flex items-center justify-between mt-1">
      <div className="flex items-center gap-1">
        <RatingStars />
        
        <span className="text-xs text-green-900 dark:text-green-400">
          {product.ratingsAverage}
        </span>
      </div>

      <p className="text-sm font-bold text-amber-700 dark:text-white">
      {product.price} EGP
      </p>
    </div>
  </CardContent>

  {/* الزر */}
  <CardFooter className="md:px-0 px-3 flex items-center justify-center">
    <AddProductToCard product={product} />
  </CardFooter>
</Card>


  )
}
