import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    files: ["commitlint.config.js", "**/.eslintrc.js"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
      },
    },
  },
];
