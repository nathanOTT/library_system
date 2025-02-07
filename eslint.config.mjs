import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "next", "prettier", "standard", "standard-react", "plugin:react/recommended", "plugin:tailwindcss/recommended"),
  {
    rules: {
      "no-console": "off",
      "no-undef": "off",
      "no-unused-vars": "off",
      "react/prop-types": "off",
    },
  },
];

export default eslintConfig;
