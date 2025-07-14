/* eslint-disable strict */
module.exports = {
  env: {
    es2021: true,
    es6: true,
    node: true,
  },
  plugins: ["import"],
  extends: ["eslint:recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "import/no-unresolved": "error",
    "no-undef": "error",
    strict: ["error", "safe"], // Enforce strict mode
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "no-console": "off", // Depending on your project, you might want to allow console.log
    eqeqeq: "warn", // Enforce the use of === and !==
    curly: "error", // Require curly braces for all control statements
    "no-var": "error", // Suggest let or const instead of var
    "prefer-const": "error", // Suggest const for variables that are never reassigned after declared
    "no-process-exit": "error", // Discourage process.exit() as it might be unreliable in async contexts
    "no-path-concat": "error", // Avoid concatenating paths as strings
    "global-require": "error", // Enforce require at the top level of a module
    "handle-callback-err": "error", // Ensure callback errors are handled
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
