import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const { productId } = await req.json();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token || !token.token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  // نصنع headers بشكل آمن
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    token: token.token, // دلوقتي TypeScript متأكد إنها string
  };

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    headers,
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
