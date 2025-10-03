
import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/helpers/getAuthToken";

export async function PUT(req: NextRequest) {
  try {
    const token = await getAuthToken(req);

    if (!token) {
      return NextResponse.json(
        { statusMsg: "fail", message: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/users/updateMe/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { statusMsg: "fail", message: "Server error" },
      { status: 500 }
    );
  }
}
