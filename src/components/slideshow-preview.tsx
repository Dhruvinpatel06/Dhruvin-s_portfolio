"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * A crossfade slideshow that cycles through multiple images with smooth
 * Ken-Burns-style transitions. Each slide fades in, holds, then fades out
 * while the next fades in — creating a cinematic "app demo" feel.
 *
 * Used on the BrandMirror card to replace the single-image scroll approach
 * with a polished multi-screen walkthrough.
 */
const SlideshowPreview = ({
  images,
  alt,
  interval = 3000,
  fadeDuration = 1.2,
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
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [images.length, interval, isPaused]);

  if (images.length === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label={alt}
      onMouseEnter={() => setIsPaused(false)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dark base so the fade-in never shows white */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
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
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background:
                i === current
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.3)",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>

      {/* Image slides with crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{
            opacity: { duration: fadeDuration, ease: "easeInOut" },
            scale: { duration: fadeDuration * 1.8, ease: "easeOut" },
          }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("${images[current]}")`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
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
    </div>
  );
};

export default SlideshowPreview;
