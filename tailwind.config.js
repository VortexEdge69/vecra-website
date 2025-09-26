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
                accent: '#0076fe',
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glass': '0 4px 32px 0 rgba(0, 0, 0, 0.15)',
            },
            fontFamily: {
                sans: ['Inter', 'Rubik', 'Outfit', 'ui-sans-serif', 'system-ui'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
} 