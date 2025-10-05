
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { UserAddressResponse } from "@/_components/interFaces/AdressesInterFace";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token?.token) {
      return NextResponse.json(
        { data: [], message: "Unauthorized" },
        { status: 401 }
      );
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
      headers: { token: token.token },
    });

    if (!response.ok) {
      return NextResponse.json(
        { data: [], message: "Failed to fetch addresses" },
        { status: 500 }
      );
    }

    const data: UserAddressResponse = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching addresses:", err);
    return NextResponse.json({ data: [], message: "Internal server error" }, { status: 500 });
  }
}
