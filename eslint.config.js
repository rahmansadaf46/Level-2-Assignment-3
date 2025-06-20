import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintPluginImport from "eslint-plugin-import";
export default [
  {
    files: ["src/**/*.{js,ts}"],
    ignores: ["node_modules/**", "dist/**"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2021, sourceType: "module" },
      globals: { NodeJS: true, node: true, es2021: true },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: eslintPluginImport,
    },
    rules: {
      ...typescriptEslint.configs["recommended"].rules,
      "no-console": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        { js: "never", ts: "never" },
      ],
    },
    settings: { "import/resolver": { node: { extensions: [".js", ".ts"] } } },
  },
];
