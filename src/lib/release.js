// ── Vortex APK release config ─────────────────────────────────────────────
// The download is 100% static + client-side. The APK itself is meant to be
// hosted on **GitHub Releases** — free, CDN-backed, no server, NO database,
// no free-tier that can suspend. When a signed build is published, point these
// at the release asset URLs, e.g.:
//
//   https://github.com/TPAINN/vortex/releases/latest/download/vortex-arm64-v8a.apk
//   https://github.com/TPAINN/vortex/releases/latest/download/vortex-armeabi-v7a.apk
//   https://github.com/TPAINN/vortex/releases/latest/download/vortex-universal.apk
//
// Leave every field null and the site stays in its honest "coming soon" state.
// Set at least one and the Android download button activates automatically.
const VERSION = "2.1.0";
const REL = `https://github.com/TPAINN/vortex-site/releases/download/v${VERSION}`;
export const RELEASE = {
  versionName: VERSION,
  apkArm64: `${REL}/Vortex-${VERSION}-arm64.apk`,      // arm64-v8a — most phones/tablets since ~2017
  apkArm32: `${REL}/Vortex-${VERSION}-arm32.apk`,      // armeabi-v7a — older 32-bit devices
  apkUniversal: `${REL}/Vortex-${VERSION}-universal.apk`, // fat APK, runs on any ABI (fallback)
};

export const hasBuild = () =>
  !!(RELEASE.apkArm64 || RELEASE.apkArm32 || RELEASE.apkUniversal);

// Pick the best APK for a detected architecture, falling back sensibly.
export function apkFor(arch) {
  if (arch === "arm32" && RELEASE.apkArm32) return RELEASE.apkArm32;
  if (arch === "arm64" && RELEASE.apkArm64) return RELEASE.apkArm64;
  return RELEASE.apkUniversal || RELEASE.apkArm64 || RELEASE.apkArm32 || null;
}

// Detect the visitor's OS (and a coarse Android arch) synchronously from the
// user agent. Good enough to decide "Android vs not" and which copy to show.
export function detectDevice() {
  if (typeof navigator === "undefined") {
    return { os: "other", arch: null, label: "your device", isAndroid: false };
  }
  const ua = navigator.userAgent || "";
  const isAndroid = /android/i.test(ua);
  const isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  let os = "other";
  let label = "your device";
  if (isAndroid) { os = "android"; label = "Android"; }
  else if (isIOS) { os = "ios"; label = "iPhone / iPad"; }
  else if (/windows|win32|win64/i.test(ua)) { os = "windows"; label = "Windows"; }
  else if (/macintosh|mac os x/i.test(ua)) { os = "mac"; label = "macOS"; }
  else if (/linux|x11/i.test(ua)) { os = "linux"; label = "Linux"; }

  let arch = null;
  if (isAndroid) {
    if (/aarch64|arm64|x86_64/i.test(ua)) arch = "arm64";
    else if (/armv7|armv8|arm(?!64)| arm;|x86/i.test(ua)) arch = "arm32";
    else arch = "arm64"; // modern Android is overwhelmingly 64-bit
  }
  return { os, arch, label, isAndroid };
}

// Refine the Android architecture using UA Client Hints where available
// (Chromium). Resolves to "arm64" | "arm32", defaulting to arm64.
export async function resolveAndroidArch(fallback = "arm64") {
  try {
    const uaData = navigator.userAgentData;
    if (uaData?.getHighEntropyValues) {
      const { architecture, bitness } = await uaData.getHighEntropyValues([
        "architecture",
        "bitness",
      ]);
      if (architecture === "arm") return bitness === "64" ? "arm64" : "arm32";
    }
  } catch {
    /* not supported — use the fallback */
  }
  return fallback;
}
