/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'terminal-bg': '#1e293b',
        'terminal-header': '#0f172a',
        'terminal-text': '#94a3b8',
        'terminal-accent': '#60a5fa',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
