import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { cartResponse } from "@/_components/interFaces/CartInterFace";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token?.token) {
      return NextResponse.json(
        { data: { products: [] }, numOfCartItems: 0 },
        { status: 200 }
      );
    }

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
