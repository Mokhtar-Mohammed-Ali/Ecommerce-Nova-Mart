// // import { IBrands } from "@/_components/interFaces/Brandsinterface";
// // import { getUserToken } from "@/helpers/getUserToken";
// // import { NextResponse } from "next/server";

// // export async function GET(
  
// //   req: Request,
// //   { params }: { params: { id: string } }
// // ) {
// //   const token =await getUserToken()
// //   const { id } = params;

// //   const response = await fetch(
// //     `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
// //     {
// //       next: { revalidate: 100 * 60 },
// //       headers: {
// //         token: token+'',
// //       },
// //     }
// //   );

// //   const data: IBrands = await response.json();

// //   return NextResponse.json(data);
// // }


// import { IBrands } from "@/_components/interFaces/Brandsinterface";
// import { getUserToken } from "@/helpers/getUserToken";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(
//   req: NextRequest, // ✅ استعمل NextRequest مش Request
//   context: { params: { id: string } } // ✅ مفيش Promise هنا
// ) {
//   const token = await getUserToken();
//   const { id } = context.params;

//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
//     {
//       next: { revalidate: 100 * 60 },
//       headers: {
//         token: token + "",
//       },
//     }
//   );

//   const data: IBrands = await response.json();

//   return NextResponse.json(data);
// }


import { IBrands } from "@/_components/interFaces/Brandsinterface";
import { getUserToken } from "@/helpers/getUserToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // ✅ زي ما Next.js طالب
) {
  const { id } = await params; // ✅ await هنا
  const token = await getUserToken();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
    {
      next: { revalidate: 100 * 60 },
      headers: {
        token: token + "",
      },
    }
  );

  const data: IBrands = await response.json();
  return NextResponse.json(data);
}
