import DaisyUIPlugin from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    require.resolve('react-widgets/styles.css'),
  ],
  theme: {
    extend: {
      keyframes: {
        scale: {
          "0%, 100%": {transform: "scale(1.0)"},
          "50%": {transform:"scale(1.1)"},
        },
        expand: {
          "0%": {transform: "scaleX(0)"},
          "100%": {transform: "scaleX(1)"}
        }
      },
      animation: {
        scale: "scale 2s ease-in-out infinite",
        expand: "expand .5s infinite",
      },
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',

      '1k': '1920px',
      // => @media (min-width: 1536px) { ... }
      "2k": "2560px"
    }
  },
  plugins: [require('react-widgets-tailwind'), DaisyUIPlugin],
}

