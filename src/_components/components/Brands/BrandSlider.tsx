"use client";
import React from "react";
import Link from "next/link";
import { IBrands } from "../../interFaces/Brandsinterface";
import Image from "next/image";

interface BrandsSliderProps {
  brands: IBrands[];
}

export default function BrandsSlider({ brands }: BrandsSliderProps) {
  if (!brands || brands.length === 0) {
    return <p className="text-center text-white">No brands available.</p>;
  }

  const slides = [...brands, ...brands];
  const baseSecondsPerItem = 3.2;
  const duration = Math.max(18, Math.ceil(brands.length * baseSecondsPerItem));

  return (
    <div className="container mx-auto px-4 pt-8">
     

      {/* ====== MARQUEE SLIDER ====== */}
      <div className="overflow-hidden mb-6">
        <div
          className="marquee-track flex gap-3 items-center"
          style={{ animationDuration: `${duration}s` }}
        >
          {slides.map((brand, i) => (
            <Link
              key={`${brand._id}-${i}`}
              href={`/brands/${brand._id}`}
              className="marquee-slide min-w-[140px] md:min-w-[160px] rounded-xl overflow-hidden"
            >
              <div className="bg-white/5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center p-1">
                <Image
                width={400}
                height={400}
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-24 md:h-28 object-contain block"
                  loading="lazy"
                />
                <div className="text-center py-1 text-sm font-medium text-emerald-400">
                  {brand.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ====== Styles for marquee ====== */}
      <style>{`
        .marquee-track {
          display: flex;
          gap: 12px;
          align-items: center;
          width: max-content;
          animation-name: marquee-anim;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes marquee-anim {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-slide { flex: 0 0 auto; cursor: pointer; }

        @media (max-width: 768px) {
          .marquee-slide { min-width: 120px !important; }
          .marquee-track img { height: 90px !important; width: 120px !important; }
        }
        @media (max-width: 480px) {
          .marquee-slide { min-width: 100px !important; }
          .marquee-track img { height: 70px !important; width: 100px !important; }
        }
      `}</style>
    </div>
  );
}
