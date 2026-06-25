/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Design tokens — mirror the CSS variables in src/index.css
        bg: '#0F141A',
        surface: '#1C242E',
        text: '#DCE3EB',
        muted: '#8A98A8',
        accent: '#38BDF8',
        accent2: '#7DD3FC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
