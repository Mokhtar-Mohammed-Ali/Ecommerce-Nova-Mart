// import { NextResponse } from "next/server";
// import { IOrder } from "@/_components/interFaces/UserOrdersInterface";
// import { getUserToken } from "@/helpers/getUserToken";

// export async function GET(
//   req: Request, 
//   { params }: { params: { userId: string } }
// ) {
//   const { userId } = await params;
//   const token =await getUserToken()

//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
//     {
//       headers: {
//         token: token+''
//       },
//     }
//   );

//   const data: IOrder[] = await response.json();

//   return NextResponse.json(data);
// }


import { NextResponse, NextRequest } from "next/server";
import { IOrder } from "@/_components/interFaces/UserOrdersInterface";
import { getUserToken } from "@/helpers/getUserToken";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> } // ✅ Next.js 15 بيخلي params Promise
) {
  const { userId } = await context.params; // ✅ هنا فعلاً نستخدم await

  const token = await getUserToken();

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      headers: {
        token: token + "",
      },
    }
  );

  const data: IOrder[] = await response.json();

  return NextResponse.json(data);
}
