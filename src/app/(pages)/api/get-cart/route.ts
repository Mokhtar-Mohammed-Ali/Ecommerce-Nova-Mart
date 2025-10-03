
import { NextResponse } from "next/server";
import { cartResponse } from "@/_components/interFaces/CartInterFace";
import { decode } from "next-auth/jwt";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/next-auth.session-token=([^;]+)/);
    const tokenValue = match ? match[1] : null;

    if (!tokenValue) {
      return NextResponse.json({ data: { products: [] }, numOfCartItems: 0 }, { status: 200 });
    }

    const decodedToken = await decode({ token: tokenValue, secret: process.env.AUTH_SECRET! });
    const userToken = decodedToken?.token;

    if (!userToken) {
      return NextResponse.json({ data: { products: [] }, numOfCartItems: 0 }, { status: 200 });
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      headers: { token: userToken },
    });

    if (!response.ok) {
      return NextResponse.json({ data: { products: [] }, numOfCartItems: 0 }, { status: 200 });
    }

    const data: cartResponse = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching cart:", err);
    return NextResponse.json({ data: { products: [] }, numOfCartItems: 0 }, { status: 500 });
  }
}
