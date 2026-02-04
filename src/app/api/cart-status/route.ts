import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientCartId = searchParams.get("clientCartId")?.trim();

  if (!clientCartId) {
    return NextResponse.json(
      { ok: false, error: "clientCartId is required." },
      { status: 400 },
    );
  }

  if (!redis) {
    return NextResponse.json(
      { ok: false, error: "Redis not configured." },
      { status: 500 },
    );
  }

  const completionKey = `rose-sugar:cart:completed:${clientCartId}`;
  const record = await redis.get(completionKey);

  return NextResponse.json({ ok: true, completed: Boolean(record) });
}
