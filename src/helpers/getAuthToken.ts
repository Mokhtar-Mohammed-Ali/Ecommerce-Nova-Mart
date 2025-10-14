import { decode } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getAuthToken(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(";").map((c) => c.trim());
    const tokenCookie = cookies.find(
      (c) =>
        c.startsWith("next-auth.session-token=") ||
        c.startsWith("__Secure-next-auth.session-token=")
    );

    const tokenValue = tokenCookie?.split("=")?.[1];
    if (!tokenValue) return null;

    const decodedToken = await decode({
      token: tokenValue,
      secret: process.env.AUTH_SECRET!,
    });

    return decodedToken?.token ?? null;
  } catch (err) {
    console.error("❌ Error decoding token:", err);
    return null;
  }
}















































