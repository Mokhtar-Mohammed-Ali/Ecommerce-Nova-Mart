import { IBrands } from "@/_components/interFaces/Brandsinterface";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands`,
    {
      cache: "force-cache",
    }
  );
  const data: IBrands = await response.json();
  return NextResponse.json(data);
}
