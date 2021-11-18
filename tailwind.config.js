// Important: After editing this file, run npx trnc-create-styles - See README.md

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        card: ['kredit', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        spacegrotesk: ['SpaceGrotesk-Regular', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      height: {
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.15rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '23': '5.75rem',
        '25': '6.25rem',
        '26': '6.5rem',
        '27': '6.75rem',
	      '38': '9.5rem',
      },
      width: {
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.15rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '23': '5.75rem',
        '25': '6.25rem',
        '26': '6.5rem',
        '27': '6.75rem',
        '38': '9.5rem',
      }
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
      '3xs': '.55rem',
      '2xs': '.65rem',
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '9xl': '7rem',
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      transparent: 'rgba(225,225,225,0)',

      // New Brand
      'primary-new': '#5BEA83',
      'forest-green': '#10292C',
      'card-primary': '#5BEA83',
      'card-dark': '#1C3437',
      'card-light': '#F3F2EF',

      // Brand
      primary: '#1D4ED8',
      'primary-dark': '#1E40AF',
      'primary-light': '#2563EB',
      'primary-light-light': '#366FED',
      'primary-highlight': '#60A5FA',

      secondary: '#4EF8C1',
      'secondary-light': '#A5FFE0',
      tertiary: '#04A7DA',
      copyDark: '#111827',
      copyLight: '#BFDBFE',

      // Background Colours
      lightBG: '#F1F7FF',

      // Functional
      error: '#DC2626',
      success: '#059669',
      pending: '#D97706',
      warning: '#FBEFEE',
      'warning-highlight': '#FEE2E2',

      // Wallet flow
      'ios-link': '#008de1',
      'ios-gray-bg': '#F7F7F6',

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
      gray95: '#F9FAFB',
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '1/2': '0.5px',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '5': '5px',
      '6': '6px',
      '7': '7px',
      '8': '8px',
      '9': '9px',
      '10': '10px',
    },
  },
};
