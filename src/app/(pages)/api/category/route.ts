import { NextResponse } from "next/server";
import { ICategory } from "@/_components/interFaces/CategoriesInterface";

export async function GET() {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories`,
    {
      cache: "force-cache",
    }
  );
  const data:ICategory[] = await response.json();
  return NextResponse.json(data);
}
