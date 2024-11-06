import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
// import stylistic from '@stylistic/eslint-plugin'
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    ignores: ["node_modules", "dist", "public"],
  },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // stylistic.configs.customize({
  //     indent: 4,
  //     quotes: 'single',
  //     semi: false,
  //     jsx: true,
  //     braceStyle: '1tbs',
  //     arrowParens: 'always',
  // }),
  eslintPluginPrettierRecommended,
  {
    rules: {
      "react/react-in-jsx-scope": "off", // Disable the rule
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
