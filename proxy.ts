import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}
export const config = {
  matcher: [
    /* * Match all request paths except for the ones starting with: * - _next/static (static files) * - _next/image (image optimization files) * - favicon.ico (favicon file) * Feel free to modify this pattern to include more paths. */ "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  console.log("proxy ran");
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value }) =>
            supabaseResponse.cookies.set(name, value),
          );
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const publicRoutes = ["/", "/sign-in", "/sign-up", "/auth/callback"];
  const isPublicRoute = publicRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith("/auth/"),
  );
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (
    user &&
    (request.nextUrl.pathname === "/sign-in" ||
      request.nextUrl.pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/notes", request.url));
  }
  // IMPORTANT: Avoid writing any logic between createServerClient and
  // // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // // issues with users being randomly logged out. // IMPORTANT: Don't remove getClaims()
  // /* const { data } = await supabase.auth.getClaims() const user = data?.claims */
  // // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // // creating a new response object with NextResponse.next() make sure to:
  // // 1. Pass the request in it, like so:
  // // const myNewResponse = NextResponse.next({ request })
  // // 2. Copy over the cookies, like so:
  // // myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // // 3. Change the myNewResponse object to fit your needs, but avoid changing
  // // the cookies!
  // // 4. Finally:
  // // return myNewResponse
  // // If this is not done, you may be causing the browser and server to go out
  // // of sync and terminate the user's session prematurely!
  return supabaseResponse;
}
