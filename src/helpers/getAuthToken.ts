
//  helpers/getAuthToken.ts
import { decode } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getAuthToken(req: NextRequest) {
  try {
    // قراءة الكوكي اللي فيها توكن الـ next-auth
    const cookieHeader = req.headers.get("cookie") || "";

    // دعم كل أنواع كوكي التوكن (الآمنة والعادية)
    const match =
      cookieHeader.match(/next-auth\.session-token=([^;]+)/) ||
      cookieHeader.match(/__Secure-next-auth\.session-token=([^;]+)/);

    const tokenValue = match ? match[1] : null;
    if (!tokenValue) return null;

    // فك تشفير التوكن اللي جوه next-auth
    const decodedToken = await decode({
      token: tokenValue,
      secret: process.env.AUTH_SECRET!,
    });

    // التوكن الحقيقي الخاص بالمستخدم
    const userToken = decodedToken?.token;
    return userToken || null;
  } catch (err) {
    console.error("❌ Error decoding token:", err);
    return null;
  }
}
