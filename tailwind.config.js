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
        darkHeader: 'rgba(31,31,47,0.8)',
        card: "#1a1a2e",
        muted: "#2e2e40",
        accent: "#7c3aed",
        textMain: "#ffffff",
        textMuted: "#a1a1aa"
      },
      screens: {
        xs: '375px', // Iphone SE/6/7/8
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in-out forwards',
        'scale-in': 'scaleIn 0.25s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': {opacity: 0, transform: 'translateY(10px)'},
          '100%': {opacity: 1, transform: 'translateY(0)'},
        },
        scaleIn: {
          '0%': {opacity: 0, transform: 'scale(0.95)'},
          '100%': {opacity: 1, transform: 'scale(1)'},
        },
      },
    },
  },
  plugins: [],
}
