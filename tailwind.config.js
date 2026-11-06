/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FAF8F5',
          100: '#F4F1EA',
          200: '#EAE5DA',
          300: '#DED7C8',
          400: '#C8BEAA',
        },
        sage: {
          50: '#F4F7F5',
          100: '#E5ECE7',
          200: '#CBDCD0',
          300: '#A9C2AF',
          400: '#8FA896',
          500: '#76927E',
          600: '#617C69',
          700: '#4D6454',
          800: '#3D5043',
          900: '#2A372E',
        },
        terracotta: {
          50: '#FDF6F2',
          100: '#FAEDE5',
          200: '#F5DACB',
          300: '#EEC0A9',
          400: '#E49C7A',
          500: '#D97241',
          600: '#C75F2F',
          700: '#A64B20',
          800: '#853A17',
          900: '#662B10',
        },
        forest: {
          950: '#151C17',
          900: '#1F2722',
          800: '#2D3831',
          700: '#3D4C42',
          600: '#536559',
          500: '#6E8074',
          400: '#8E9F94',
        },
        brand: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb', // Royal Blue Primary
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#0f172a',
          },
          green: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981', // Auxiliary Green Accent
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
          },
          flame: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b', // Warm Amber Accent for Calories, Energy & Flame
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          dark: {
            900: '#080d1a',
            800: '#0f172a',
            700: '#1e293b',
            600: '#334155',
          }
        }
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}

