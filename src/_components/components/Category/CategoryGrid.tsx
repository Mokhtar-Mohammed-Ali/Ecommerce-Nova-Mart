"use client"
import { ICategory } from "@/_components/interFaces/CategoriesInterface";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  categories: ICategory[];
}

export default function CategoriesGrid({ categories }: Props) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((category, index) => (
        <motion.div
          key={category._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
          whileHover={{ scale: 1.02 }}
        >
          <Link href={`/categories/${category._id}`}>
            <Card className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer h-full flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                <Image
                width={400}
                height={400}
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4 text-center">
                  <h2 className="font-semibold text-lg">{category.name}</h2>
                </div>
              </CardContent>
            </Card>
          </Link>
          {/* <AddProductToCard product={}/> */}
        </motion.div>
      ))}
    </div>
  );
}
