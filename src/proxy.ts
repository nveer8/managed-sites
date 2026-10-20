import { NextResponse, type NextRequest } from "next/server";
import { domainResolver } from "@/engine/tenancy/default-resolver";
import { routeRequest } from "@/engine/tenancy/route-request";

export function proxy(request: NextRequest) {
  const decision = routeRequest(domainResolver, request.headers.get("host"), request.nextUrl.pathname);

  if (decision.kind === "rewrite") {
    const url = request.nextUrl.clone();
    url.pathname = decision.pathname;
    return NextResponse.rewrite(url);
  }
  if (decision.kind === "not-found") {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Everything except Next internals and static assets. robots.txt and
    // sitemap.xml are matched so tenant domains get their own versions.
    "/((?!_next/|favicon\\.ico|.*\\.(?:png|jpe?g|gif|svg|webp|avif|ico|css|js|map|woff2?)$).*)",
  ],
};
