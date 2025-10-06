"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image";

export default function SliderImages({images,altContect}) {
  return (
   <Carousel className="w-full max-w-md mx-auto relative"
              opts={{
     
      loop: true,
    }}
     plugins={[
          Autoplay({
            delay: 1000,
          }),
        ]}>
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem
                    key={index}
                    className="flex justify-center items-center"
                  >
                    <Image
                      src={img}
                      alt={altContect}
                      width={500}
                      height={500}
                       priority={true}
                      className="object-contain w-full h-[300px] sm:h-[400px]"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
  
              {/* الأزرار تحت الصور */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
                <CarouselPrevious className="relative translate-x-0" />
                <CarouselNext className="relative translate-x-0" />
              </div>
            </Carousel>
  )
}
