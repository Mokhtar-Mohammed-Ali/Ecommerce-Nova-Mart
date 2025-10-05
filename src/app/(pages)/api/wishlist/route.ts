
// import { NextResponse } from "next/server";
// import { cartResponse } from "@/_components/interFaces/CartInterFace";
// import { decode } from "next-auth/jwt";

// export async function GET(req: Request) {
//   try {
//     // قراءة الكوكيز من الريكويست
//     const cookieHeader = req.headers.get("cookie") || "";
//     const match = cookieHeader.match(/next-auth.session-token=([^;]+)/);
//     const tokenValue = match ? match[1] : null;

//     if (!tokenValue) {
//       return NextResponse.json({ error: "User token not found" }, { status: 401 });
//     }

//     // فك التوكن
//     const decodedToken = await decode({ token: tokenValue, secret: process.env.AUTH_SECRET! });
//     const userToken = decodedToken?.token;

//     if (!userToken) {
//       return NextResponse.json({ error: "Invalid user token" }, { status: 401 });
//     }

//     // جلب بيانات الـ wishlist من الـ backend
//     const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
//       headers: { token: userToken },
//     });

//     if (!response.ok) {
//       return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
//     }

//     const data: cartResponse = await response.json();
//     return NextResponse.json(data);
//   } catch (err) {
//     console.error("Error fetching wishlist:", err);
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { cartResponse } from "@/_components/interFaces/CartInterFace";

export async function GET(req: NextRequest) {
  try {
    // استخدام getToken بدل decode
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token?.token) {
      return NextResponse.json(
        { data: [], message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token: token.token },
    });

    if (!response.ok) {
      return NextResponse.json(
        { data: [], message: "Failed to fetch wishlist" },
        { status: 500 }
      );
    }

    const data: cartResponse = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    return NextResponse.json({ data: [], message: "Internal server error" }, { status: 500 });
  }
}
