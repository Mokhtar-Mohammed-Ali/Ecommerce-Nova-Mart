import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoute = [
  "/cart",
  "/profile",
  "/allorders",
  "/address",
  "/payment",
];
const AuthRoute = ["/login", "/register"];
export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  if (protectedRoute.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("callBackUrl", req.nextUrl.href);
      return NextResponse.redirect(redirectUrl);
    }
  }
  if (AuthRoute.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }
  return NextResponse.next();
}
