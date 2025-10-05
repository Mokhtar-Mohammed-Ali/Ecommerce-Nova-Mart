"use server";

import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { IOrder } from "@/_components/interFaces/UserOrdersInterface";

export async function GET(req: NextRequest) {
  try {
    
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.token) {
      return NextResponse.json({ statusMsg: "fail", message: "Unauthorized" }, { status: 401 });
    }

    // استخراج userId من الـ JWT
    let userId: string;
    try {
      const payload = JSON.parse(Buffer.from(token.token.split(".")[1], "base64").toString("utf8"));
      userId = payload.id;
    } catch (err) {
      console.error("Failed to decode ecommerce token:", err);
      return NextResponse.json({ statusMsg: "fail", message: "Invalid token" }, { status: 401 });
    }

    // جلب الأوردرات من API الخارجي
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
      headers: { token: token.token, "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json({ statusMsg: "fail", message: "Failed to fetch orders" }, { status: res.status });
    }

    const data: IOrder[] = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Get user orders error:", err);
    return NextResponse.json({ statusMsg: "fail", message: "Server error while fetching orders" }, { status: 500 });
  }
}
