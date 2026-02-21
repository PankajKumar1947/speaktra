/* eslint-env node */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["@repo/eslint-config/base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
};
