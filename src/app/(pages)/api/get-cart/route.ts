
// import { NextResponse } from "next/server";
// import { cartResponse } from "@/_components/interFaces/CartInterFace";
// import { decode } from "next-auth/jwt";

// export async function GET(req: Request) {
  
//   try {
//     const cookieHeader = req.headers.get("cookie") || "";
//     const match = cookieHeader.match(/next-auth.session-token=([^;]+)/);
//     const tokenValue = match ? match[1] : null;

//     if (!tokenValue) {
//       return NextResponse.json({ data: { products: [] }, numOfCartItems: 0 }, { status: 200 });
//     }

//     const decodedToken = await decode({ token: tokenValue, secret: process.env.AUTH_SECRET! });
//     const userToken = decodedToken?.token;

//     if (!userToken) {
//       return NextResponse.json({ data: { products: [] }, numOfCartItems: 0 }, { status: 200 });
//     }

//     const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
//       headers: { token: userToken },
//     });

//     if (!response.ok) {
//       return NextResponse.json({ data: { products: [] }, numOfCartItems: 0 }, { status: 200 });
//     }

//     const data: cartResponse = await response.json();
//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("Error fetching cart:", err);
//     return NextResponse.json({ data: { products: [] }, numOfCartItems: 0 }, { status: 500 });
//   }

  
// }


import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { cartResponse } from "@/_components/interFaces/CartInterFace";

export async function GET(req: NextRequest) {
  try {
    // استخدام getToken مع NextRequest
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token?.token) {
      // لو مفيش توكن → نرجع كارت فاضي
      return NextResponse.json(
        { data: { products: [] }, numOfCartItems: 0 },
        { status: 200 }
      );
    }

    // fetch البيانات من الباك اند الخارجي
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: token.token },
    });

    if (!res.ok) {
      return NextResponse.json(
        { data: { products: [] }, numOfCartItems: 0 },
        { status: 200 }
      );
    }

    const data: cartResponse = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching cart:", err);
    return NextResponse.json(
      { data: { products: [] }, numOfCartItems: 0 },
      { status: 500 }
    );
  }
}
