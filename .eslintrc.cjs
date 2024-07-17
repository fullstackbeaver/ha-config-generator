module.exports = {
  env: {
    // "es2023": true,
    "node": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  globals: {
    Atomics          : "readonly",
    SharedArrayBuffer: "readonly",
  },
  languageOptions: {
    ecmaVersion: "latest"
  },
  overrides: [
    {
      "files": ["*.d.ts"],
      "rules": {
        "@typescript-eslint/no-unused-vars": "off"
      }
    }],
  parser       : "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType" : "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  root : true,
  rules: {
    "@typescript-eslint/ban-types"      : ["warn"],
    "@typescript-eslint/no-var-requires": ["off"],
    "accessor-pairs"                    : [
      "warn",
      {
        enforceForClassMembers: true,
      },
    ],
    "arrow-spacing"   : ["warn"],
    "block-scoped-var": ["warn"],
    camelcase         : ["warn"],
    complexity        : ["error", 10],
    eqeqeq            : [
      "error",
      "always",
      {
        null: "ignore",
      },
    ],
    "generator-star-spacing": ["warn"],
    indent                  : [
      "warn",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "key-spacing"    : ["warn", { align: "colon" }],
    "keyword-spacing": [
      "warn",
      {
        after    : true,
        before   : true,
        overrides: {}
      },
    ],
    "linebreak-style"       : ["warn", "unix"],
    "max-lines-per-function": [
      "error",
      70
    ],
    "multiline-ternary": [
      "warn",
      "always-multiline"
    ],
    "new-cap": [
      "warn",
      {
        newIsCap: false,
      },
    ],
    "no-case-declarations" : "off",
    "no-constructor-return": ["warn"],
    "no-delete-var"        : ["off"],
    "no-else-return"       : [
      "warn",
      {
        allowElseIf: true,
      },
    ],
    "no-eval"                : ["error"],
    "no-extra-bind"          : ["warn"],
    "no-implicit-coercion"   : ["warn"],
    "no-multiple-empty-lines": [
      "error",
      {
        max   : 1,
        maxEOF: 0,
      },
    ],
    "no-trailing-spaces": ["warn"],
    "no-unused-vars"    : "error",
    "no-useless-catch"  : [
      "error"
    ],
    "no-useless-constructor": ["warn"],
    "object-curly-spacing"  : ["error", "always"],
    "prefer-const"          : [
      "error",
      {
        destructuring         : "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    "prefer-spread": ["warn"],
    quotes         : ["warn", "double"],
    "sort-imports" : ["error"],
    "sort-keys"    : ["warn"]
  }
};