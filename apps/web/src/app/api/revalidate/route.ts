import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { routeForDocument } from "@/content/routes";

export async function POST(request: Request) {
  if (!process.env.SANITY_REVALIDATE_SECRET || request.headers.get("x-revalidate-secret") !== process.env.SANITY_REVALIDATE_SECRET) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await request.json() as { _type?: string; slug?: { current?: string } };
  const path = routeForDocument(body._type ?? "", body.slug?.current);
  if (path) revalidatePath(path); revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, path });
}

