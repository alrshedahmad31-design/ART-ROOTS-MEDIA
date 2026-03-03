/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "32px",
                sm: "24px",
                lg: "32px",
                xl: "32px",
                "2xl": "32px",
            },
            screens: {
                "2xl": "1320px",
            },
        },
        extend: {
            colors: {
                /* Surfaces */
                "surface-0": "rgb(var(--arm-black-0) / <alpha-value>)",
                "surface-1": "rgb(var(--arm-black-1) / <alpha-value>)",

                /* Text */
                "text-1": "rgb(var(--arm-white) / <alpha-value>)",
                "text-2": "rgb(var(--arm-gray) / <alpha-value>)",

                /* Actions */
                "action": "rgb(var(--arm-red-0) / <alpha-value>)",
                "action-hover": "rgb(var(--arm-red-1) / <alpha-value>)",

                /* Accent (micro only) */
                "accent": "rgb(var(--arm-gold) / <alpha-value>)",

                /* Dividers / overlays */
                "divider": "rgb(var(--arm-divider) / <alpha-value>)",
                "overlay": "rgb(var(--arm-overlay) / <alpha-value>)",

                /* Legacy compatibility (for gradual migration) */
                'onyx': '#0E0E0F',
                'obsidian': '#0E0E0F',
                'off-white': '#FFFFFF',
                'ivory': '#FFFFFF',
                'sand': '#1A1A22',
                'signal-red': '#C4161C',
                'champagne': '#C4161C',
            },

            borderRadius: {
                'none': '0',
                'xs': 'var(--arm-radius-4)',
                'sm': 'var(--arm-radius-8)',
                'md': 'var(--arm-radius-12)',
            },

            fontFamily: {
                sans: ['Sora', 'Cairo', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
                heading: ['Sora', 'Cairo', 'system-ui', 'sans-serif'],
                arabic: ['Cairo', 'Sora', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
                serif: ['Sora', 'Cairo', 'serif'],
            },

            fontSize: {
                display: ["96px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
                h1: ["72px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
                h2: ["48px", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }],
                h3: ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" }],
                bodyLg: ["18px", { lineHeight: "1.6" }],
                body: ["16px", { lineHeight: "1.6" }],
                sm: ["14px", { lineHeight: "1.6" }],
                mono: ["12px", { lineHeight: "1.4", letterSpacing: "0.08em" }],
            },

            transitionTimingFunction: {
                arm: "var(--arm-ease)",
            },
            transitionDuration: {
                fast: "var(--arm-fast)",
                med: "var(--arm-med)",
            },

            spacing: {
                "section": "96px",
                "section-lg": "120px",
                "100px": "100px",
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

            boxShadow: {
                tight: "0 8px 24px rgba(0,0,0,0.35)",
            },
        },
    },
    plugins: [],
}
