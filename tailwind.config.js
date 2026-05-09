/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#05060A',
        void: '#0A0B12',
        haze: '#12141C',
        chrome: '#E6E8EE',
        ash: '#7A7E8C',
      },
    },
  },
  plugins: [],
}
