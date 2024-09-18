import { type Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: '#0a0c01',
        primary: '#0b9a33',
        accent: '#21ef9f',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
