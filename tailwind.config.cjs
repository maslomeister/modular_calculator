/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

const notFirst = plugin(({ addVariant, e }) => {
  addVariant("not-first", ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      const element = e(`not-first${separator}${className}`);
      return `.${element} > :not(:first-child)`;
    });
  });
});

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        normal: "rgb(226, 227, 229)",
        active: "rgb(93,95,229)",
      },
      lineHeight: {
        11: "2.75rem",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "Avenir"],
      },
      fontSize: {
        xsm: "12px",
      },
      boxShadow: {
        md: "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        toggle: "5px",
      },
      backgroundImage: {
        "dashed-border": `url(
          "data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23C4C4C4FF' stroke-width='4' stroke-dasharray='5%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e"
        )`,
      },
    },
  },
  plugins: [notFirst],
};
