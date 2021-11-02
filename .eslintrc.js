module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "no-unused-vars": ["warn"],
    "no-use-before-define": "off",
    // "no-use-before-define": [2, {"functions": true, "classes": true}]
    // "@typescript-eslint/no-use-before-define": ["error"],
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        trailingComma: "es5",
        semi: false,
        jsxSingleQuote: false,
        singleQuote: false,
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "react/jsx-uses-react": 1,
    "react/jsx-uses-vars": 1,
  },
}
