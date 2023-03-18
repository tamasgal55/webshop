/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
      './src/views/*.{vue,html}',
      './src/components/*.{vue,html}',
      './src/layouts/*.{vue,html}',
      './src/*.{,ts,vue,html}'
  ],
  theme: {
      extend: {
          colors: {
              'dark-text': '#edf0f5',
              'dark-bg-1': '#262b48',
              'dark-bg-2': '#10163a',
              'dark-link': '#4454c3',
              'dark-hr': '#252a4a',
              'dark-text-muted': '#6c757d',
              'light-text': '#424e79',
              'light-bg-1': '#f2f6f9',
              'light-bg-2': '#fff',
              'light-link': '#dc3545',
              'light-hr': '#eff0f6',
              'light-text-muted': '#728096',
              'border-submit': '#4454c3',
              'red-original': '#dc3545',
              'red-darker': '#B6212D'

          }
      },
  },
  plugins: [require('@formkit/themes/tailwindcss')],
}
