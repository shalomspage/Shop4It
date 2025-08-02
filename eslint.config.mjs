import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Default Next.js + TS rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Disable rule only for config files
  {
    files: ["**/*.config.{js,cjs,mjs,ts}"],
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default eslintConfig;
