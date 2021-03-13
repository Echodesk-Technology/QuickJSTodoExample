const colors = require('tailwindcss/colors')
module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.js',
    ],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                primary: {
                    normal: '#38b6ff',
                    dark: '#3fb0f2'
                },
                snow: '#fafafa',
            }
        }
    },
    plugins: [],
}