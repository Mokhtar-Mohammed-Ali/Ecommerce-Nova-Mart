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



import { NextRequest, NextResponse } from "next/server";
import { IOrder } from "@/_components/interFaces/UserOrdersInterface";
import { getUserToken } from "@/helpers/getUserToken";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> } // 👈 خلي params Promise
) {
  const { userId } = await params; // 👈 هنا لازم await

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
