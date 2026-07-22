import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ArrowDownToLine, Check, Mail, ShieldCheck, Smartphone, Cpu, Users } from "lucide-react";
import { toast } from "sonner";
import { VortexLogo } from "./vortex-logo";
import { Magnetic } from "./use-magnetic";
import Reveal from "./reveal";
import { RELEASE, hasBuild, apkFor, detectDevice, resolveAndroidArch } from "@/lib/release";

function Download() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  // Which device the visitor is on — decides whether we offer the APK, and
  // for Android, which architecture build to serve.
  const [device, setDevice] = useState({ os: "other", arch: null, label: "your device", isAndroid: false });
  useEffect(() => { setDevice(detectDevice()); }, []);
  const build = hasBuild();

  // Download the correct APK for the visitor's Android device. Refines the
  // architecture via UA Client Hints, then serves the matching build.
  const getApk = async (e) => {
    e.preventDefault();
    const arch = await resolveAndroidArch(device.arch || "arm64");
    const url = apkFor(arch);
    if (!url) { toast.error("The build isn't published yet — join the list below."); return; }
    const a = document.createElement("a");
    a.href = url;
    a.rel = "noopener";
    a.click();
    toast.success(`Downloading Vortex${RELEASE.versionName ? ` v${RELEASE.versionName}` : ""} for ${arch === "arm32" ? "32-bit" : "64-bit"} Android.`);
  };
  // No backend / database on this static site, so there is no live signup
  // counter \u2014 we never invent a "already on the list" number. `count` stays
  // null and the counter pill below stays hidden.
  const count = null;
  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("That email doesn't look right.");
      return;
    }
    setStatus("loading");
    // Client-only acknowledgement \u2014 no email is stored. Wire a form service
    // or API here to actually capture signups.
    setTimeout(() => {
      setStatus("done");
      toast.success("You're on the list \u2014 we'll ping you when the build drops.");
    }, 500);
  };
  return <section id="download" className="relative overflow-hidden px-4 py-28 text-center sm:py-36">
      <div className="vortex-bg opacity-60" aria-hidden="true" style={{ inset: "-55% -25%" }} />

      <div className="relative z-10 mx-auto flex w-[min(760px,100%)] flex-col items-center gap-6">
        <Reveal>
          <motion.div
    className="mb-2"
    initial={{ scale: 0.6, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
            <VortexLogo size={72} animated />
          </motion.div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-[14ch] font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink">
            Put it on <span className="gradient-vortex-text">your phone</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="max-w-[48ch] font-display text-[15.5px] text-ink-2">
            A fresh, re-signed build is on the way. Drop your email and we'll ping
            you the moment it's live — no spam, just the one message.
          </p>
        </Reveal>

        {
    /* live waitlist counter — social proof */
  }
        <Reveal delay={0.13}>
          {count != null && <div className="inline-flex items-center gap-2 rounded-full border border-glass bg-glass px-3.5 py-1.5 font-mono text-[11.5px] text-ink-2 backdrop-blur-md">
              <Users className="h-3.5 w-3.5 text-violet" />
              <CountUpLive value={count} />
              <span className="text-ink-3">already on the list</span>
            </div>}
        </Reveal>

        {/* Smart download — device-aware: serves the right APK on Android,
            and tells everyone else it's Android-only. */}
        <Reveal delay={0.15}>
          {device.isAndroid ? (
            build ? (
              <Magnetic
                as="a"
                href={apkFor(device.arch || "arm64") || "#"}
                strength={14}
                aria-label="Download Vortex for Android"
                onClick={getApk}
                className="btn-apk group inline-flex items-center gap-3 rounded-2xl gradient-violet px-8 py-4 font-display text-[17px] font-bold text-ink glow-violet"
              >
                <ArrowDownToLine className="h-5 w-5" />
                Download for Android
                {RELEASE.versionName && (
                  <span className="font-mono text-[11px] font-normal text-white/75">
                    v{RELEASE.versionName}
                  </span>
                )}
              </Magnetic>
            ) : (
              <Magnetic
                as="a"
                href="#download"
                strength={14}
                aria-label="Download APK (coming soon)"
                onClick={(e) => e.preventDefault()}
                className="btn-apk group inline-flex items-center gap-3 rounded-2xl gradient-violet px-8 py-4 font-display text-[17px] font-bold text-ink glow-violet"
              >
                <ArrowDownToLine className="h-5 w-5" />
                Download APK
                <span className="font-mono text-[11px] font-normal text-white/75">
                  new build coming soon
                </span>
              </Magnetic>
            )
          ) : (
            <div className="flex max-w-[48ch] items-center gap-3 rounded-2xl border border-glass bg-glass px-5 py-4 text-left font-display text-[14.5px] text-ink-2 backdrop-blur-md">
              <Smartphone className="h-5 w-5 shrink-0 text-violet" />
              <span>
                <span className="text-ink">Vortex is an Android app.</span> You're on{" "}
                {device.label} — open this page on your Android phone to install, or drop
                your email below and we'll ping you when it's live.
              </span>
            </div>
          )}
        </Reveal>

        {
    /* waitlist */
  }
        <Reveal delay={0.2} className="w-full max-w-md">
          {status === "done" ? <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex items-center justify-center gap-3 rounded-2xl border border-[var(--vortex-green)]/30 bg-[var(--vortex-green)]/10 px-5 py-4 font-display text-[15px] text-ink"
  >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--vortex-green)] text-black">
                <Check className="h-4 w-4" />
              </span>
              You're on the list. Talk soon.
            </motion.div> : <form onSubmit={submit} className="flex flex-col gap-2.5 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-2xl border border-glass bg-black/40 px-4 py-3.5 backdrop-blur-md transition-colors focus-within:border-violet/60">
                <Mail className="h-4 w-4 shrink-0 text-ink-3" />
                <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="you@email.com"
    className="w-full bg-transparent font-mono text-[14px] text-ink placeholder:text-ink-3 focus:outline-none"
    aria-label="Your email"
    disabled={status === "loading"}
  />
              </div>
              <button
    type="submit"
    disabled={status === "loading"}
    className="rounded-2xl border border-violet/60 bg-violet/15 px-5 py-3.5 font-display text-[14px] font-semibold text-ink transition-colors hover:bg-violet/25 disabled:opacity-50"
  >
                {status === "loading" ? "Adding\u2026" : "Notify me"}
              </button>
            </form>}
        </Reveal>

        <Reveal delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[12px] text-ink-3">
            <span className="flex items-center gap-1.5">
              <Smartphone className="h-3.5 w-3.5" /> Android 8.0+
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5" /> arm64 &amp; arm32
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[var(--vortex-green)]" /> Direct APK · signed
            </span>
          </div>
        </Reveal>
      </div>
    </section>;
}
function CountUpLive({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1200, bounce: 0 });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, value, mv]);
  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);
  return <span ref={ref} className="font-semibold tabular-nums text-ink">
      {display.toLocaleString()}
    </span>;
}
export {
  Download as default
};
