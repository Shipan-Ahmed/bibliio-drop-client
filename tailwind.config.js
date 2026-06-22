/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['var(--font-merriweather)', 'serif'],
                body: ['var(--font-inter)', 'sans-serif'],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                bibliodropLight: {
                    "primary": "#0F4C43",     // Deep Emerald Forest
                    "secondary": "#D4A373",   // Warm Gold/Amber
                    "accent": "#F43F5E",      // Coral (for Unavailable badge/Alerts)
                    "neutral": "#1F2937",     // Charcoal Text
                    "base-100": "#F7F4EF",    // Soft warm cream background
                    "info": "#3ABFF8",
                    "success": "#36D399",     // Status: Approved/Delivered
                    "warning": "#FBBD23",     // Status: Pending Approval
                    "error": "#F87272",
                },
            },
            "dark", // Optional persistent dark mode fallback
        ],
    },
}