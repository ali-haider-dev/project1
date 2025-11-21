/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', 
  theme: {
    extend: {
      colors: {
        instagram: {
          purple: '#bc1888',
          pink: '#cc2366',
          red: '#dc2743',
          orange: '#e6683c',
          yellow: '#f09433',
        },
      },
      backgroundImage: {
        'instagram-gradient': 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
        'instagram-gradient-hover': 'linear-gradient(45deg, #f5a742 0%, #eb7749 25%, #e13550 50%, #d13073 75%, #c11f95 100%)',
      },
      animation: {
        'slide-up': 'slideUp 0.6s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'shimmer': 'shimmer 2s infinite',
        'move-bg': 'moveBackground 20s linear infinite',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-10px)' },
          '75%': { transform: 'translateX(10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        moveBackground: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
      },
    },
  },
  plugins: [],
}
