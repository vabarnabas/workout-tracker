module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  plugins: ["@typescript-eslint", "prettier", "react", "unused-imports"],
  settings: {
    propWrapperFunctions: [
      "forbidExtraProps",
      {
        property: "freeze",
        object: "Object",
      },
      {
        property: "myFavoriteWrapper",
      },
    ],
    linkComponents: [
      "Hyperlink",
      {
        name: "Link",
        linkAttribute: "to",
      },
    ],
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "prettier/prettier": "error",
    "react/display-name": 0,
    "react/prop-types": "off",
    "unused-imports/no-unused-imports": 2,
  },
  ignorePatterns: [
    ".eslintrc.js",
    "jest.config.js",
    "next.config.js",
    "tailwind.config.js",
    "prettier.config.js",
    "postcss.config.js",
  ],
}
