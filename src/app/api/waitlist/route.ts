import { NextRequest, NextResponse } from "next/server";

// Waitlist endpoint. This is a pre-launch landing page with no database
// attached, so signups are validated and acknowledged but not persisted.
// The UI deliberately shows no signup counter — we don't fabricate social
// proof. Wire a real store (Postgres/KV/an email service) here to persist.

// In-memory rate limit (per process) — good enough for a landing page.
const hits = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 min
const MAX = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.first > WINDOW_MS) {
    hits.set(ip, { count: 1, first: now });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a few minutes." },
      { status: 429 }
    );
  }

  let email: string;
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (email.length > 254) {
    return NextResponse.json({ error: "Email is too long." }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

// No counter is exposed — the front end hides the "already on the list" pill
// when the total is absent, so no fake numbers are shown.
export async function GET() {
  return NextResponse.json({});
}
