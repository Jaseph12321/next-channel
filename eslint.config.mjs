import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
 
  {
    ignores: [
      "dist/**",
      "src/drizzle/**",
      ".next/**",
      "coverage/**",
      "public/**",
      "src/legacy/**",
      "src/cron/**",
      "src/main.ts",
      "src/app/pages/myList/page.tsx",
      "src/app/page.tsx",
    ],
  },


  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript"]}),
    {
      rules:{
        "react/no-unescaped-entities": "off",
        "@next/next/no-page-custom-font": "off"
      },
    },
];

export default eslintConfig;
