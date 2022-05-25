const { Platform } = require('react-native');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        montreal: ['PP Neue Montreal TT', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        telegraf: ['PP Telegraf', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      height: {
        13: '3.25rem',
        15: '3.75rem',
        17: '4.15rem',
        18: '4.5rem',
        19: '4.75rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        25: '6.25rem',
        26: '6.5rem',
        27: '6.75rem',
        38: '9.5rem',
      },
      width: {
        13: '3.25rem',
        15: '3.75rem',
        17: '4.15rem',
        18: '4.5rem',
        19: '4.75rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        25: '6.25rem',
        26: '6.5rem',
        27: '6.75rem',
        38: '9.5rem',
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
      '3xs': '.5rem', // ~8px
      '2xs': '.625rem', // ~10px
      xs: '.75rem', // ~12px
      sm: '.875rem', // ~14px
      base: '1rem', // ~16px base
      lg: '1.125rem', // ~18px
      xl: '1.25rem', // ~20px
      '2xl': '1.5rem', // ~24px
      '3xl': '1.875rem', // ~30px
      '4xl': '2.25rem', // ~36px
    },
    colors: {
      black: '#000000',
      white: '#FFFFFF',
      transparent: 'rgba(225,225,225,0)',

      // Brand
      primary: '#43FA76', // Bright Green
      secondary: '#003333', // Forest Green

      'secondary-light': '#0D3D3D',
      'secondary-disabled': '#C2CECE', // Disabled Forest Green
      tan: '#F3F2EF',

      // Cards
      'card-light': '#F3F2EF',
      'card-dark': '#063838',
      'card-primary': '#43FA76',

      // Functional
      error: '#FF2F2F',
      success: '#059669',
      pending: '#AFFFC6',
      darkError: '#CC0033',
      buttonDisabled: '#EDEDED',
      lightError: '#FFF5F5',

      // Apple Wallet mock flow
      lightBG: '#F1F7FF',
      'ios-link': '#008de1',
      'ios-gray-bg': '#F7F7F6',

      // White Scale
      'white-5': 'rgba(255,255,255,0.05)',
      'white-10': 'rgba(255,255,255,0.1)',
      'white-20': 'rgba(255,255,255,0.2)',

      // Transparent Black scale
      'black-5': 'rgba(0,0,0,0.05)',
      'black-10': 'rgba(0,0,0,0.1)',
      'black-20': 'rgba(0,0,0,0.2)',
      'black-30': 'rgba(0,0,0,0.3)',
      'black-50': 'rgba(0,0,0,0.5)',
      'black-75': 'rgba(0,0,0,0.75)',

      // Grayscale
      'gray-5': '#EDEDED',
      'gray-10': '#E1E1E1',
      'gray-20': '#CCCCCC',
      'gray-50': '#7C7C7C',
      'gray-75': '#3F3F3F',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      '1/2': '0.5px',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      7: '7px',
      8: '8px',
      9: '9px',
      10: '10px',
    },
  },
};
