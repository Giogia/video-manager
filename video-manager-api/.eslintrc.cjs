module.exports = {
   "env": {
      "browser": true,
      "es2021": true,
      "node": true
   },
   "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended"
   ],
   "overrides": [
   ],
   "parser": "@typescript-eslint/parser",
   "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
   },
   "plugins": [
      "@typescript-eslint"
   ],
   "rules": {
      "indent": [
         "error",
         3,
         { "ignoredNodes": ["PropertyDefinition"] }
      ],
      "linebreak-style": [
         "error",
         "unix"
      ],
      "quotes": [
         "error",
         "double"
      ],
      "semi": [
         "error",
         "never"
      ],
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
   }
}
