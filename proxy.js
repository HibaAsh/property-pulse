import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const signInUrl = new URL("/api/auth/signin", request.url);

    signInUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.href
    );

    return Response.redirect(signInUrl);
  }

  return;
}

export const config = {
  matcher: [
    "/profile",
    "/messages",
    "/properties/add",
    "/properties/saved",
  ],
};