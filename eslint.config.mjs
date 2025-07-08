import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname
})

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "plugin:prettier/recommended", "plugin:jsx-a11y/recommended"],
    plugins: ["prettier", "jsx-a11y"],
    rules: {
      "prettier/prettier": [
        "warn",
        {
          printWidth: 120,
          singleQuote: false,
          semi: false,
          bracketSpacing: true,
          trailingComma: "none",
          arrowParens: "always",
          tabWidth: 2,
          endOfLine: "auto",
          plugins: ["prettier-plugin-tailwindcss"]
        },
        {
          usePrettierrc: false
        }
      ],
      "react/react-in-jsx-scope": "off",
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never", propElementValues: "always" }],
      "@typescript-eslint/no-unused-vars": "warn",
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn"
    }
  })
]

export default eslintConfig
