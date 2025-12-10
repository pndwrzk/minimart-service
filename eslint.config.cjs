const globals = require("globals");
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    files: ["src/**/*.{js,ts}"],
    languageOptions: { globals: globals.node },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "**/*.d.ts",
      "src/public/",
      "src/types/",
       "src/database/migrations/",
       "eslint.config.cjs",
       "src/config/sequelize-cli.js",
       "src/config/migrations",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
];
