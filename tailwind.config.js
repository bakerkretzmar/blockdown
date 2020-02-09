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
                    backgroundColor: theme('colors.gray.200'),
                    borderColor: theme('colors.gray.600'),
                    borderWidth: theme('borderWidth.2'),
                    borderRadius: theme('borderRadius.lg'),
                    paddingTop: theme('spacing.4'),
                    paddingRight: theme('spacing.6'),
                    paddingBottom: theme('spacing.4'),
                    paddingLeft: theme('spacing.6'),
                    fontSize: 'inherit',
                    '&:focus': {
                        outline: 'none',
                        boxShadow: 'none',
                        borderColor: theme('colors.blue.400'),
                    },
                },
            },
        }),
    },
    variants: {
        opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    },
    plugins: [
        require('@tailwindcss/custom-forms'),
    ],
};
