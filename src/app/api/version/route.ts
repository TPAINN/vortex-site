import { NextResponse } from "next/server";

// Honest "coming soon" state — mirrors the original Vortex behavior.
// When a real, signed APK exists, set these to live URLs and the
// download buttons on the site will activate automatically.
export async function GET() {
  return NextResponse.json(
    {
      versionName: null,
      apkUrl: null,
      apkUrlArm32: null,
    },
    {
      headers: { "Cache-Control": "no-store" },
    }
  );
}
