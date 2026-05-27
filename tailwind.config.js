// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // purple: "#8A0094",
        greenlight: "#F1FFF3",
        greenprimary: "#008B0E",
        greensecondary: "#37B349",
        greendark: "#026939",
        blueprimary: "#13375E",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // default sans
      },
      minWidth: {
        100: "136px",
        150: "150px",
      },
      maxWidth: {
        172: "172px",
        182: "182px",
        199: "199px",
        275: "275px",
        220: "220px",
        374: "374px",
        397: "397px",
        614: "614px",
      },
      fontSize: {
        28: "28px",
        13: "13px",
        16: "16px",
        14: "14px",
        24: "24px",
        18: "18px",
        20: "20px",
        10: "10px",
        12: "12px",
        36: "36px",
        8: "8px",
      },
    },
  },
  plugins: [
    // require('tailwind-scrollbar'),
  ],
};
