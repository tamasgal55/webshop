/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
      './src/views/*.{vue,html}',
      './src/views/*/*.{vue,html}',
      './src/components/*.{vue,html}',
      './src/layouts/*.{vue,html}',
      './src/*.{,ts,vue,html}'
  ],
  theme: {
      extend: {
          colors: {
            'dark-text': '#edf0f5',
            'dark-bg-1': '#10163a',
            'dark-bg-2': '#262b48',
            'dark-link': '#4454c3',
            'dark-border': '#6c757d',
            'dark-text-muted': '#6c757d',
            'dark-box-shadow': '#191f48',
            'light-text': '#424e79',
            'light-bg-1': '#fff',
            'light-bg-2': '#f2f6f9',
            'light-link': '#dc3545',
            'light-border': '#d3dfea',
            'light-text-muted': '#728096',
            'light-box-shadow': '#b0b8d6',
            'button': '#4454c3',
            'button-hover': '#1e3a8a',
            'link': '#4454c3',
            'error': '#ff5b51',
          }
      },
  },
  plugins: [require('@formkit/themes/tailwindcss')],
}
