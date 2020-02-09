const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Fira Sans', ...defaultTheme.fontFamily.sans],
                mono: ['Fira Code', ...defaultTheme.fontFamily.sans],
            },
        },
        customForms: theme => ({
            default: {
                textarea: {
                    backgroundColor: theme('colors.gray.800'),
                    borderRadius: theme('borderRadius.lg'),
                    fontSize: 'inherit',
                },
            },
        }),
    },
    variants: {},
    plugins: [
        require('@tailwindcss/custom-forms'),
    ],
};
