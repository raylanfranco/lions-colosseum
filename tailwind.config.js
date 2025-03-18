const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto-condensed)", ...fontFamily.sans],
      },
      screens: {
        sm: "640px",
        md: "768px", // 👈 Make sure this exists!
        lg: "1024px",
        xl: "1280px",
      }
    },
  },
  plugins: [require("daisyui")],
};
