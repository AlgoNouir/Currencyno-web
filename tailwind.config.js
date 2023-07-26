/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        backgroundImage: {
            caffeePateren:
                "url(https://currencyno.storage.iran.liara.space/Core/caffehPattern.jpg)",
            academyPattern:
                "url(https://currencyno.storage.iran.liara.space/Core/academyPattern.jpg)",
            fixPattern:
                "url(https://currencyno.storage.iran.liara.space/Core/fixPattern.jpg)",
            workPattern:
                "url(https://currencyno.storage.iran.liara.space/Core/workPattern.jpg)",
            storePattern:
                "url(https://currencyno.storage.iran.liara.space/Core/storePattern.png)",
        },
        extend: {
            opacity: {
                pattern: 0.15,
            },
            colors: {
                prime: {
                    100: "#173664",
                    200: "#4771AF",
                    300: "#6F9BDC",
                },
                accent: {
                    100: "#FCC40D",
                    200: "#FF8C00",
                },
                bg: {
                    100: "#F3F3F3",
                    200: "#FFFFFF",
                    300: "#fcc40d",
                },
                text: {
                    100: "#173664",
                    200: "#495f92",
                },
            },
        },
    },
    plugins: [
        require("tailwind-scrollbar-hide"),
        require("tw-elements/dist/plugin.cjs"),
    ],
};
