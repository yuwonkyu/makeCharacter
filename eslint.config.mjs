import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 성능 최적화 관련 규칙
      "react/jsx-no-bind": "warn",
      "react/display-name": "off",
      // 불필요한 재렌더링 방지
      "react-hooks/exhaustive-deps": "warn",
      // 접근성 향상
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/aria-props": "warn",
    },
  },
];

export default eslintConfig;
