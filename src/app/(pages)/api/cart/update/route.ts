import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function PUT(req: NextRequest) {
  const { productId, count } = await req.json();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token || !token.token) 
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    token: token.token,
  };

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ count }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
