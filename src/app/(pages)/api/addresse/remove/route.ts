import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token || !token.token)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const headers: HeadersInit = { token: token.token };

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
    method: "DELETE",
    headers,
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
