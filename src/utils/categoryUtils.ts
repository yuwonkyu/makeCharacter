/**
 * 커스터마이즈 카테고리 생성 유틸리티
 */

import type { PartCategory, PartItem } from "@/utils/partUtils";
import type { CategoryConfig } from "@/constants/customize";
import { MBTI_OPTIONS, INPUT_FIELD_CONFIGS } from "@/constants/customize";

/**
 * 파츠 카테고리를 기반으로 CategoryConfig 생성
 */
function createPartCategory(
  label: string,
  partCategory: PartCategory,
  partOptions: Record<PartCategory, PartItem[]>
): CategoryConfig {
  return {
    label,
    type: "select",
    partCategory,
    options: partOptions[partCategory].map((option) => option.label),
  };
}

/**
 * 입력 필드 CategoryConfig 생성
 */
function createInputCategory(
  label: keyof typeof INPUT_FIELD_CONFIGS
): CategoryConfig {
  const config = INPUT_FIELD_CONFIGS[label];
  return {
    label,
    type: "input",
    inputType: "number",
    ...config,
  };
}

/**
 * 모든 카테고리 목록 생성
 */
export function createCategoryList(
  partOptions: Record<PartCategory, PartItem[]>
): CategoryConfig[] {
  return [
    // 파츠 카테고리들
    createPartCategory("머리", "head", partOptions),
    createPartCategory("몸통", "body", partOptions),
    createPartCategory("다리", "legs", partOptions),
    createPartCategory("신발", "shoes", partOptions),

    // 입력 필드들
    createInputCategory("체력"),
    createInputCategory("마력"),
    createInputCategory("무게"),
    createInputCategory("키"),
    createInputCategory("IQ"),

    // MBTI 선택
    {
      label: "MBTI",
      type: "select",
      options: [...MBTI_OPTIONS],
    },
  ];
}
