import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['**/__fixtures__/**'],
  },
  {
    languageOptions: 
    { globals: globals.browser },
  },
  {
    ...pluginJs.configs.recommended,
    rules: {
      ...pluginJs.configs.recommended.rules,
      'no-extra-semi': 'off',
    }
  },
];