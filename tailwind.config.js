/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.html"],
    theme: {
        extend: {
            colors: {
                primary: '#0f172a',
                accent: '#2563eb',
                secondary: '#475569',
                'text-main': '#0f172a',
                'text-body': '#334155',
                'text-muted': '#64748b',
                'bg-dark': '#ffffff',
                'bg-card': '#f8fafc',
                border: 'rgba(15, 23, 42, 0.1)',
            },
            fontFamily: {
                display: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                heading: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                body: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                sub: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            },
            boxShadow: {
                sm: '0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03)',
                md: '0 4px 16px -2px rgba(15, 23, 42, 0.08), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
                lg: '0 16px 32px -8px rgba(15, 23, 42, 0.1)',
                elevation: '0 10px 30px rgba(15, 23, 42, 0.05)',
                'elevation-hover': '0 20px 40px rgba(15, 23, 42, 0.08)',
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
