
// //  helpers/getAuthToken.ts
// import { decode } from "next-auth/jwt";
// import { NextRequest } from "next/server";

// export async function getAuthToken(req: NextRequest) {
//   try {
//     // قراءة الكوكي اللي فيها توكن الـ next-auth
//     const cookieHeader = req.headers.get("cookie") || "";

//     // دعم كل أنواع كوكي التوكن (الآمنة والعادية)
//     const match =
//       cookieHeader.match(/next-auth\.session-token=([^;]+)/) ||
//       cookieHeader.match(/__Secure-next-auth\.session-token=([^;]+)/);

//     const tokenValue = match ? match[1] : null;
//     if (!tokenValue) return null;

//     // فك تشفير التوكن اللي جوه next-auth
//     const decodedToken = await decode({
//       token: tokenValue,
//       secret: process.env.AUTH_SECRET!,
//     });

//     // التوكن الحقيقي الخاص بالمستخدم
//     const userToken = decodedToken?.token;
//     return userToken || null;
//   } catch (err) {
//     console.error("❌ Error decoding token:", err);
//     return null;
//   }
// }

// import { decode } from "next-auth/jwt";
// import { NextRequest } from "next/server";

// export async function getAuthToken(req: NextRequest) {
//   try {
//     const cookieHeader = req.headers.get("cookie") || "";

//     // استخرج الكوكي بغض النظر عن الاسم
//     const cookies = cookieHeader.split(";").map(c => c.trim());
//     const tokenCookie = cookies.find(c =>
//       c.startsWith("next-auth.session-token=") ||
//       c.startsWith("__Secure-next-auth.session-token=")
//     );

//     const tokenValue = tokenCookie?.split("=")[1];
//     if (!tokenValue) return null;

//     const decodedToken = await decode({
//       token: tokenValue,
//       secret: process.env.AUTH_SECRET!,
//     });

//     return decodedToken?.token || null;
//   } catch (err) {
//     console.error("❌ Error decoding token:", err);
//     return null;
//   }
// }





import { decode } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getAuthToken(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(";").map(c => c.trim());
    const tokenCookie = cookies.find(c =>
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
