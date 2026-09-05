import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (!process.env.SANITY_PREVIEW_SECRET || url.searchParams.get("secret") !== process.env.SANITY_PREVIEW_SECRET) return new NextResponse("Invalid preview token", { status: 401 });
  const redirectPath = url.searchParams.get("slug") ?? "/";
  if (!redirectPath.startsWith("/") || redirectPath.startsWith("//")) return new NextResponse("Invalid preview path", { status: 400 });
  (await draftMode()).enable();
  return NextResponse.redirect(new URL(redirectPath, url.origin));
}

