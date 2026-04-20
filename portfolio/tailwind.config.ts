export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cw: {
          black: '#080A0F',
          dark: '#0E1118',
          surface: '#141820',
          border: '#1E2533',
          accent: '#00E5FF',
          'accent-2': '#7B61FF',
          'accent-3': '#FF4D6A',
          text: '#E8EDF5',
          muted: '#6B7A99',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        site: '1440px',
      },
    },
  },
  plugins: [],
}
