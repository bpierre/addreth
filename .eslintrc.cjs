module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    `plugin:react/recommended`,
    `plugin:react/jsx-runtime`,
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@typescript-eslint"],
  rules: {},
  settings: {
    "react": {
      "version": "detect",
    },
  },
  overrides: [
    {
      files: ["src/**/*.ts", "src/**/*.tsx"],
      extends: [
        "plugin:@typescript-eslint/strict-type-checked",
      ],
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
      },
    },
  ],
};
