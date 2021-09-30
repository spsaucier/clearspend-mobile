// Important: After editing this file, run npx trnc-create-styles - See README.md

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        card: ['kredit', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
    screens: {
      xxs: '320px',
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      transparent: 'rgba(225,225,225,0)',

      // Brand
      primary: '#1D4ED8',
      primaryDark: '#0c177d',
      secondary: '#4EF8C1',
      tertiary: '#04A7DA',
      copy: '#111827',

      // Background Colours
      lightBG: '#F1F7FF',

      // Functional
      error: '#ac204b',
      success: '#00b971',

      // Grayscale
      gray10: '#1A1A1A',
      gray20: '#333333',
      gray30: '#4D4D4D',
      gray40: '#666666',
      gray50: '#808080',
      gray60: '#999999',
      gray70: '#B2B2B2',
      gray80: '#CCCCCC',
      gray90: '#E5E5E5',
    },
  },
  variants: {},
  plugins: [],
};
