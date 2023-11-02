const plugin = require("tailwindcss/plugin");
const { COLORS } = require("./utils/constants");
module.exports = {
  content: ["./app/**/*.{html,js,jsx}", "./components/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".elevation": {
          shadowColor: COLORS.black,
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,
          elevation: 7,
        },
        ".text-error": {
          textAlign: "center",
          fontSize: 16,
          lineHeight: 24,
          fontWeight: 600,
          color: "#CC3333",
        },
      });
    }),
  ],
};
