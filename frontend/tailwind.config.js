/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blackbg:'#000000',
        colorfieldbg:'#f3f7f890',
        colorprimary:'#1e88e5',
        colorwhite: '#f4f4f4', // رنگ دلخواه با اسم سفارشی
        colorwhite1: '#f4f4f4cc', // رنگ دلخواه با اسم سفارشی
        myColor: '#222222', // رنگ دلخواه با اسم سفارشی
        darkBg: '#1a1a1a',   // مثلا پس‌زمینه در حالت تاریک
      },
    },
  },
  plugins: [require("daisyui")],
};
