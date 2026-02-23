/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: '#0D0D12',
                champagne: '#C9A84C',
                ivory: '#FAF8F5',
                slate: '#2A2A35',
                'champagne-light': '#D4B95E',
                'champagne-dark': '#B89A3E',
                'obsidian-light': '#16161E',
                'slate-light': '#3A3A48',
            },
            fontFamily: {
                heading: ['Inter', 'sans-serif'],
                drama: ['Playfair Display', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                '2xl': '1.5rem',
                '3xl': '2rem',
                '4xl': '3rem',
                '5xl': '4rem',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.1)' },
                    '100%': { boxShadow: '0 0 40px rgba(201, 168, 76, 0.3)' },
                },
            },
        },
    },
    plugins: [],
}
