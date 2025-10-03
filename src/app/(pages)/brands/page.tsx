"use client";
import Brands from '@/_components/components/Brands/Brands';
import React, { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import BrandsSlider from '@/_components/components/Brands/BrandSlider';
import { IBrands } from '@/_components/interFaces/Brandsinterface';

export default function BrandsPage() {
  const [brands, setBrands] = useState<IBrands[]>([]);
  const [loading, setLoading] = useState(false);

  async function getBrands() {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/brands`);
      const { data }: { data: IBrands[] } = await res.json();
      setBrands(data || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching brands:", err);
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto px-4 pt-8 ">
      <h1 className="text-3xl font-bold mb-6 text-center dark:text-amber-300">Brands</h1>
      <BrandsSlider brands={brands} />
      <div className="mt-10">
        <Brands brands={brands} />
      </div>
    </div>
  );
}
