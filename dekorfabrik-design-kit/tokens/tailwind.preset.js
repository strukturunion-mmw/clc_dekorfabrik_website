/**
 * Dekorfabrik Design System — Tailwind v3 preset
 *
 * Usage:
 *   // tailwind.config.js
 *   module.exports = {
 *     presets: [require('./design-kit/tokens/tailwind.preset.js')],
 *     content: ['./src/** /*.{html,js,jsx,ts,tsx}'],
 *   };
 *
 * Generated from tokens.css. Keep in sync if you edit the CSS.
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        paper: {
          50:  '#FCFAF5',
          100: '#F7F3EA',
          200: '#ECE5D4',
          300: '#DCD2BB',
        },
        navy: {
          200: '#B2C2DA',
          300: '#7A95BE',
          500: '#2E5590',
          600: '#1F3E72',
          700: '#162B55',
          800: '#0D1B3D', // wordmark
          900: '#0A1430',
          950: '#060D20',
        },
        azure: {
          100: '#DCE8F4',
          200: '#B1CDE8',
          300: '#78ACDB',
          400: '#4A8ECB',
          500: '#2B73B6',
          600: '#1F5F9E', // df lettering
          700: '#1A5089',
          800: '#153F6E',
        },
        sky: {
          100: '#EAF2FA',
          200: '#D3E6F3',
          300: '#B4D7EC',
          400: '#8FC4E1',
          500: '#6BAED6', // logo square
          600: '#5C9CC8',
          700: '#4A8AB5',
        },
        clay: {
          100: '#FAE6D9',
          200: '#F4CFBC',
          300: '#EBAB8C',
          400: '#E18A62',
          500: '#D86A3D', // warm CTA
          600: '#BE5127',
          700: '#9E3F1C',
        },
        lilac: {
          100: '#E8E6F4',
          200: '#D7D4EC',
          300: '#BDB9E0',
          500: '#8E8DC4',
        },
        ink: {
          100: '#E8EAEF',
          200: '#D4D7DF',
          300: '#B8BCC7',
          400: '#898E9C',
          500: '#5F6472',
          700: '#2B2F3B',
          800: '#1A1E28',
          900: '#0A0D14',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', '"Instrument Serif"', '"Times New Roman"', 'Georgia', 'serif'],
        serif:   ['"Instrument Serif"', '"DM Serif Display"', 'Georgia', 'serif'],
        brand:   ['"Share"', '"Geist"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['"Geist"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono:    ['"Geist Mono"', 'ui-monospace', '"SFMono-Regular"', '"Roboto Mono"', 'monospace'],
      },
      fontSize: {
        // Display scale
        'd5': ['32px', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'd4': ['40px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'd3': ['52px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'd2': ['68px', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'd1': ['88px', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
      },
      letterSpacing: {
        tight:  '-0.02em',
        wide:   '0.04em',
        wider:  '0.12em',
        brand:  '0.14em', // eyebrows
      },
      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '12px',
        lg:   '18px',  // card
        xl:   '28px',  // hero tile
        '2xl':'40px',
        pill: '999px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(13, 27, 61, 0.05)',
        sm: '0 2px 6px rgba(13, 27, 61, 0.07), 0 1px 2px rgba(13, 27, 61, 0.04)',
        md: '0 8px 20px rgba(13, 27, 61, 0.09), 0 2px 4px rgba(13, 27, 61, 0.04)',
        lg: '0 18px 40px rgba(13, 27, 61, 0.12), 0 4px 8px rgba(13, 27, 61, 0.06)',
        xl: '0 30px 70px rgba(13, 27, 61, 0.16), 0 8px 14px rgba(13, 27, 61, 0.07)',
        paper: '0 12px 24px rgba(6, 13, 32, 0.22), 0 2px 4px rgba(6, 13, 32, 0.12)',
      },
      spacing: {
        '1': '4px',  '2': '8px',  '3': '12px',
        '4': '16px', '5': '20px', '6': '24px', '8': '32px',
        '10': '40px', '12': '48px', '16': '64px', '20': '80px',
        '24': '96px', '32': '128px',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasis: 'cubic-bezier(0.3, 0, 0, 1)',
        'out-soft': 'cubic-bezier(0.33, 1, 0.68, 1)',
      },
      transitionDuration: {
        fast: '120ms',
        base: '220ms',
        slow: '420ms',
      },
      maxWidth: {
        'content': '1120px',  // the signature nav/footer inner width
        'hero':    '1200px',
      },
    },
  },
};
