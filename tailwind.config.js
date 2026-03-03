/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'off-white': '#F5F3EE',
                'sand': '#E8E4DD',
                'onyx': '#111111',
                'signal-red': '#E63B2E',
                // Keep some legacy variants if needed, or map them to new ones
                obsidian: '#111111', // Onyx
                champagne: '#E63B2E', // Signal Red
                ivory: '#F5F3EE', // Off-white
            },
            fontFamily: {
                sans: ['Space Grotesk', 'Cairo', 'sans-serif'],
                heading: ['Space Grotesk', 'Cairo', 'sans-serif'],
                mono: ['Space Mono', 'Cairo', 'monospace'],
                serif: ['DM Serif Display', 'Cairo', 'serif'],
                arabic: ['Cairo', 'sans-serif'],
            },
            borderRadius: {
                'none': '0',
                'sm': '0.125rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
}
