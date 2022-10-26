/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0071c2"
            },
            backgroundColor: {
                primary: "#003580",
                lightPrimary: "#0071c2",
                secondary: "#1266DD",
                tertiary: "#F73859"
            },
            textColor: {
                primary: "#262626"
            }
        },
    },
    plugins: [],
};
