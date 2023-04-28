/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // fix conflict css Antd and Tailwind
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#1890ff',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
