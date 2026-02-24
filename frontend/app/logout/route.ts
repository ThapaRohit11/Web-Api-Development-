import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));
  const secure = process.env.NODE_ENV === "production";

  response.cookies.set("token", "", {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  response.cookies.set("user", "", {
    httpOnly: false,
    secure,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
