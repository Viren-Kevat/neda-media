/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        beige: "rgb(var(--color-beige) / <alpha-value>)",
        warm: "rgb(var(--color-warm) / <alpha-value>)",
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        taupe: "rgb(var(--color-taupe) / <alpha-value>)",
        olive: "rgb(var(--color-olive) / <alpha-value>)",
        rust: "rgb(var(--color-rust) / <alpha-value>)",
        brown: "rgb(var(--color-brown) / <alpha-value>)"
      },
      fontFamily: {
        display: ["'Lexend Deca'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        accent: ["'Newsreader'", "serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(26, 26, 26, 0.08)",
        card: "0 8px 30px rgba(26, 26, 26, 0.06)"
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        float: "float 9s ease-in-out infinite"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        }
      }
    }
  },
  plugins: []
};
