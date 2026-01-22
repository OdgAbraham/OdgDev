import { useEffect, useState } from "react";

const CODE_WORDS = [
  "Δβ¢–ħω",
  "κ¥₥↯",
  "ƒΔ✓Ω",
  "ρ9®$+",
  "υ✕ζβ",
  "¢Ð€ƒɢ",
  "⟁⟡⧫⌬",
  "⌁⍜⍝⍉",
];

export default function CodeLoupe() {
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CODE_WORDS.length);

      // micro glitch offset
      setOffset({
        x: Math.random() * 6 - 3,
        y: Math.random() * 6 - 3,
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto mt-16 w-64 h-64 rounded-full
      border border-accent/30
      bg-black/50 backdrop-blur-xl
      animate-glow-pulse
      shadow-[0_0_60px_rgba(124,58,237,0.35)]
      overflow-hidden
    ">

      {/* Rotation lente */}
      <div className="absolute inset-0 rounded-full animate-spin-slow border border-accent/10" />

      {/* Scan lines */}
      <div className="absolute inset-x-0 top-0 h-1 bg-accent/60 animate-scan" />
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-accent/40 animate-scan delay-1000" />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\"/></filter><rect width=\"100%\" height=\"100%\" filter=\"url(%23n)\"/></svg>')",
        }}
      />

      {/* Inner gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent via-black/20 to-black/50" />

      {/* Text */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <span
          key={index}
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
          className="
            text-3xl font-mono tracking-[0.3em]
            text-accent
            animate-fade-up
            drop-shadow-[0_0_12px_rgba(124,58,237,0.8)]
          "
        >
          {CODE_WORDS[index]}
        </span>
      </div>
    </div>
  );
}
