import { useEffect, useRef, useState } from "react";

// Self-hosted under /public so it never expires. Original source was a
// Runway-signed CloudFront URL whose JWT lapsed and started returning 401.
const VIDEO_URL = "/hero.mp4";

// How much wheel delta is needed to fully zoom through the U.
// Smaller = snappier; larger = takes more wheel motion.
const WHEEL_SENSITIVITY = 1 / 1400;

export default function Hero({ onProgress, disabled = false }) {
  const maskRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const disabledRef = useRef(disabled);
  const [origin, setOrigin] = useState({ x: 36, y: 48 });

  // Mirror prop into ref so the long-lived event handlers can read the
  // latest value without being torn down and re-registered.
  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  // Some browsers quietly block autoplay on first paint; nudge it.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    document.addEventListener("visibilitychange", tryPlay);
    return () => document.removeEventListener("visibilitychange", tryPlay);
  }, []);

  // Measure the first U's interior centre and convert to *real screen pixels*
  // via getScreenCTM, then to viewport percentages. This accounts for the
  // SVG's preserveAspectRatio="slice" cropping on non-16:9 viewports — the
  // earlier viewBox-to-percentage shortcut drifted on wider/narrower screens
  // and could land the camera on the U's left stroke instead of the interior.
  useEffect(() => {
    const measure = () => {
      const txt = textRef.current;
      if (!txt) return;
      const svg = txt.ownerSVGElement;
      const ctm = txt.getScreenCTM();
      if (!svg || !ctm) return;
      try {
        const u = txt.getStartPositionOfChar(1);
        const next = txt.getStartPositionOfChar(2);
        const bbox = txt.getBBox();
        // Glyph centre, then nudge well to the right of the U's geometric
        // centre so the camera flies firmly into the open counter, not the
        // strokes. ~18% of letter width is a comfortable bias.
        const letterWidth = next.x - u.x;
        const uCenterX = (u.x + next.x) / 2 + letterWidth * 0.3;
        // U opens upward — visual interior sits in the upper half of the bbox.
        const uCenterY = bbox.y + bbox.height * 0.4;

        const pt = svg.createSVGPoint();
        pt.x = uCenterX;
        pt.y = uCenterY;
        const screen = pt.matrixTransform(ctm);

        setOrigin({
          x: (screen.x / window.innerWidth) * 100,
          y: (screen.y / window.innerHeight) * 100,
        });
      } catch {
        /* fonts not ready yet — fall back */
      }
    };
    measure();
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Wheel + touch hijack: accumulate delta into a target progress, then
  // smoothly interpolate the actual progress toward it on every animation
  // frame. The page itself never scrolls.
  useEffect(() => {
    let lastTouchY = null;

    const apply = () => {
      // Smoothly chase the target — gives a soft inertia feel even if
      // the user wheels in big chunks.
      const cur = progressRef.current;
      const tgt = targetRef.current;
      const next = cur + (tgt - cur) * 0.18;
      const clamped = Math.abs(next - tgt) < 0.0005 ? tgt : next;
      progressRef.current = clamped;

      const p = clamped;
      const eased = p * p * (3 - 2 * p);
      const maxScale = 40;
      const scale = Math.pow(maxScale, eased);

      const fadeStart = 0.82;
      const fadeEnd = 0.9;
      const maskOpacity =
        p <= fadeStart
          ? 1
          : p >= fadeEnd
          ? 0
          : 1 - (p - fadeStart) / (fadeEnd - fadeStart);

      if (maskRef.current) {
        maskRef.current.style.transform = `translateZ(0) scale(${scale})`;
        maskRef.current.style.opacity = String(maskOpacity);
      }

      onProgress?.(p);

      if (clamped !== tgt) {
        rafRef.current = requestAnimationFrame(apply);
      } else {
        rafRef.current = 0;
      }
    };

    const schedule = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(apply);
    };

    const onWheel = (e) => {
      if (disabledRef.current) return; // App owns the wheel after reveal
      e.preventDefault();
      const delta = e.deltaY * WHEEL_SENSITIVITY;
      targetRef.current = Math.max(0, Math.min(1, targetRef.current + delta));
      schedule();
    };

    const onTouchStart = (e) => {
      if (disabledRef.current) return;
      lastTouchY = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e) => {
      if (disabledRef.current) return;
      if (lastTouchY == null) return;
      e.preventDefault();
      const y = e.touches[0]?.clientY ?? lastTouchY;
      const delta = (lastTouchY - y) * WHEEL_SENSITIVITY * 6; // touch is gentler
      lastTouchY = y;
      targetRef.current = Math.max(0, Math.min(1, targetRef.current + delta));
      schedule();
    };

    const onKeyDown = (e) => {
      if (disabledRef.current) return;
      const big = ["PageDown", "PageUp", " "].includes(e.key);
      const small = ["ArrowDown", "ArrowUp"].includes(e.key);
      if (!big && !small) return;
      e.preventDefault();
      const dir = e.key === "ArrowUp" || e.key === "PageUp" ? -1 : 1;
      const step = big ? 0.18 : 0.06;
      targetRef.current = Math.max(
        0,
        Math.min(1, targetRef.current + dir * step)
      );
      schedule();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onProgress]);

  return (
    <>
      {/* Page-level fixed video — pinned to its own GPU layer. */}
      <div className="bg-video">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
      </div>

      {/* Single fullscreen frame holding the FUTURE-shaped cutout. */}
      <section className="hero">
        <div
          ref={maskRef}
          className="hero__mask"
          style={{ "--ox": `${origin.x}%`, "--oy": `${origin.y}%` }}
        >
          <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            {/* Measurement text — kept in the regular render tree (not
                inside <mask>) because Firefox returns zeros for
                getBBox / getStartPositionOfChar / getScreenCTM on text
                that only exists inside a <mask>. That caused the zoom
                origin to default to ~(0,0) in Firefox, which made the
                FUTURE text move down-and-right with scale and looked
                like a scroll. This element has the same geometry as
                the masked one but is invisible (fill+stroke none). */}
            <text
              ref={textRef}
              x="960"
              y="540"
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily='"Space Grotesk", system-ui, sans-serif'
              fontWeight="700"
              fontSize="320"
              letterSpacing="-8"
              fill="none"
              stroke="none"
              aria-hidden="true"
              pointerEvents="none"
            >
              FUTURE
            </text>
            <defs>
              <mask id="future-cutout">
                <rect width="1920" height="1080" fill="white" />
                <text
                  x="960"
                  y="540"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontFamily='"Space Grotesk", system-ui, sans-serif'
                  fontWeight="700"
                  fontSize="320"
                  letterSpacing="-8"
                  fill="black"
                >
                  FUTURE
                </text>
              </mask>
            </defs>
            <rect
              width="1920"
              height="1080"
              fill="#05060A"
              mask="url(#future-cutout)"
            />
          </svg>
        </div>
      </section>
    </>
  );
}
