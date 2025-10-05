

"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getUserToken() {
  const cookieStore =await cookies();

  // حاول تجيب الكوكي سواء كانت في dev أو production
  const tokenFromCookie =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!tokenFromCookie) {
    throw new Error("User token is missing in cookies");
  }

  // فك الـ JWT
  const decoded = await decode({
    token: tokenFromCookie,
    secret: process.env.AUTH_SECRET!,
  });

  const userToken = decoded?.token;
  if (!userToken) {
    throw new Error("Invalid user token inside JWT");
  }

  return userToken;
}
