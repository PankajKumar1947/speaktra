import { config } from "@repo/eslint-config/base";

export default [
  ...config,
  {
    files: ["commitlint.config.js"],
    languageOptions: {
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
  },
];
