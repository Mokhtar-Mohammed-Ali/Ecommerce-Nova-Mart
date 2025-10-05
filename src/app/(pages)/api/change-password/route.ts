import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = await getToken({ req, secret: process.env.AUTH_SECRET }); // 👈 لازم تبعت req

  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token.token as string, // 👈 التوكن اللي راجع من next-auth
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status });
  } catch {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
}
