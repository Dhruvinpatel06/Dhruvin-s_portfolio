"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A true crossfade slideshow — both outgoing and incoming slides are rendered
 * simultaneously as stacked absolute layers so they blend smoothly with no
 * flash, gap, or layout shift.
 *
 * Each slide gets a subtle Ken Burns drift (slow scale 1 → 1.06) during its
 * hold time, giving the card a cinematic "app demo" feel.
 *
 * Used on the BrandMirror card to showcase multiple screens.
 */
const SlideshowPreview = ({
  images,
  alt,
  interval = 3000,
  fadeDuration = 1.0,
}: {
  /** Array of image URLs to cycle through */
  images: string[];
  /** Accessible label */
  alt: string;
  /** How long each slide is held (ms) before transitioning */
  interval?: number;
  /** Crossfade duration in seconds */
  fadeDuration?: number;
}) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, interval]);

  if (images.length === 0) return null;

  // Total time a slide is on screen (hold + fade-out overlap)
  const holdSec = interval / 1000;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label={alt}
    >
      {/* Dark base so the crossfade never reveals a white flash */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        }}
      />

      {/* ── Crossfade slides ── */}
      {/* AnimatePresence mode="sync" keeps both the exiting and entering
          slide mounted simultaneously so they can truly cross-dissolve.
          initial={false} skips the enter animation on mount so SSR
          and client HTML match (no opacity:0 vs opacity:1 mismatch). */}
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05],
          }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: fadeDuration, ease: "easeInOut" },
            scale: {
              duration: holdSec + fadeDuration,
              ease: "easeOut",
            },
          }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${images[current]}")`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
            willChange: "opacity, transform",
          }}
        />
      </AnimatePresence>

      {/* Subtle vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.3) 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* Slide progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        {images.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              width: i === current ? 20 : 6,
              background:
                i === current
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.3)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{
              height: 6,
              borderRadius: 3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideshowPreview;
