/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: "430px",
                fit: "845px",
            },
            fontFamily: {
                sans: ["Rubik", "sans-serif"],
            },
            colors: {
                primary: "#D8995A",
                darkPrimary: "#A76B3C",
                greenEyes: "#6C8E74",
                darkGreenEyes: "#3E5948",
                pinkNose: "#D97373",
                neutral900: "#221F1A",
                neutral700: "#4C433E",
                neutral600: "#6F635C",
                neutral400: "#D8D5D1",
                neutral200: "#F8F4EF",
                neutral100: "#FDFEFF",
                success: "#6FAF85",
                warning: "#E0B050",
                error: "#C2514F",
                info: "#7B9BAE",
                inactive: "#B8B8B8",
            },
        },
    },
    plugins: [],
};
