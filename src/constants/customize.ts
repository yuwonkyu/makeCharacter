/**
 * 커스터마이즈 카테고리 관련 상수 및 타입
 */

import type { PartCategory } from "@/utils/partUtils";

export interface CategoryConfig {
  label: string;
  type: "select" | "input";
  inputType?: "text" | "number";
  min?: number;
  max?: number;
  decimalPlaces?: number;
  options?: string[];
  partCategory?: PartCategory;
}

/**
 * MBTI 타입 목록
 */
export const MBTI_OPTIONS = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
] as const;

/**
 * 입력 필드 설정
 */
export const INPUT_FIELD_CONFIGS = {
  체력: { min: 1, max: 100, decimalPlaces: 0 },
  마력: { min: 1, max: 100, decimalPlaces: 0 },
  무게: { min: 1, max: 999, decimalPlaces: 2 },
  키: { min: 1, max: 300, decimalPlaces: 2 },
  IQ: { min: 1, max: 300, decimalPlaces: 2 },
} as const;
