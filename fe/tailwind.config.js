/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sky: {
          top: '#0f1133',
          mid: '#452063',
          horizon: '#d46a4a',
          haze: '#f3a266',
        },
        ground: {
          top: '#2a5230',
          bottom: '#10221a',
          ridge: '#091410',
          stripe: 'rgba(0, 0, 0, 0.18)',
        },
        accent: {
          gold: '#ffc83a',
          amber: '#ff8f3c',
          red: '#ff4b4b',
          green: '#3ad16e',
        },
        panel: {
          bg: '#090d1a',
          border: '#ffc83a',
          shadow: '#9a6b10',
        },
        hud: {
          text: '#fff8e8',
          mute: 'rgba(255, 248, 232, 0.55)',
          accent: '#ffc83a',
          bg: 'rgba(9, 13, 26, 0.55)',
          border: 'rgba(255, 200, 58, 0.18)',
        },
      },
      fontFamily: {
        display: ['"Press Start 2P"', 'VT323', 'monospace'],
        body: ['VT323', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      keyframes: {
        flash: {
          '0%': { opacity: '0.85' },
          '100%': { opacity: '0' },
        },
        floatIdle: {
          '0%, 100%': { transform: 'translate(-50%, 0)', opacity: '0.85' },
          '50%': { transform: 'translate(-50%, -4px)', opacity: '1' },
        },
        drift: {
          from: { left: '-220px' },
          to: { left: 'calc(100% + 40px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.45' },
        },
        crtOn: {
          '0%': { transform: 'scaleY(0.002) scaleX(1.05)', filter: 'brightness(4)', opacity: '0' },
          '30%': { transform: 'scaleY(0.4) scaleX(1.02)', opacity: '1' },
          '60%': { transform: 'scaleY(1) scaleX(1)' },
          '100%': { transform: 'none', filter: 'none' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
        duckHit: {
          '0%': { transform: 'translateX(var(--duck-offset-x)) translateY(0) rotate(0deg)' },
          '15%': { transform: 'translateX(var(--duck-offset-x)) translateY(-6px) rotate(-8deg)' },
          '100%': { transform: 'translateX(var(--duck-offset-x)) translateY(70vh) rotate(45deg)', opacity: '0.85' },
        },
      },
      animation: {
        flash: 'flash 0.12s ease-out forwards',
        'float-idle': 'floatIdle 2.4s ease-in-out infinite',
        drift: 'drift linear infinite',
        'pulse-soft': 'pulse 2s ease-in-out infinite',
        'crt-on': 'crtOn 0.5s ease-out',
        blink: 'blink 1s step-end infinite',
        'duck-hit': 'duckHit 3s ease-in forwards',
      },
    },
  },
  plugins: [],
}
