/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0f0f1c",
        darkHeader: "rgba(31,31,47,0.8)",
        card: "#1a1a2e",
        muted: "#2e2e40",
        accent: "#7c3aed",
        textMain: "#ffffff",
        textMuted: "#a1a1aa",
      },
      screens: {
        xs: "375px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      /* 🔥 ANIMATIONS */
      animation: {
        "fade-in": "fadeIn 0.4s ease-in-out forwards",
        "scale-in": "scaleIn 0.25s ease forwards",

        /* NOUVELLES */
        "fade-up": "fadeUp 0.6s ease-out",
        scan: "scan 2.8s linear infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",

      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },

        /* 🔍 LOUPE */
        fadeUp: {
          "0%": {
            opacity: 0,
            transform: "translateY(12px)",
            filter: "blur(4px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
            filter: "blur(0)",
          },
        },

        scan: {
          "0%": { top: "0%", opacity: "0.25" },
          "50%": { opacity: "0.6" },
          "100%": { top: "100%", opacity: "0" },
        },

        glowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 25px rgba(124,58,237,0.25)",
          },
          "50%": {
            boxShadow: "0 0 45px rgba(124,58,237,0.45)",
          },
        },
      },
    },
  },
  plugins: [],
};
