import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        custom:
          "0 0 40px rgba(247, 246, 241, 0.3), 0 0 40px rgba(253, 253, 249, 0.1)",
      },
      dropShadow: {
        custom:
          "0 0 40px rgba(247, 246, 241, 0.3), 0 0 40px rgba(253, 253, 249, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config
