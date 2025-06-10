/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0066CC",
        secondary: "#1A1A2E", 
        accent: "#00D4FF",
        surface: "#F8F9FA",
        background: "#FFFFFF",
        success: "#00A878",
        warning: "#FFB700",
        error: "#E63946",
        info: "#4361EE",
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: { 
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], 
        heading: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace']
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '14px',
        'lg': '17.5px',
        'xl': '21.87px',
        '2xl': '27.34px',
        '3xl': '34.18px'
      }
    }
  },
  plugins: []
};