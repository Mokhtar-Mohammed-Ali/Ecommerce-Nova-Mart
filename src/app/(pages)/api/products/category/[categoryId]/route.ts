// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { categoryId: string } }
// ) {
//   const { categoryId } = params;


//   const res = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
//   );

//   const data = await res.json();
//   return NextResponse.json(data);
// }


import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  const { categoryId } = await params;

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
