// components/BrandsSlider.tsx
import React from "react";
import { IBrands } from "../../interFaces/Brandsinterface";
import Link from "next/link";
import Image from "next/image";
interface BrandsSliderProps {
  brands: IBrands[];
}

export default function Brands({ brands }: BrandsSliderProps) {
  if (!brands || brands.length === 0) {
    return (
      <p className="text-center text-white">No brands available.</p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  dark:bg-neutral-950 text-gray-800 dark:text-gray-300">
      {brands.map((brand) => (
        <Link
          key={brand._id}
          href={`/brands/${brand._id}`}
          className="bg-white dark:bg-gray-900 border p-4 rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center"
        >
          <Image
            width={400}
            height={400}
            src={brand.image}
            alt={brand.name}
            className="w-full h-40 object-contain mb-2 rounded-md"
          />
          <h2 className="font-semibold text-lg text-emerald-400 text-center">
            {brand.name}
          </h2>
        </Link>
      ))}
    </div>
  );
}
