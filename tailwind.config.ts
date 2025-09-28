import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        leaf: {
          DEFAULT: '#10B981',
          light: '#A7F3D0',
          dark: '#065F46'
        }
      }
    }
  },
  plugins: []
}
export default config
