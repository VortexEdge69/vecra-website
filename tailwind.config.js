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
                    bg: '#0d0f16',
                    surface: '#161923',
                    primary: '#b8f23d',
                    secondary: '#d3fa7c',
                    border: '#2b2f3d',
                    text: '#f6f5ef',
                    muted: '#9a9fb0',
                },
                accent: '#b8f23d',
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