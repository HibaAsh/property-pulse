import { getToken } from "next-auth/jwt";

export async function proxy(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set(
      "callbackUrl",
      request.nextUrl.pathname
    );

    return Response.redirect(loginUrl);
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