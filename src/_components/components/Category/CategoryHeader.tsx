"use client";

import Image from "next/image";
import React from "react";

interface CategoryHeaderProps {
  name: string;
  image: string;
}

export default function CategoryHeader({ name, image }: CategoryHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6 p-4 border-b">
      <Image
      width={400}
      height={400}
        src={image}
        alt={name}
        className="w-16 h-16 object-cover rounded-full shadow-md"
      />
      <h1 className="text-2xl font-bold dark:text-amber-300">{name}</h1>
    </div>
  );
}
