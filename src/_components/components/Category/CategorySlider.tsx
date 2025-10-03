"use client";

import Link from "next/link";
import { ICategory } from "@/_components/interFaces/CategoriesInterface";
import Image from "next/image";

interface CategorySliderProps {
  categories: ICategory[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  if (!categories || categories.length === 0) return null;

  // نكرر الآراي عشان الانيميشن يكون حلقي (infinite loop)
  const slides = [...categories, ...categories];

  // مدة الانيميشن حسب عدد العناصر
  const baseSecondsPerItem = 3.2;
  const duration = Math.max(18, Math.ceil(categories.length * baseSecondsPerItem));

  return (
    <div className="mb-8 container mx-auto px-4">
      <div className="overflow-hidden">
        <div
          className="marquee-track flex gap-3 items-center"
          style={{ animationDuration: `${duration}s` }}
        >
          {slides.map((cat, i) => (
            <Link
              key={`${cat._id}-${i}`}
              href={`/categories/${cat._id}`}
              className="marquee-slide min-w-[140px] md:min-w-[160px] rounded-xl overflow-hidden"
            >
              <div className="bg-white/5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center p-1">
                <Image
                width={400}
                height={400}
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-24 md:h-28 object-cover block rounded-md"
                  loading="lazy"
                />
                <div className="text-center py-1 text-sm font-medium text-emerald-400">
                  {cat.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ====== Styles ====== */}
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

        .marquee-slide {
          flex: 0 0 auto;
          cursor: pointer;
        }

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
