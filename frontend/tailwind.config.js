/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          "100": "rgba(0, 0, 0, 0.25)",
          "200": "rgba(255, 255, 255, 0.05)",
          "300": "rgba(0, 0, 0, 0.28)",
        },
        steelblue: "rgba(88, 130, 193, 0.49)",
        "primary-500": "#cc0f3c",
        "neutral-100": "#fff",
        silver: "#bcbec0",
        "white-8": "rgba(255, 255, 255, 0.08)",
        darkslategray: "#4b4d4e",
      },
      spacing: {},
      fontFamily: {
        "button-2-regular": "Nunito",
        abeezee: "ABeeZee",
      },
      borderRadius: {
        "9xl-5": "28.5px",
        "8xs": "5px",
      },
    },
    fontSize: {
      base: "16px",
      smi: "13px",
      "5xl": "24px",
      sm: "14px",
      inherit: "inherit",
    },
  },
  plugins: [],
}

