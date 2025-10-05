
import { IBrands } from "@/_components/interFaces/Brandsinterface";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ زي ما Next.js طالب
) {
  const { id } = await params; // ✅ await هنا

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    {
      next: { revalidate: 100 * 60 },
   
    }
  );

  const data: IBrands = await response.json();
  return NextResponse.json(data);
}
