/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    bg: '#050a10',
                    surface: '#0b1219',
                    primary: '#0076fe',
                    secondary: '#005ac1',
                    border: '#1e293b',
                    text: '#f8fafc',
                    muted: '#94a3b8',
                },
                accent: '#0076fe',
            },
            spacing: {
                'px-grid': '8px',
                'grid-gap': '12px',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            borderWidth: {
                '1': '1px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}