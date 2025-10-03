import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "**/.next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "eslint.config.mjs",
    ],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "import/order": [
        "warn",
        {
          "groups": [["builtin", "external", "internal"], ["parent", "sibling", "index"]],
          "newlines-between": "always",
          "alphabetize": { order: "asc", caseInsensitive: true }
        }
      ],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
];

export default eslintConfig;
