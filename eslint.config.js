import { antfu } from "@antfu/eslint-config"

export default antfu({
  ignores: [
    "**/*.gen.ts",
    "**/tsconfig.*",
    "package.json",
    "vite.config.ts",
  ],
  stylistic: {
    indent: 2,
    quotes: "double",
  },
})
