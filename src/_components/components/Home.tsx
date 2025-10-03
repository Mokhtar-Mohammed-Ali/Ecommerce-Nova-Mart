"use client";

import React from "react";
import { SparklesCore } from "../ui/sparkles";
import { Button } from "@/_components/ui/moving-border";
import Link from "next/link";

export function SparklesPreview({ headerContent, subHeader }: { headerContent: string; subHeader: string }) {
  return (
    <div className="min-h-screen relative w-full bg-sky-900 dark:bg-neutral-950 text-gray-800 dark:text-gray-300 flex flex-col items-center justify-center overflow-hidden gap-5 px-4">

      <div className="w-full absolute inset-0 mim-h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-screen"
          particleColor="#FFFFFF"
        />
      </div>

     
      <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-amber-200 mb-3 z-10">
        <span className="text-amber-100 block mb-3">{headerContent}</span>
      {subHeader}
      </h1>

     
      <div className="flex flex-col sm:flex-row gap-4 z-10">
        <Link href="/products">
          <Button className="capitalize cursor-pointer text-amber-300">
            Browse our products
          </Button>
        </Link>
        <Link href="/about">
          <Button className="capitalize cursor-pointer text-emerald-300">
            Learn More
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-white z-10">
        <div className="flex flex-col items-center">
          <span className="text-3xl">🚚</span>
          <p className="mt-2">Free Shipping</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl">🔒</span>
          <p className="mt-2">Secure Payments</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl">🛍️</span>
          <p className="mt-2">Wide Collection</p>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl">💬</span>
          <p className="mt-2">24/7 Support</p>
        </div>
      </div>
    </div>
  );
}
