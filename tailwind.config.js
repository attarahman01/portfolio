/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.html"],
    theme: {
        extend: {
            colors: {
                primary: '#6366f1',
                accent: '#a855f7',
                secondary: '#14b8a6',
                'text-main': '#111827',
                'text-muted': '#6b7280',
                'bg-dark': '#ffffff',
                'bg-card': '#f8f9fa',
                border: 'rgba(0, 0, 0, 0.08)',
            },
            fontFamily: {
                display: ['Baumans', 'cursive'],
                heading: ['Antonio', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
                sub: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
                md: '0 4px 16px rgba(0, 0, 0, 0.12)',
                lg: '0 8px 32px rgba(0, 0, 0, 0.16)',
            },
            spacing: {
                'xs': '0.5rem',
                'sm': '1rem',
                'md': '2rem',
                'lg': '4rem',
                'xl': '8rem',
            },
        },
    },
    plugins: [],
}
