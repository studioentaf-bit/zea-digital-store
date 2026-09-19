/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zea: {
          50: '#fdf4f4',
          100: '#fbe8e8',
          200: '#f8d5d5',
          300: '#f1b3b3',
          400: '#e48686',
          500: '#d25959',
          600: '#b83b3b',
          700: '#9b2b2b',
          800: '#812727',
          900: '#6b2424',
          950: '#3a0f0f',
        },
        warmbg: '#faf6f5',
        warmcard: '#fffafa',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(155, 43, 43, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 8px 30px rgba(155, 43, 43, 0.08)',
        'glow': '0 0 25px rgba(184, 59, 59, 0.25)',
      }
    },
  },
  plugins: [],
}
