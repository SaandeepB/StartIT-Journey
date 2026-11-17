import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_EDIT, COOKIE_VIEW, verifyToken } from "@/lib/auth";

/**
 * Optional viewer gate. When VIEW_PASSWORD is set, every page and content API
 * requires a valid view (or edit) cookie; otherwise visitors are redirected to
 * /unlock. Without VIEW_PASSWORD the site is unlisted but open to anyone with
 * the link.
 */
export async function middleware(req: NextRequest) {
  if (!process.env.VIEW_PASSWORD) return NextResponse.next();

  const { pathname, search } = req.nextUrl;
  if (pathname.startsWith("/unlock") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const view = req.cookies.get(COOKIE_VIEW)?.value;
  const edit = req.cookies.get(COOKIE_EDIT)?.value;
  if ((await verifyToken(view, "view")) || (await verifyToken(edit, "edit"))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = req.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = `?next=${encodeURIComponent(pathname + search)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|icon.svg|fonts/|.*\\.(?:png|jpg|jpeg|svg|webp|ico|woff2?)$).*)"],
};
