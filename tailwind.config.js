/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#f0f5ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a5bcfd',
          400: '#819dfc',
          500: '#5e7ef7',
          600: '#4763eb',
          700: '#3b4fd8',
          800: '#3142b0',
          900: '#0F172A',
        },
        teal: {
          50: '#f0fdfd',
          100: '#ccfcff',
          200: '#99f6ff',
          300: '#5eebfd',
          400: '#2dd5f0',
          500: '#0abbd6',
          600: '#0891B2',
          700: '#037591',
          800: '#075e76',
          900: '#0c4e63',
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    },
  },
  plugins: [],
};