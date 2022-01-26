const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'false', // or 'media' or 'class'
  theme: {
    screens: {
      xsm: { min: '375px' },
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        blue: {
          50: '#ECF4FE',
          100: '#D1E4FC',
          300: '#A2C9FA',
          500: '#74AEF7',
          700: '#4593F5',
          900: '#1778F2',
        },
        green: {
          50: '#EEFAF7',
          100: '#D4F3EA',
          300: '#A8E6D5',
          500: '#7DDAC0',
          700: '#51CDAB',
          900: '#26C196',
        },
        orange: {
          50: '#FFF6F5',
          100: '#FFE9E5',
          300: '#FFD3CC',
          500: '#FFBDB2',
          700: '#FFA799',
          900: '#FF917F',
        },
        yellow: {
          50: '#FFFEF4',
          100: '#FEFEE3',
          300: '#FDFCC6',
          500: '#FBFBAA',
          700: '#FAF98D',
          900: '#F9F871',
        },
        dark: {
          50: '#EFEFEF',
          100: '#D0D0D0',
          300: '#A1A1A1',
          500: '#727272',
          700: '#434343',
          900: '#141414',
        },
        light: {
          20: '#FFFFFF33',
          40: '#FFFFFF66',
          60: '#FFFFFF99',
          80: '#FFFFFFCC',
          100: '#FFFFFF',
        },
        positive: {
          50: '#D4F3EA',
          500: '#26C196',
        },
        warning: {
          50: '#FFE9E5',
          500: '#FF917F',
        },
        negative: {
          50: '#FFDEDE',
          500: '#FF5A5A',
        },
      },
      boxShadow: {
        level1: '0 4px 16px #0000001A',
        level2: '0 16px 48px #0000001A',
        'image-sm': '-32px 32px #ECF4FE',
        'image-lg': '-88px 88px #ECF4FE',
      },
      fontFamily: {
        head: ['Raleway', 'Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.625rem', '0.875rem'],
        sm: ['0.75rem', '1.125rem'],
        md: ['0.875rem', '1.375rem'],
        lg: ['1.125rem', '1.75rem'],
        xl: ['1.5rem', '1.875rem'],
        '2xl': ['1.75rem', '2.125rem'],
        '3xl': ['2rem', '2.5rem'],
        '4xl': ['2.5rem', '3rem'],
        '5xl': ['3rem', '3.5rem'],
        base: ['1rem', '1.75rem'],
      },
      padding: {
        1.25: '0.3125rem',
        1.75: '0.4375rem',
        2.75: '0.6875rem',
        3.75: '0.8125rem',
      },
      transitionProperty: {
        marker: 'width left',
        transform: 'transform',
        'burger-up-and-down-spans': 'margin-top transform',
        'burger-middle-span': 'background-color transform',
        'max-h': 'max-height',
      },
      width: {
        34: '8.5rem',
        '1/2-gap': 'calc(50% - 1rem)',
      },
      maxWidth: {
        sm: '25rem',
        'screen-3xl': '1920px',
      },
      height: {
        0.5: '0.125rem',
        0.75: '3px',
        112: '28rem',
        128: '32rem',
        '4/5-screen': '80vh',
      },
      minHeight: {
        72: '18rem',
        '4/5-screen': '80vh',
        '1/2-screen': '50vh',
      },
      maxHeight: {
        112: '28rem',
        128: '32rem',
        144: '36rem',
      },
      gap: {
        33.5: '8.375rem',
      },
      borderWidth: {
        1: '1px',
      },
      zIndex: {
        '-1': '-1',
      },
      backgroundImage: {
        card: "url('/bg-card.png')",
      },
      fill: {
        blue: {
          50: '#ECF4FE',
          900: '#1778F2',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
