import { fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import dirs from 'eslint-plugin-dirs'
import reactHooks from 'eslint-plugin-react-hooks'
import eslintPluginVue from 'eslint-plugin-vue'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/*.js', '**/*.mjs', '**/dist/**/*'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ),
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  {
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
      dirs,
    },

    rules: {
      'prettier/prettier': 'error',

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        {
          selector: ['memberLike', 'property', 'method'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'require',
          modifiers: ['private'],
        },
      ],

      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'react-hooks/rules-of-hooks': 'error',

      'react-hooks/exhaustive-deps': [
        'error',
        {
          additionalHooks:
            '(useUpdateEffect|useEffectOnce|useDeepCompareEffect)',
        },
      ],

      '@typescript-eslint/no-shadow': 'error',
      'import/order': 'off',
      '@typescript-eslint/no-non-null-assertion': 'error',

      'dirs/dirnames': [
        'error',
        {
          pattern: '^([a-z0-9\\-]+)|__tests__$',
        },
      ],

      'dirs/filenames': [
        'error',
        {
          '**/*.md/*': '.*',
          '**/*': '^[a-z0-9\\-\\.]+$',
        },
      ],

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSEnumDeclaration',
          message: "Don't declare enums",
        },
      ],
    },
  },
  ...eslintPluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      'vue/valid-v-for': 'off',
      'vue/max-attributes-per-line': 'off',
    },
  },
]
