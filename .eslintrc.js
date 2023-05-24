module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:@typescript-eslint/recommended-requiring-type-checking", "prettier/prettier", "plugin:unicorn/recommended"],
  plugins: ["@typescript-eslint", "react-hooks", "unicorn"],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    // 'import/no-unresolved': 'error',
    // Since React 17 and typescript 4.1 you can safely disable the rule
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'import/no-cycle': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    "max-len": ["error", {"code": 160, "ignoreUrls": true}],
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": false
      }
    ],
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "import/extensions": "off",
    "no-useless-constructor": "off",
    "unicorn/no-array-for-each": "off",
    "react/function-component-definition": "off",
    "react/jsx-filename-extension": "off",
    "@typescript-eslint/no-empty-function": "off",
    "unicorn/no-empty-file": "off",
  },
  env: {
    "browser": true,
    "es6": true,
    "node": true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
};
